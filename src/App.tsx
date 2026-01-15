import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ModuleGrid from './components/ModuleGrid';
import QuizView from './components/QuizView';
import AuthScreen from './components/AuthScreen';
import MobileNav from './components/MobileNav'; // Importar novo componente
import { api } from './services/api';
import { generateSession } from './services/geminiService';
import type { User, Question } from './types';
import { Loader2, Zap, Star, LogOut } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingApp, setLoadingApp] = useState(true);
  const [view, setView] = useState<'dashboard' | 'quiz'>('dashboard'); // Controla a vista atual

  const [activeModule, setActiveModule] = useState<any>(null);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [loadingText, setLoadingText] = useState("Carregando...");

  useEffect(() => {
    const savedUser = localStorage.getItem('legismaster_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoadingApp(false);
  }, []);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem('legismaster_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('legismaster_user');
    setActiveModule(null);
    setSessionQuestions([]);
  };

  const startModule = async (module: any) => {
    if (!user) return;
    setIsLoadingSession(true);
    setActiveModule(module);
    setLoadingText("Analisando seu desempenho...");
    // Força a mudança para a vista de quiz se estiver no dashboard
    setView('quiz');

    try {
      const [allQuestions, userHistory] = await Promise.all([
        api.getQuestions(),
        api.getProgress(user.uuid)
      ]);

      const moduleQuestions = allQuestions.filter(q => q.category === module.category);
      const questionStatus: Record<string, boolean> = {};
      userHistory.forEach((h: any) => { questionStatus[h.questionId] = h.isCorrect; });

      const questionsToReview = moduleQuestions.filter(q => questionStatus[q.id] === false);
      const questionsNew = moduleQuestions.filter(q => questionStatus[q.id] === undefined);

      let finalSession: Question[] = [];

      if ((questionsToReview.length + questionsNew.length) < 5) {
        setLoadingText("IA criando questões novas...");
        const aiQuestions = await generateSession(module.category, module.description);
        for (const q of aiQuestions) await api.saveQuestion(q);
        finalSession = [...questionsToReview, ...questionsNew, ...aiQuestions];
      } else {
        const reviewBatch = questionsToReview.sort(() => Math.random() - 0.5).slice(0, 2);
        const needNewCount = 5 - reviewBatch.length;
        const newBatch = questionsNew.sort(() => Math.random() - 0.5).slice(0, needNewCount);
        finalSession = [...reviewBatch, ...newBatch];
      }

      setSessionQuestions(finalSession.sort(() => Math.random() - 0.5).slice(0, 5));

    } catch (error) {
      console.error(error);
      alert("Erro ao conectar.");
      setActiveModule(null);
    } finally {
      setIsLoadingSession(false);
    }
  };

  const handleSessionComplete = () => {
    setActiveModule(null);
    setSessionQuestions([]);
    if (user) {
      const newUser = { ...user, xp: user.xp + 100 };
      setUser(newUser);
      localStorage.setItem('legismaster_user', JSON.stringify(newUser));
    }
  };

  if (loadingApp) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>;

  if (!user) return <AuthScreen onLoginSuccess={handleLoginSuccess} />;

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pb-24 md:pb-8 transition-all duration-300">

        {/* Header (Status Bar) */}
        <header className="flex justify-between items-center mb-6 sticky top-0 bg-slate-50/95 backdrop-blur z-20 py-2">
          {/* Logo Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg font-bold text-sm">LM</div>
            <span className="font-bold text-slate-800">LegisMaster</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-1.5 text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded-full border border-orange-100 text-xs md:text-sm">
              <Zap size={16} fill="currentColor" /> {user.streak}
            </div>
            <div className="flex items-center gap-1.5 text-yellow-500 font-bold bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100 text-xs md:text-sm">
              <Star size={16} fill="currentColor" /> {user.xp}
            </div>

            {/* Logout Desktop */}
            <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200">
              <span className="text-sm font-bold text-slate-800">{user.name}</span>
              <button onClick={handleLogout} className="text-slate-400 hover:text-red-600 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Área de Conteúdo */}
        {view === 'dashboard' && !activeModule ? (
          // Aqui você poderia colocar o componente Dashboard (com estatísticas) se tiver
          <ModuleGrid onStartModule={startModule} />
        ) : (
          // Área de Estudo
          <>
            {isLoadingSession ? (
              <div className="h-[50vh] flex flex-col items-center justify-center text-center animate-in fade-in">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <h2 className="text-lg font-bold text-slate-800">{loadingText}</h2>
              </div>
            ) : activeModule && sessionQuestions.length > 0 ? (
              <QuizView
                questions={sessionQuestions}
                userUuid={user.uuid}
                onComplete={handleSessionComplete}
              />
            ) : (
              <ModuleGrid onStartModule={startModule} />
            )}
          </>
        )}
      </main>

      {/* Menu Mobile Inferior */}
      <MobileNav
        currentView={view === 'dashboard' && !activeModule ? 'dashboard' : 'quiz'}
        onChangeView={(v) => {
          setView(v);
          if (v === 'dashboard') {
            setActiveModule(null); // Reseta para a home
            setSessionQuestions([]);
          }
        }}
        onLogout={handleLogout}
      />
    </div>
  );
}
