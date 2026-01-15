import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ModuleGrid from './components/ModuleGrid';
import QuizView from './components/QuizView';
import AuthScreen from './components/AuthScreen'; // Importe a tela de login
import { api } from './services/api';
import { generateSession } from './services/geminiService';
import type { User, Question } from './types';
import { Loader2, Zap, Star, LogOut } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingApp, setLoadingApp] = useState(true);

  // Estados do App
  const [activeModule, setActiveModule] = useState<any>(null);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [loadingText, setLoadingText] = useState("Carregando...");

  // Verificar se já tem usuário salvo no navegador
  useEffect(() => {
    const savedUser = localStorage.getItem('legismaster_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
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
        setLoadingText("Criando novas questões focadas no Edital...");
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
      alert("Erro ao conectar com o servidor.");
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

  // SE NÃO TIVER USUÁRIO, MOSTRA TELA DE LOGIN
  if (!user) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex">
      {/* Passamos o logout para a Sidebar se quiser, ou colocamos no Header mobile */}
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <header className="flex justify-between items-center mb-8 sticky top-0 bg-slate-50/90 backdrop-blur z-10 py-2">
          <div className="md:hidden font-bold text-xl text-indigo-700">LegisMaster</div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-2 text-orange-500 font-bold bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              <Zap size={18} fill="currentColor" /> {user.streak}
            </div>
            <div className="flex items-center gap-2 text-yellow-500 font-bold bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
              <Star size={18} fill="currentColor" /> {user.xp}
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-slate-500 font-medium">Candidato</div>
                <div className="text-sm font-bold text-slate-800 leading-none">{user.name}</div>
              </div>
              <button
                onClick={handleLogout}
                className="w-9 h-9 bg-white text-slate-500 hover:text-red-600 rounded-full flex items-center justify-center border border-slate-200 transition-colors"
                title="Sair"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        {isLoadingSession ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center animate-in fade-in">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mt-6 mb-2">{loadingText}</h2>
            <p className="text-slate-500 max-w-md">O sistema está personalizando seu treino para {activeModule?.title}.</p>
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
      </main>
    </div>
  );
}
