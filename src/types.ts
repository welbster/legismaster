export interface Question {
    id: string;
    category: string;
    difficulty: 'Fácil' | 'Médio' | 'Difícil';
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    source?: string;
}

export interface User {
    uuid: string;
    name: string;
    email: string;
    xp: number;
    streak: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    id?: string;
    newXP?: number;
}
