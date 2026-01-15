import React from 'react';
import { LEARNING_PATH } from '../constants';
import { BookOpen, Scale, Cpu, FileText, Calculator, Lock, Play } from 'lucide-react';

// Mapa de ícones
const iconMap: any = { BookOpen, Scale, Cpu, FileText, Calculator };

interface ModuleGridProps {
    onStartModule: (module: any) => void;
}

export default function ModuleGrid({ onStartModule }: ModuleGridProps) {
    return (
        <div className="space-y-8">
            {/* Header de Status */}
            <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Bem-vindo, Futuro Agente!</h1>
                    <p className="text-indigo-100">Sua consistência vai levar à aprovação em Caraguatatuba.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-indigo-700/50 p-4 rounded-xl text-center backdrop-blur-sm">
                        <div className="text-xs uppercase opacity-70">Posição</div>
                        <div className="text-2xl font-bold">#142</div>
                    </div>
                    <div className="bg-indigo-700/50 p-4 rounded-xl text-center backdrop-blur-sm">
                        <div className="text-xs uppercase opacity-70">Módulos</div>
                        <div className="text-2xl font-bold">12</div>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800">Trilha de Aprendizado</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LEARNING_PATH.map((module, index) => {
                    const Icon = iconMap[module.icon] || BookOpen;
                    // Simulação: Primeiro desbloqueado, resto bloqueado para demonstração
                    const isLocked = false; // Deixei tudo liberado para você testar

                    return (
                        <div key={module.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Icon size={24} />
                                </div>
                                {isLocked ? <Lock className="text-slate-300" size={20} /> : <div className="text-green-500 font-bold text-sm">Liberado</div>}
                            </div>

                            <div className="mb-6">
                                <div className="mb-2">
                                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {module.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                                    {module.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {module.description}
                                </p>
                            </div>

                            <button
                                onClick={() => onStartModule(module)}
                                className="w-full bg-blue-50 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                {isLocked ? 'Bloqueado' : <><Play size={18} fill="currentColor" /> Iniciar Módulo</>}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
