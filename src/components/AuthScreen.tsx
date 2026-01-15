import React, { useState } from 'react';
import { api } from '../services/api';
import type { User } from '../types';
import { BookOpen, Loader2, ArrowRight } from 'lucide-react';

interface AuthScreenProps {
    onLoginSuccess: (user: User) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let result;
            if (isRegister) {
                if (!formData.name) throw new Error("Nome é obrigatório");
                result = await api.register(formData.name, formData.email, formData.password);
            } else {
                result = await api.login(formData.email, formData.password);
            }

            if (result.success && result.user) {
                onLoginSuccess(result.user);
            } else {
                setError(result.error || "Ocorreu um erro.");
            }
        } catch (err: any) {
            setError(err.message || "Erro de conexão.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="flex items-center gap-2 font-bold text-3xl text-indigo-700 mb-8">
                <BookOpen className="fill-current" size={32} />
                LegisMaster
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {isRegister ? 'Crie sua conta' : 'Bem-vindo de volta'}
                </h2>
                <p className="text-slate-500 mb-6">
                    {isRegister ? 'Prepare-se para a aprovação.' : 'Continue sua jornada de estudos.'}
                </p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegister && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
                            <input
                                type="text"
                                required
                                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
                        <input
                            type="password"
                            required
                            className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (isRegister ? 'Cadastrar' : 'Entrar')}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-600">
                    {isRegister ? 'Já tem uma conta? ' : 'Não tem conta? '}
                    <button
                        onClick={() => { setIsRegister(!isRegister); setError(''); }}
                        className="text-indigo-600 font-bold hover:underline"
                    >
                        {isRegister ? 'Fazer Login' : 'Cadastre-se'}
                    </button>
                </div>
            </div>
        </div>
    );
}