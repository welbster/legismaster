import React from 'react';
import { Home, BookOpen, BarChart2, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 p-6">
            <div className="flex items-center gap-2 mb-10">
                <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-xl">LM</div>
                <span className="font-bold text-2xl text-slate-800">LegisMaster</span>
            </div>

            <nav className="flex-1 space-y-2">
                <NavItem icon={<Home size={20} />} label="Home" active />
                <NavItem icon={<BookOpen size={20} />} label="Caminho de Estudo" />
                <NavItem icon={<BarChart2 size={20} />} label="Ranking (Simulado)" />
            </nav>

            <div className="pt-6 border-t border-slate-100 space-y-2">
                <NavItem icon={<Settings size={20} />} label="Configurações" />
                <NavItem icon={<LogOut size={20} />} label="Sair" />
            </div>
        </aside>
    );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}>
            {icon}
            <span>{label}</span>
        </button>
    );
}
