import React from 'react';
import { LayoutDashboard, BookOpen, LogOut } from 'lucide-react';

interface MobileNavProps {
    currentView: 'dashboard' | 'quiz';
    onChangeView: (view: 'dashboard' | 'quiz') => void;
    onLogout: () => void;
}

export default function MobileNav({ currentView, onChangeView, onLogout }: MobileNavProps) {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3 px-6 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <button
                onClick={() => onChangeView('dashboard')}
                className={`flex flex-col items-center gap-1 ${currentView === 'dashboard' ? 'text-indigo-600' : 'text-slate-400'}`}
            >
                <LayoutDashboard size={24} strokeWidth={currentView === 'dashboard' ? 2.5 : 2} />
                <span className="text-[10px] font-bold">Início</span>
            </button>

            <button
                onClick={() => onChangeView('quiz')}
                className={`flex flex-col items-center gap-1 ${currentView === 'quiz' ? 'text-indigo-600' : 'text-slate-400'}`}
            >
                <BookOpen size={24} strokeWidth={currentView === 'quiz' ? 2.5 : 2} />
                <span className="text-[10px] font-bold">Trilha</span>
            </button>

            <button
                onClick={onLogout}
                className="flex flex-col items-center gap-1 text-slate-400 hover:text-red-500 transition-colors"
            >
                <LogOut size={24} />
                <span className="text-[10px] font-bold">Sair</span>
            </button>
        </nav>
    );
}
