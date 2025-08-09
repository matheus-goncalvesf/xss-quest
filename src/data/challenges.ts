import { Challenge } from '@/types/challenge';

export const challenges: Challenge[] = [
  // BÁSICO (1-15)
  {
    id: 1,
    title: "Primeiro Contato",
    description: "Bem-vindo ao laboratório XSS! Execute seu primeiro script simples.",
    category: 'basic',
    difficulty: 1,
    completed: false,
    hints: [
      "Procure por um campo de entrada na página",
      "Tente inserir uma tag <script>",
      "Use alert() para mostrar um popup"
    ],
    solution: "<script>alert('XSS')</script>",
    vulnerabilityType: 'reflected',
    instructions: [
      "Encontre o campo de entrada",
      "Insira um payload XSS básico",
      "Observe o resultado na página"
    ],
    component: "Challenge1"
  },
  {
    id: 2,
    title: "Comentário Malicioso",
    description: "Um sistema de comentários que não filtra entrada do usuário.",
    category: 'basic',
    difficulty: 1,
    completed: false,
    hints: [
      "O sistema salva comentários permanentemente",
      "Outros usuários verão seu comentário",
      "Tente inserir JavaScript no comentário"
    ],
    solution: "<script>alert('Stored XSS')</script>",
    vulnerabilityType: 'stored',
    instructions: [
      "Adicione um comentário malicioso",
      "Recarregue a página para ver o efeito",
      "Note que o script roda automaticamente"
    ],
    component: "Challenge2"
  },
  {
    id: 3,
    title: "Perfil de Usuário",
    description: "Edite seu perfil e veja a magia acontecer.",
    category: 'basic',
    difficulty: 2,
    completed: false,
    hints: [
      "O nome do usuário é exibido diretamente na página",
      "Não há sanitização no backend",
      "Tente diferentes tags HTML"
    ],
    solution: "<img src=x onerror=alert('Profile XSS')>",
    vulnerabilityType: 'stored',
    instructions: [
      "Edite seu nome de usuário",
      "Use uma tag que executa JavaScript automaticamente",
      "Salve e observe o resultado"
    ],
    component: "Challenge3"
  },
  {
    id: 4,
    title: "Busca Perigosa",
    description: "Um sistema de busca que reflete sua pesquisa na página.",
    category: 'basic',
    difficulty: 2,
    completed: false,
    hints: [
      "O termo de busca aparece na URL",
      "A página mostra o que você pesquisou",
      "Tente pesquisar por código HTML"
    ],
    solution: "<script>alert('Search XSS')</script>",
    vulnerabilityType: 'reflected',
    instructions: [
      "Use a função de busca",
      "Insira código malicioso como termo de busca",
      "Observe como é refletido na página"
    ],
    component: "Challenge4"
  },
  {
    id: 5,
    title: "URL Maliciosa",
    description: "Às vezes a vulnerabilidade está na própria URL.",
    category: 'basic',
    difficulty: 2,
    completed: false,
    hints: [
      "Observe os parâmetros da URL",
      "A página lê dados diretamente da URL",
      "Modifique a URL manualmente"
    ],
    solution: "?message=<script>alert('URL XSS')</script>",
    vulnerabilityType: 'url',
    instructions: [
      "Examine a URL atual",
      "Adicione ou modifique parâmetros",
      "Injete código através da URL"
    ],
    component: "Challenge5"
  },

  // INTERMEDIÁRIO (6-25)
  {
    id: 6,
    title: "Filtro Ingênuo",
    description: "Um filtro básico tenta bloquear <script>, mas não é inteligente.",
    category: 'intermediate',
    difficulty: 2,
    completed: false,
    hints: [
      "A palavra 'script' está bloqueada",
      "Existem outras formas de executar JavaScript",
      "Tente usar eventos HTML"
    ],
    solution: "<img src=x onerror=alert('Bypass')>",
    vulnerabilityType: 'filter-bypass',
    instructions: [
      "Tente inserir <script> primeiro para ver o filtro",
      "Use um método alternativo de execução",
      "Confirme que conseguiu bypassar a proteção"
    ],
    component: "Challenge6"
  },
  {
    id: 7,
    title: "DOM XSS Oculto",
    description: "O JavaScript da página manipula dados sem sanitização.",
    category: 'intermediate',
    difficulty: 3,
    completed: false,
    hints: [
      "O problema está no JavaScript da página",
      "Dados são inseridos diretamente no DOM",
      "Use innerHTML ou similar para sua vantagem"
    ],
    solution: "<img src=x onerror=alert('DOM XSS')>",
    vulnerabilityType: 'dom',
    instructions: [
      "Analise como a página manipula dados",
      "Encontre onde o JavaScript insere conteúdo",
      "Explore a falta de sanitização"
    ],
    component: "Challenge7"
  },
  {
    id: 8,
    title: "Formulário de Contato",
    description: "Um formulário que exibe dados sem verificação adequada.",
    category: 'intermediate',
    difficulty: 3,
    completed: false,
    hints: [
      "Múltiplos campos podem ser vulneráveis",
      "Teste diferentes campos do formulário",
      "O preview mostra dados não sanitizados"
    ],
    solution: "<script>alert('Contact XSS')</script>",
    vulnerabilityType: 'reflected',
    instructions: [
      "Preencha o formulário de contato",
      "Insira payloads em diferentes campos",
      "Use o preview para ver o resultado"
    ],
    component: "Challenge8"
  },

  // Continuaria com mais 40+ fases...
  {
    id: 9,
    title: "JSON Injection",
    description: "Dados JSON são inseridos diretamente no JavaScript da página.",
    category: 'intermediate',
    difficulty: 3,
    completed: false,
    hints: [
      "A página usa dados JSON",
      "JSON é inserido em uma tag <script>",
      "Escape do contexto JSON"
    ],
    solution: "</script><script>alert('JSON XSS')</script>",
    vulnerabilityType: 'dom',
    instructions: [
      "Encontre onde os dados JSON são usados",
      "Escape do contexto JSON",
      "Execute seu código JavaScript"
    ],
    component: "Challenge9"
  },
  {
    id: 10,
    title: "Filtro Case-Sensitive",
    description: "O filtro só bloqueia 'script' em minúsculas.",
    category: 'intermediate',
    difficulty: 2,
    completed: false,
    hints: [
      "O filtro diferencia maiúsculas de minúsculas",
      "Tente variações de capitalização",
      "HTML não é case-sensitive"
    ],
    solution: "<SCRIPT>alert('Case Bypass')</SCRIPT>",
    vulnerabilityType: 'filter-bypass',
    instructions: [
      "Teste o filtro com 'script' minúsculo",
      "Tente com letras maiúsculas",
      "Confirme que o bypass funcionou"
    ],
    component: "Challenge10"
  }
];

// Função para obter desafios por categoria
export const getChallengesByCategory = (category: Challenge['category']) => {
  return challenges.filter(challenge => challenge.category === category);
};

// Função para obter desafio por ID
export const getChallengeById = (id: number) => {
  return challenges.find(challenge => challenge.id === id);
};