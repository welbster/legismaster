import { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, Flag } from 'lucide-react';
import type { Question } from '../types';
import { api } from '../services/api';

interface QuizViewProps {
    questions: Question[];
    userUuid: string;
    onComplete: () => void;
}

export default function QuizView({ questions, userUuid, onComplete }: QuizViewProps) {
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const currentQ = questions[index];

    const handleConfirm = async () => {
        const isCorrect = selected === currentQ.correctAnswer;
        if (isCorrect) setScore(s => s + 1);
        setShowResult(true);
        await api.saveProgress(userUuid, currentQ.id, isCorrect);
    };

    const handleNext = () => {
        if (index < questions.length - 1) {
            setIndex(i => i + 1);
            setSelected(null);
            setShowResult(false);
        } else {
            setIsFinished(true);
        }
    };

    if (isFinished) {
        return (
            <div className="max-w-md mx-auto mt-10 text-center bg-white p-8 rounded-2xl shadow-lg animate-in zoom-in-95">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Flag size={40} className="text-yellow-900" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Aula Concluída!</h2>
                <p className="text-slate-500 mb-6">Você acertou {score} de {questions.length} questões.</p>

                <div className="flex justify-center gap-2 mb-8">
                    <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-bold">+50 XP</div>
                    <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-bold">Progresso Salvo</div>
                </div>

                <button onClick={onComplete} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    Continuar Trilha
                </button>
            </div>
        );
    }

    // Layout da Questão
    return (
        <div className="max-w-3xl mx-auto">
            {/* Barra de Progresso */}
            <div className="w-full bg-slate-200 h-2.5 rounded-full mb-6">
                <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${((index) / questions.length) * 100}%` }}></div>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">

                {/* --- NOVO: BADGE DE FONTE --- */}
                <div className="flex justify-between items-start mb-6">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                        {currentQ.category}
                    </span>

                    {currentQ.source && (
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${currentQ.source.includes("Inédita")
                                ? "bg-slate-50 text-slate-500 border-slate-200" // Cinza para simuladas
                                : "bg-yellow-50 text-yellow-700 border-yellow-200" // Amarelo para Reais
                            }`}>
                            {currentQ.source.includes("Inédita") ? "🎯 Questão Inédita" : `🏛️ ${currentQ.source}`}
                        </span>
                    )}
                </div>
                {/* --------------------------- */}

                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-snug">
                    {currentQ.question}
                </h2>

                <div className="space-y-3">
                    {currentQ.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => !showResult && setSelected(opt)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${showResult
                                    ? opt === currentQ.correctAnswer
                                        ? 'bg-green-50 border-green-500 text-green-800'
                                        : opt === selected
                                            ? 'bg-red-50 border-red-500 text-red-800'
                                            : 'border-slate-100 opacity-50'
                                    : selected === opt
                                        ? 'bg-indigo-50 border-indigo-500 text-indigo-900'
                                        : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border flex-shrink-0 ${selected === opt ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white border-slate-300 text-slate-500'
                                    }`}>
                                    {String.fromCharCode(65 + i)}
                                </div>
                                <span className="font-medium text-sm md:text-base">{opt}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Feedback Area */}
                <div className="mt-8 h-32">
                    {showResult ? (
                        <div className={`p-4 rounded-xl animate-in slide-in-from-bottom-2 ${selected === currentQ.correctAnswer ? 'bg-green-100 text-green-900' : 'bg-red-50 text-red-900'}`}>
                            <div className="font-bold flex items-center gap-2 mb-1">
                                {selected === currentQ.correctAnswer ? <CheckCircle size={20} /> : <XCircle size={20} />}
                                {selected === currentQ.correctAnswer ? 'Excelente!' : 'Atenção aqui:'}
                            </div>
                            <p className="text-sm opacity-90">{currentQ.explanation}</p>
                        </div>
                    ) : (
                        <div className="flex justify-end">
                            <button
                                onClick={handleConfirm}
                                disabled={!selected}
                                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Verificar
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {showResult && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 md:static md:bg-transparent md:border-0 md:p-0 md:mt-4 flex justify-end animate-in fade-in">
                    <button
                        onClick={handleNext}
                        className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 text-white shadow-lg transition-transform hover:scale-105 ${selected === currentQ.correctAnswer ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-800 hover:bg-slate-900'}`}
                    >
                        Continuar <ArrowRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
