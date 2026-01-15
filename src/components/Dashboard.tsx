import { useState } from 'react';
import { generateQuestionAI } from '../services/geminiService';
import { api } from '../services/api';
import { CATEGORIES } from '../constants';
import { Sparkles, Save, Loader2, Trophy, Flame, Target } from 'lucide-react';
import type { User } from '../types';

interface DashboardProps {
    user: User;
}

export default function Dashboard({ user }: DashboardProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(CATEGORIES[0]);
    const [lastGenerated, setLastGenerated] = useState<any>(null);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setLastGenerated(null);
        try {
            const q = await generateQuestionAI(selectedTopic);
            setLastGenerated(q);
        } catch (error) {
            alert("Erro ao gerar questão. Verifique sua chave de API ou tente novamente.");
        }
        setIsGenerating(false);
    };

    const handleSaveToDB = async () => {
        if (!lastGenerated) return;
        await api.saveQuestion(lastGenerated);
        alert("Questão salva! Agora ela aparecerá na aba 'Estudar'.");
        setLastGenerated(null);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><Trophy size={24} /></div>
                    <div>
                        <div className="text-slate-500 text-xs uppercase font-bold tracking-wider">XP Total</div>
                        <div className="text-2xl font-bold text-slate-800">{user.xp} XP</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-full"><Flame size={24} /></div>
                    <div>
                        <div className="text-slate-500 text-xs uppercase font-bold tracking-wider">Ofensiva</div>
                        <div className="text-2xl font-bold text-slate-800">{user.streak} dias</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><Target size={24} /></div>
                    <div>
                        <div className="text-slate-500 text-xs uppercase font-bold tracking-wider">Nível</div>
                        <div className="text-2xl font-bold text-slate-800">{Math.floor(user.xp / 100) + 1}</div>
                    </div>
                </div>
            </div>

            {/* AI Generator Section */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl shadow-lg text-white">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-yellow-300" />
                    <h2 className="text-xl font-bold">Gerador de Questões (IA)</h2>
                </div>
                <p className="mb-6 text-indigo-100 text-sm">
                    A IA lerá o Edital de Caraguatatuba e criará uma questão inédita para você praticar.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-2">
                    <select
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        className="flex-1 p-3 rounded-lg border-none text-slate-800 focus:ring-2 focus:ring-yellow-400 outline-none"
                    >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 disabled:opacity-70 flex items-center justify-center gap-2 transition-colors shadow-md"
                    >
                        {isGenerating ? <Loader2 className="animate-spin" /> : 'Gerar Questão'}
                    </button>
                </div>
            </div>

            {/* Preview da Questão Gerada */}
            {lastGenerated && (
                <div className="bg-white p-6 rounded-xl border-2 border-indigo-100 shadow-md animate-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold uppercase">{selectedTopic}</span>
                        <span className="text-slate-400 text-xs">Pré-visualização</span>
                    </div>

                    <h3 className="font-bold text-lg text-slate-800 mb-4">{lastGenerated.question}</h3>

                    <ul className="space-y-2 text-sm text-slate-600 mb-6">
                        {lastGenerated.options.map((o: string, i: number) => (
                            <li key={i} className={`p-2 rounded ${o === lastGenerated.correctAnswer ? "bg-green-50 border border-green-200 text-green-700 font-medium" : "bg-slate-50"}`}>
                                <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {o}
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <button
                            onClick={handleSaveToDB}
                            className="flex items-center gap-2 text-sm bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 font-medium transition-colors shadow-sm"
                        >
                            <Save size={18} /> Salvar no Banco de Questões
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
