import { GoogleGenerativeAI } from "@google/generative-ai";
import { EDITAL_CONTEXT } from "../constants";

const apiKey = import.meta.env.VITE_APP_AI_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const generateSession = async (topic: string, description: string) => {
  if (!genAI) throw new Error("API Key não configurada (VITE_APP_AI_KEY)");

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.1 // Mantendo baixo para fidelidade
    }
  });

  const prompt = `
    ${EDITAL_CONTEXT}
    
    TÓPICO DA SESSÃO ATUAL: ${topic}
    DETALHES DO MÓDULO: ${description}
    
    TAREFA:
    Gere 5 (CINCO) questões de múltipla escolha.
    
    FILTRO DE CONTEÚDO (CRÍTICO):
    - O tópico é "${topic}". Se for "Conhecimentos Específicos", foque em LEIS e REDAÇÃO OFICIAL.
    - PROIBIDO gerar questões de Hardware, Windows, Excel ou Internet (Isso não cai para este cargo).
    
    CRITÉRIOS DE SELEÇÃO:
    1. Se houver questão REAL da VUNESP (Câmaras de Araras, SJC, etc) sobre ESTE assunto (ex: Crase, Regra de Três, Lei 8.429), use-a.
    2. Se for assunto local (Lei Orgânica de Caraguatatuba), crie uma INÉDITA imitando o estilo da Vunesp (texto da lei, alternativas longas).
    
    FORMATO JSON OBRIGATÓRIO:
    [
      {
        "category": "${topic}",
        "difficulty": "Médio",
        "question": "Enunciado completo...",
        "options": ["(A) ...", "(B) ...", "(C) ...", "(D) ...", "(E) ..."],
        "correctAnswer": "(A) ...", // Deve ser idêntico a uma das options
        "explanation": "Comentário detalhado. Se for Lei, cite o artigo. Se for Redação Oficial, cite a regra do Manual.",
        "source": "VUNESP 2019 - Câmara de Sorocaba" // Ou "Inédita - Estilo VUNESP"
      }
    ]
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Erro IA:", error);
    return [];
  }
};

export const generateQuestionAI = async (topic: string) => {
  if (!genAI) throw new Error("API Key da IA não configurada (VITE_APP_AI_KEY)");

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2
    }
  });

  const prompt = `
    ATUE COMO UM PROFESSOR SÊNIOR DA BANCA VUNESP (CONCURSO CARAGUATATUBA).
    
    CONTEXTO GERAL:
    ${EDITAL_CONTEXT}
    
    TÓPICO QUIZ: ${topic}
    
    TAREFA:
    Gere 1 (UMA) questão de múltipla escolha inédita.
    
    REGRAS RÍGIDAS:
    1. Alternativas erradas devem ser plausíveis.
    2. Retorne APENAS o JSON, sem markdown.
    
    FORMATO JSON OBRIGATÓRIO (NÃO RETORNE ARRAY, APENAS O OBJETO):
    {
      "category": "${topic}",
      "difficulty": "Médio", 
      "question": "Enunciado da questão...",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "Texto EXATO da alternativa correta",
      "explanation": "Explicação detalhada."
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Erro IA:", error);
    return null;
  }
};