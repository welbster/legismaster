import { GoogleGenerativeAI } from "@google/generative-ai";
import { EDITAL_CONTEXT } from "../constants";

// ATUALIZADO: Lendo a nova variável
const apiKey = import.meta.env.VITE_APP_AI_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const generateSession = async (topic: string, description: string) => {
  if (!genAI) throw new Error("API Key da IA não configurada (VITE_APP_AI_KEY)");

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview", // Mantendo o modelo rápido
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2 // Mantendo a precisão
    }
  });

  const prompt = `
    ATUE COMO UM PROFESSOR SÊNIOR DA BANCA VUNESP (CONCURSO CARAGUATATUBA).
    
    CONTEXTO GERAL:
    ${EDITAL_CONTEXT}
    
    TÓPICO DA AULA: ${topic}
    DETALHES: ${description}
    
    TAREFA:
    Gere um array JSON com 3 questões de múltipla escolha.
    
    REGRAS RÍGIDAS DE LÓGICA (PARA EVITAR ERROS):
    1. Se a questão envolver CÁLCULOS (Matemática) ou REFERÊNCIAS DE CÉLULAS (Excel $A$1):
       - OBRIGATÓRIO: Realize o cálculo passo a passo internamente antes de escolher a alternativa correta.
       - No Excel: Simule o deslocamento de linhas/colunas verificando onde está o cifrão ($).
    2. As alternativas erradas devem ser plausíveis, mas tecnicamente incorretas.
    3. Retorne APENAS o JSON, sem markdown.
    
    FORMATO JSON OBRIGATÓRIO:
    [
      {
        "category": "${topic}",
        "difficulty": "Médio", 
        "question": "Enunciado da questão...",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "Texto EXATO da alternativa correta",
        "explanation": "Explicação detalhada provando por A + B o motivo da resposta."
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