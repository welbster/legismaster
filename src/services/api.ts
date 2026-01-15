import axios from 'axios';
import { GAS_API_URL } from '../constants';
import type { Question } from '../types';

export const api = {
    // --- AUTENTICAÇÃO ---

    login: async (email: string, password: string) => {
        // Usamos fetch normal para ler a resposta JSON
        const response = await fetch(GAS_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ api: 'login', payload: { email, password } })
        });
        return await response.json();
    },

    register: async (name: string, email: string, password: string) => {
        const response = await fetch(GAS_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ api: 'register', payload: { name, email, password } })
        });
        return await response.json();
    },

    // --- DADOS ---

    getQuestions: async (): Promise<Question[]> => {
        const response = await axios.get(`${GAS_API_URL}?api=questions`);
        return response.data.data || [];
    },

    getProgress: async (uuid: string) => {
        const response = await axios.get(`${GAS_API_URL}?api=progress&uuid=${uuid}`);
        return response.data.data || [];
    },

    saveProgress: async (uuid: string, questionId: string, isCorrect: boolean) => {
        await fetch(GAS_API_URL, {
            method: 'POST',
            mode: 'no-cors', // Fire and forget (não precisamos esperar resposta)
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({ api: 'progress', payload: { uuid, questionId, isCorrect } })
        });
    },

    saveQuestion: async (question: Omit<Question, 'id'>) => {
        await fetch(GAS_API_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({ api: 'questions', payload: question })
        });
    }
};