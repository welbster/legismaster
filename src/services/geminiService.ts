import { GoogleGenerativeAI } from "@google/generative-ai";
import { EDITAL_CONTEXT } from "../constants";

// ATUALIZADO: Lendo a nova variável
const apiKey = import.meta.env.VITE_APP_AI_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const generateSession = async (topic: string, description: string) => {
  if (!genAI) throw new Error("API Key não configurada (VITE_APP_AI_KEY)");

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2 // Baixa temperatura para precisão nas leis
    }
  });

  const prompt = `
    ATUE COMO A BANCA VUNESP (CONCURSO CÂMARA DE CARAGUATATUBA).
    
    CONTEXTO DO EDITAL:
    ${EDITAL_CONTEXT}
    
    TÓPICO SOLICITADO: ${topic}
    DESCRIÇÃO DO MÓDULO: ${description}
    
    TAREFA:
    Gere 5 (cinco) questões de múltipla escolha.
    
    DIRETRIZES DE ESTILO VUNESP:
    1. Se for MATEMÁTICA: Use situações-problema (ex: "Um funcionário precisa organizar arquivos..."). Calcule a resposta antes de definir o gabarito.
    2. Se for PORTUGUÊS: Foque em interpretação de texto, crase, regência e concordância. Use frases formais.
    3. Se for REDAÇÃO OFICIAL: Pergunte sobre o uso correto de pronomes de tratamento ou estrutura do padrão ofício segundo o Manual da Presidência.
    4. Se for DIREITO/LEGISLAÇÃO:
       - Para "Legislação Avançada": Nível Superior. Cobre Lei 14.133/21 ou LC 95/98 com profundidade.
       - Para os demais: Nível Médio/Superior. Cobre Art. 5º da CF, Atos Administrativos e Lei 8.429/92.
    
    FORMATO JSON OBRIGATÓRIO:
    [
      {
        "category": "${topic}",
        "difficulty": "Médio", // ou "Difícil" se for tópico de Oficial
        "question": "Enunciado da questão...",
        "options": ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"], 
        "correctAnswer": "Texto exato da correta",
        "explanation": "Explicação citando o Artigo da Lei ou a regra gramatical.",
        "source": "Inédita - Estilo VUNESP"
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