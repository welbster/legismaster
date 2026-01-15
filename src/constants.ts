// src/constants.ts

// MANTENHA A URL DO SEU BACKEND AQUI
export const GAS_API_URL = "https://script.google.com/macros/s/AKfycbzB2BoIohF7LcOrCV-Mvf3faUUm9jqqlBRZmeNrekU7BYmCVUP-kODUgNsje0xjWkuHIw/exec";

// Definição da Trilha de Estudo
export const LEARNING_PATH = [
    {
        id: 'portugues-interpretacao',
        title: 'Interpretação de Textos',
        description: 'Compreensão, tipologia textual e ortografia oficial.',
        category: 'Língua Portuguesa',
        icon: 'BookOpen',
        totalLevels: 5
    },
    {
        id: 'const-principios',
        title: 'Princípios Fundamentais',
        description: 'Artigos 1º ao 4º da CF/88 e Direitos Garantias.',
        category: 'Legislação',
        icon: 'Scale',
        totalLevels: 3
    },
    {
        id: 'adm-publica',
        title: 'Administração Pública',
        description: 'Artigos 37 a 41 da CF e Lei de Improbidade.',
        category: 'Legislação',
        icon: 'Scale',
        totalLevels: 4
    },
    {
        id: 'matematica-basica',
        title: 'Raciocínio Lógico e Matemática',
        description: 'Razão, proporção, porcentagem e equações.',
        category: 'Matemática',
        icon: 'Calculator',
        totalLevels: 4
    },
    {
        id: 'informatica-office',
        title: 'Informática e Office',
        description: 'Windows 11, Word, Excel e Segurança.',
        category: 'Noções de Informática',
        icon: 'Cpu',
        totalLevels: 3
    },
    {
        id: 'legislacao-municipal',
        title: 'Legislação Municipal',
        description: 'Lei Orgânica e Regimento Interno de Caraguatatuba.',
        category: 'Conhecimentos Específicos',
        icon: 'FileText',
        totalLevels: 5
    }
];

export const EDITAL_CONTEXT = `
Você é um tutor especialista para o concurso da Câmara de Caraguatatuba.
Gere questões estilo VUNESP (múltipla escolha, 4 alternativas).
Foque estritamente no tópico solicitado.
`;

export const CATEGORIES = Array.from(new Set(LEARNING_PATH.map(item => item.category)));
