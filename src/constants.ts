import { BookOpen, Scale, FileText, Calculator, Gavel, Building2 } from 'lucide-react';

// URL do Backend (Mantenha a sua configuração de ambiente ou a string direta se preferir)
const apiUrl = import.meta.env.VITE_APP_API_URL;
export const GAS_API_URL = apiUrl || "SUA_URL_DO_GAS_AQUI";

// --- TRILHA DE ESTUDO (Atualizada conforme Edital VUNESP 01/2025) ---
export const LEARNING_PATH = [
    {
        id: 'portugues-vunesp',
        title: 'Língua Portuguesa',
        description: 'Interpretação, Crase, Concordância, Regência e Classes de Palavras.',
        category: 'Língua Portuguesa',
        icon: 'BookOpen',
        totalLevels: 5
    },
    {
        id: 'matematica-vunesp',
        title: 'Matemática e Raciocínio',
        description: 'Razão, Proporção, Porcentagem, Equações, Geometria e Médias.',
        category: 'Matemática',
        icon: 'Calculator',
        totalLevels: 5
    },
    {
        id: 'redacao-oficial',
        title: 'Redação Oficial',
        description: 'Manual da Presidência da República: Pronomes de tratamento, ofícios e padrão culto.',
        category: 'Conhecimentos Específicos',
        icon: 'FileText',
        totalLevels: 3
    },
    {
        id: 'direito-adm',
        title: 'Direito Administrativo',
        description: 'Princípios (LIMPE), Atos, Processo Administrativo e Improbidade (Lei 8.429/92).',
        category: 'Conhecimentos Específicos',
        icon: 'Building2',
        totalLevels: 4
    },
    {
        id: 'legislacao-const',
        title: 'Constitucional e Legislativo',
        description: 'Processo Legislativo, Art. 5º, Organização do Estado e Poderes.',
        category: 'Conhecimentos Específicos',
        icon: 'Scale',
        totalLevels: 4
    },
    {
        id: 'legislacao-avancada',
        title: 'Legislação Avançada (Oficial)',
        description: 'Licitações (14.133/21), LINDB, Eleitoral e Finanças Públicas.',
        category: 'Conhecimentos Específicos',
        icon: 'Gavel', // Ícone de martelo para leis pesadas
        totalLevels: 4
    }
];

// --- CONTEXTO EXATO DO EDITAL (Para a IA) ---
export const EDITAL_CONTEXT = `
VOCÊ É A BANCA VUNESP. O CONCURSO É PARA CÂMARA MUNICIPAL DE CARAGUATATUBA.
CARGOS: AGENTE LEGISLATIVO (Médio) e OFICIAL LEGISLATIVO (Superior).

GERE QUESTÕES ESTRITAMENTE DENTRO DESTES TÓPICOS:

1. LÍNGUA PORTUGUESA (Comum a todos):
- Leitura e interpretação de diversos tipos de textos (literários e não literários).
- Sinônimos e antônimos. Sentido próprio e figurado. Pontuação.
- Classes de palavras. Concordância verbal e nominal. Regência verbal e nominal.
- Colocação pronominal. Crase.

2. MATEMÁTICA (Comum a todos):
- Operações com números racionais. Mínimo múltiplo comum e Máximo divisor comum.
- Porcentagem. Razão e proporção. Regra de três simples ou composta.
- Equações do 1º e 2º graus. Sistema de equações.
- Grandezas e medidas (quantidade, tempo, comprimento, superfície, capacidade, massa).
- Relação entre grandezas (tabela ou gráfico). Médias aritméticas.
- Geometria: forma, ângulos, área, perímetro, volume, Teoremas de Pitágoras e Tales.

3. CONHECIMENTOS ESPECÍFICOS (FUNDAMENTAL - LEGISLAÇÃO):

A) DIREITO ADMINISTRATIVO E ADMINISTRAÇÃO PÚBLICA:
- Princípios (Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência).
- Administração Direta e Indireta. Atos Administrativos (conceitos, requisitos, atributos, anulação/revogação).
- Poderes e deveres do administrador. Uso e abuso de poder.
- Lei de Improbidade Administrativa (Lei nº 8.429/92 atualizada pela 14.230/21).
- Processo Administrativo.

B) DIREITO CONSTITUCIONAL E PROCESSO LEGISLATIVO:
- Direitos e Garantias Fundamentais (Art. 5º). Direitos Sociais e Políticos.
- Organização do Estado e Municípios.
- Poder Legislativo: Atribuições, Processo Legislativo (emendas, leis, resoluções, iniciativa, quórum).
- Fiscalização Contábil, Financeira e Orçamentária.

C) REDAÇÃO OFICIAL (Muito Importante):
- Manual de Redação da Presidência da República (3ª edição).
- Pronomes de tratamento, estrutura de ofícios, memorandos, atas.
- Concisão, clareza, impessoalidade e formalidade.

D) TÓPICOS EXCLUSIVOS PARA NÍVEL SUPERIOR (OFICIAL LEGISLATIVO):
- Lei de Licitações (Lei nº 14.133/2021).
- LINDB (Dec-Lei 4.657/42). Elaboração de Leis (LC 95/98).
- Finanças Públicas (Arts. 163 a 169 da CF).
- Legislação Eleitoral: Inelegibilidades (LC 64/90) e Condutas Vedadas (Lei 9.504/97).

IMPORTANTE:
- Não crie questões de Informática (Hardware/Windows) como matéria isolada, pois não consta no edital de Conhecimentos Gerais para estes cargos.
- Foque muito na "Lei Seca" e casos práticos estilo VUNESP.
`;

export const CATEGORIES = [
    "Língua Portuguesa",
    "Matemática",
    "Conhecimentos Específicos"
];
