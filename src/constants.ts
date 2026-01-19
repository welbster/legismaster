import { BookOpen, Scale, FileText, Calculator, Gavel, Building2 } from 'lucide-react';

const apiUrl = import.meta.env.VITE_APP_API_URL;
export const GAS_API_URL = apiUrl || "";

// TRILHA DE ESTUDO (Focada no Edital de Caraguatatuba)
export const LEARNING_PATH = [
    {
        id: 'portugues-vunesp',
        title: 'Língua Portuguesa (VUNESP)',
        description: 'Interpretação, Crase, Regência, Concordância e Classes de Palavras.',
        category: 'Língua Portuguesa',
        icon: 'BookOpen',
        totalLevels: 5
    },
    {
        id: 'matematica-vunesp',
        title: 'Matemática (Situações-Problema)',
        description: 'Razão, Proporção, Porcentagem, Equações e Geometria aplicada.',
        category: 'Matemática',
        icon: 'Calculator',
        totalLevels: 5
    },
    {
        id: 'redacao-oficial',
        title: 'Redação Oficial',
        description: 'Manual da Presidência: Pronomes de tratamento, Ofício, Memorando e Ata.',
        category: 'Conhecimentos Específicos',
        icon: 'FileText',
        totalLevels: 3
    },
    {
        id: 'direito-adm-const',
        title: 'Direito Adm. e Constitucional',
        description: 'Art. 5º, 37-41 da CF/88, Princípios da Adm. e Lei de Improbidade.',
        category: 'Legislação',
        icon: 'Scale',
        totalLevels: 4
    },
    {
        id: 'legislacao-municipal',
        title: 'Legislação Municipal',
        description: 'Lei Orgânica de Caraguatatuba e Regimento Interno.',
        category: 'Conhecimentos Específicos',
        icon: 'Building2',
        totalLevels: 4
    },
    {
        id: 'licitacoes-contratos',
        title: 'Licitações (Oficial Legislativo)',
        description: 'Lei 14.133/2021: Modalidades, Dispensa e Inexigibilidade.',
        category: 'Conhecimentos Específicos',
        icon: 'Gavel',
        totalLevels: 3
    }
];

// CONTEXTO REFINADO - SEM INFORMÁTICA
export const EDITAL_CONTEXT = `
VOCÊ É A BANCA VUNESP. CONCURSO: CÂMARA DE CARAGUATATUBA.
CARGOS: AGENTE E OFICIAL LEGISLATIVO.

BASE DE DADOS DE ESTILO (USE O ESTILO DESTAS PROVAS, MAS FILTRE O ASSUNTO):
- Câmaras de: Araras, Piracicaba, Poá, SJC, Guaratinguetá, Sorocaba.

REGRAS DE CONTEÚDO (ESTRITAS):
1. NÃO GERE QUESTÕES DE INFORMÁTICA (Windows, Word, Excel, Hardware). Isso NÃO cai na prova teórica destes cargos.
2. PORTUGUÊS: Estilo VUNESP clássico. Textos longos, questões de "sentido equivalente", crase antes de verbo/pronome, colocação pronominal.
3. MATEMÁTICA: Situações-problema. Histórinhas que exigem regra de três, MDC/MMC ou áreas. Nada de cálculo seco.
4. REDAÇÃO OFICIAL: Manual da Presidência da República. Pergunte sobre fechos (Atenciosamente x Respeitosamente), pronomes (Vossa Excelência x Vossa Senhoria) e estrutura do padrão ofício.
5. LEGISLAÇÃO:
   - Lei Orgânica de Caraguatatuba (crie inéditas imitando o estilo da VUNESP).
   - Regimento Interno (crie inéditas focadas em Processo Legislativo e Mesa Diretora).
   - Constituição (Arts 37-41) e Improbidade (Lei 8.429 atualizada).
   - Lei 14.133 (Licitações) apenas para nível Superior.
`;

export const CATEGORIES = LEARNING_PATH.map(m => m.title);
