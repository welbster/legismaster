import { GoogleGenerativeAI } from "@google/generative-ai";
import { EDITAL_CONTEXT } from "../constants";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const generateSession = async (topic: string, description: string) => {
  if (!genAI) throw new Error("API Key não configurada");

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview", // Ou gemini-1.5-flash
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.3
    }
  });

  const prompt = `
    ATUE COMO BANCA EXAMINADORA VUNESP.
    
    TÓPICO: ${topic}
    CONTEXTO: ${description}
    
    TAREFA:
    Gere 5 questões de múltipla escolha.
    
    DIRETRIZ DE FONTE (IMPORTANTE):
    1. Tente resgatar questões REAIS de concursos anteriores da VUNESP (Agente Adm, Oficial Legislativo, Câmaras Municipais).
    2. Se usar uma questão real, preencha o campo "source" com: "Banca Ano - Órgão" (Ex: "VUNESP 2019 - Câmara de SJC").
    3. Se não houver questão real exata na sua base, crie uma INÉDITA perfeita no estilo da banca e preencha "source" com: "Inédita - Simulado".
    
    FORMATO JSON OBRIGATÓRIO:
    [
      {
        "category": "${topic}",
        "difficulty": "Médio",
        "question": "Enunciado...",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "Texto da correta",
        "explanation": "Comentário técnico.",
        "source": "VUNESP 2023 - Pref. Sorocaba" 
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
  if (!genAI) throw new Error("API Key não configurada");

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.3
    }
  });

  const prompt = `
    ATUE COMO BANCA EXAMINADORA VUNESP.
    
    TÓPICO: ${topic}
    CONTEXTO GERAL: ${EDITAL_CONTEXT}
    
    TAREFA:
    Gere UMA (1) questão de múltipla escolha sobre o tópico solicitado.
    
    DIRETRIZ DE FONTE (IMPORTANTE):
    1. Tente resgatar questões REAIS de concursos anteriores da VUNESP (Agente Adm, Oficial Legislativo, Câmaras Municipais).
    2. Se usar uma questão real, preencha o campo "source" com: "Banca Ano - Órgão" (Ex: "VUNESP 2019 - Câmara de SJC").
    3. Se não houver questão real exata na sua base, crie uma INÉDITA perfeita no estilo da banca e preencha "source" com: "Inédita - Simulado".
    
    FORMATO JSON OBRIGATÓRIO (apenas o objeto):
    {
      "category": "${topic}",
      "difficulty": "Médio",
      "question": "Enunciado...",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "Texto da correta",
      "explanation": "Comentário técnico.",
      "source": "VUNESP 2023 - Pref. Sorocaba" 
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