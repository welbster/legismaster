import React from 'react';
import { LEARNING_PATH } from '../constants';
import { BookOpen, Scale, Cpu, FileText, Calculator, Play } from 'lucide-react';

const iconMap: any = { BookOpen, Scale, Cpu, FileText, Calculator };

interface ModuleGridProps {
    onStartModule: (module: any) => void;
}

export default function ModuleGrid({ onStartModule }: ModuleGridProps) {
    return (
        <div className="space-y-6 md:space-y-8 pb-10">
            {/* Banner de Boas Vindas */}
            <div className="bg-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">Vamos estudar?</h1>
                    <p className="text-indigo-100 text-sm md:text-base">Sua consistência vai levar à aprovação em Caraguatatuba.</p>
                </div>

                {/* Stats Mobile Friendly */}
                <div className="flex w-full md:w-auto gap-3">
                    <div className="bg-indigo-700/50 p-3 rounded-xl text-center backdrop-blur-sm flex-1 md:flex-none">
                        <div className="text-[10px] uppercase opacity-70 tracking-wider">Ranking</div>
                        <div className="text-xl font-bold">#142</div>
                    </div>
                    <div className="bg-indigo-700/50 p-3 rounded-xl text-center backdrop-blur-sm flex-1 md:flex-none">
                        <div className="text-[10px] uppercase opacity-70 tracking-wider">Módulos</div>
                        <div className="text-xl font-bold">12</div>
                    </div>
                </div>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-slate-800 px-1">Trilha de Aprendizado</h2>

            {/* Grid Responsivo: 1 coluna no mobile, 2 no tablet, 3 no desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {LEARNING_PATH.map((module) => {
                    return (
                        <div key={module.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all active:scale-[0.98]">
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                    {module.category}
                                </span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">
                                    {module.title}
                                </h3>
                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-2">
                                    {module.description}
                                </p>
                            </div>

                            <button
                                onClick={() => onStartModule(module)}
                                className="w-full bg-indigo-50 text-indigo-700 font-bold py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                                <Play size={16} fill="currentColor" /> Iniciar
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
