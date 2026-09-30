// Tipos compartilhados pelos blocos de comentários, mídia e calendário.
export type Comment = {
  initials: string;
  name: string;
  className: string;
  message: string;
};

export type MediaItem = {
  id: number;
  category: "Esportes" | "Cultura" | "Digital";
  type: string;
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type CalendarEvent = {
  day: number;
  month: "SET" | "OUT";
  title: string;
  category: string;
  place: string;
  time: string;
  accent: "cyan" | "violet" | "blue";
};

// MENU: links exibidos no cabeçalho e IDs das seções para onde cada link leva.
export const navItems = [
  ["Propostas", "propostas"],
  ["Agenda", "eventos"],
  ["Arena", "arena"],
  ["Mídia", "midia"],
  ["Ranking", "participacao"],
  ["Turmas", "times"],
  ["Equipe", "equipe"],
] as const;

// PROPOSTAS: conteúdo dos cards da seção de propostas.
export const proposals = [
  {
    number: "01",
    icon: "↗",
    title: "Gincana",
    text: "Três categorias: jogos digitais, físicos e mentais. Os professores acompanhariam os desafios para entender como cada aluno pensa e age. A partir dessa observação, poderiam adaptar as aulas e explorar novas formas de ensinar, ajudando cada um a aprender melhor e desenvolver seu potencial.",
    tag: "Aprender participando",
  },
  {
    number: "02",
    icon: "◎",
    title: "Caça ao tesouro",
    text: "Na Páscoa, a tradicional caça aos ovos daria lugar a uma caça ao tesouro cheia de enigmas e charadas. Os professores também entrariam na brincadeira, fantasiados para tornar o dia ainda mais divertido e motivar a participação de todos.",
    tag: "Páscoa com aventura",
  },
  {
    number: "03",
    icon: "⌁",
    title: "Eventos todos os meses",
    text: "Um evento a cada mês, com acompanhamento da participação de cada turma e de cada aluno. No final do ano, a turma e a pessoa com maior participação receberiam um prêmio e ganhariam destaque aqui no site.",
    tag: "Participação em destaque",
  },
  {
    number: "04",
    icon: "✦",
    title: "Casamento na festa junina",
    text: "Um casamento de mentirinha na festa junina, com encenação, personagens e muita diversão. Uma brincadeira para reunir as turmas e entrar no clima do nosso arraiá.",
    tag: "Tradição e diversão",
  },
  {
    number: "05",
    icon: "◌",
    title: "Feirinha de livros",
    text: "Uma feira com livros por até R$ 20 e um sistema de tickets para escolher e retirar os exemplares. A ideia é aproximar os alunos da leitura e facilitar o acesso a novas histórias.",
    tag: "Mais leitura, mais histórias",
  },
  {
    number: "06",
    icon: "⊕",
    title: "Festa para professores e funcionários",
    text: "Uma comemoração em homenagem aos professores e a todos os trabalhadores da escola. Queremos reconhecer quem faz parte do nosso dia a dia e cuidar da comunidade escolar inteira, incluindo quem ensina, organiza e mantém tudo funcionando.",
    tag: "Toda a escola importa",
  },
  {
    number: "07",
    icon: "✧",
    title: "Festa à fantasia",
    text: "Um Halloween diferente, com uma festa à fantasia para soltar a criatividade. A pessoa com a fantasia mais incrível receberia um prêmio, dando um toque especial à celebração.",
    tag: "Criatividade no Halloween",
  },
  {
    number: "08",
    icon: "♡",
    title: "Dia dos Namorados",
    text: "Um baile de Dia dos Namorados com rei e rainha, além do tradicional correio elegante para trocar mensagens e deixar a data ainda mais especial.",
    tag: "Baile e correio elegante",
  },
];

// TURMAS: lista compartilhada pelo ranking, pelos cards e pelo formulário.
export const schoolClasses = [
  "1º A",
  "1º B",
  "1º C",
  "2º DS",
  "2º ADM",
  "2º C",
  "3º DS",
  "3º ADM",
  "3º VENDAS",
  "3º D",
] as const;

// COMENTÁRIOS: mensagens que aparecem inicialmente no mural de sugestões.
export const initialComments: Comment[] = [
  {
    initials: "AC",
    name: "Ana C.",
    className: "2º ADM",
    message:
      "Gostaria de mais horários para usar a quadra e campeonatos mistos.",
  },
  {
    initials: "LM",
    name: "Lucas M.",
    className: "1º A",
    message:
      "Um espaço de estudos e jogos mentais deixaria os intervalos melhores.",
  },
  {
    initials: "BS",
    name: "Beatriz S.",
    className: "3º VENDAS",
    message:
      "Quero acompanhar de um jeito simples quais propostas já estão acontecendo.",
  },
];

// CALENDÁRIO: eventos destacados no calendário principal.
export const calendarEvents: CalendarEvent[] = [
  {
    day: 12,
    month: "SET",
    title: "Festival esportivo",
    category: "Esportes",
    place: "Quadra principal",
    time: "13h30",
    accent: "cyan",
  },
  {
    day: 18,
    month: "SET",
    title: "Roda de ideias",
    category: "Encontro",
    place: "Auditório",
    time: "10h20",
    accent: "violet",
  },
  {
    day: 26,
    month: "SET",
    title: "Eliminatórias de vôlei",
    category: "Campeonato",
    place: "Ginásio",
    time: "09h00",
    accent: "blue",
  },
];

// PRÓXIMOS EVENTOS: lista completa usada para apresentar a agenda futura.
export const upcomingEvents: CalendarEvent[] = [
  ...calendarEvents,
  {
    day: 3,
    month: "OUT",
    title: "Desafio de jogos mentais",
    category: "Gincana",
    place: "Biblioteca",
    time: "14h00",
    accent: "violet",
  },
  {
    day: 10,
    month: "OUT",
    title: "Arena digital",
    category: "Jogos digitais",
    place: "Laboratório",
    time: "13h00",
    accent: "cyan",
  },
  {
    day: 17,
    month: "OUT",
    title: "Final da Gincana Azul",
    category: "Grande final",
    place: "Pátio central",
    time: "15h30",
    accent: "blue",
  },
];

// ESPORTES: modalidades e quantidade de equipes ou vagas exibidas na arena.
export const sports = [
  { icon: "🏐", name: "Vôlei", detail: "Saque, união e energia", slots: "8 equipes" },
  { icon: "🏀", name: "Basquete", detail: "Cada passe conecta", slots: "6 equipes" },
  { icon: "⚽", name: "Futebol", detail: "Jogue pelo coletivo", slots: "12 equipes" },
  { icon: "🏓", name: "Ping-pong", detail: "Reflexo e precisão", slots: "24 vagas" },
];

// TIPOS DE JOGOS: categorias de atividades apresentadas na seção da arena.
export const gameTypes = [
  {
    index: "01",
    title: "Jogos práticos",
    text: "Circuito cooperativo, desafio de precisão e caça às pistas.",
    code: "MOVIMENTO",
  },
  {
    index: "02",
    title: "Jogos mentais",
    text: "Xadrez, quiz relâmpago, sudoku e caça ao código.",
    code: "ESTRATÉGIA",
  },
  {
    index: "03",
    title: "Jogos digitais",
    text: "Corrida arcade, futebol digital e desafios de estratégia.",
    code: "TECNOLOGIA",
  },
];

// MÍDIA: publicações que podem ser filtradas e abertas no modal.
export const mediaItems: MediaItem[] = [
  {
    id: 1,
    category: "Esportes",
    type: "Imagem ilustrativa",
    title: "Gincana Azul: todo mundo no jogo",
    date: "PROPOSTA 2026",
    description:
      "Uma ideia de como jogos, torcida e colaboração podem reunir as turmas na nossa gincana.",
    image: "/images/media/gincana.png",
    imageAlt: "Ilustração de uma gincana escolar com jogos e participação das turmas.",
  },
  {
    id: 2,
    category: "Esportes",
    type: "Imagem ilustrativa",
    title: "Treino aberto de vôlei",
    date: "PROPOSTA 2026",
    description:
      "Uma proposta de treino coletivo para descobrir talentos e aproximar os futuros times.",
    image: "/images/media/volei.png",
    imageAlt: "Ilustração de alunos jogando vôlei em uma quadra escolar.",
  },
  {
    id: 3,
    category: "Cultura",
    type: "Imagem ilustrativa",
    title: "Mutirão criativo",
    date: "PROPOSTA 2026",
    description:
      "Cartazes, arte e colaboração: uma inspiração para deixar a escola com a cara dos alunos.",
    image: "/images/media/criatividade.png",
    imageAlt: "Ilustração de uma atividade criativa com cartazes e materiais de arte na escola.",
  },
  {
    id: 4,
    category: "Digital",
    type: "Imagem ilustrativa",
    title: "Desafios digitais",
    date: "PROPOSTA 2026",
    description:
      "Tecnologia, estratégia e trabalho em equipe nos jogos digitais propostos para a gincana.",
    image: "/images/media/digital.png",
    imageAlt: "Ilustração de uma atividade de jogos digitais em equipe na escola.",
  },
];

// RANKING DE TURMAS: valores fictícios para a demonstração do painel.
const demoParticipation = [91, 86, 82, 78, 74, 70, 67, 64, 60, 56];
const demoTrends = [8, 5, 4, 6, 3, 2, 5, 4, 3, 2];
export const classRanking = schoolClasses.map((label, index) => ({
  label,
  value: demoParticipation[index],
  trend: `+${demoTrends[index]}`,
}));

// RANKING DE MODALIDADES: pontuação dos esportes na mesma seção.
export const teamRanking = [
  { label: "Futebol", value: 88, trend: "+7" },
  { label: "Vôlei", value: 84, trend: "+9" },
  { label: "Basquete", value: 76, trend: "+3" },
  { label: "Ping-pong", value: 69, trend: "+5" },
];

// TURMAS DA ESCOLA: todas as turmas podem participar das atividades.
const teamColors = ["team-cyan", "team-blue", "team-violet", "team-electric", "team-cobalt"];
export const schoolTeams = schoolClasses.map((name, index) => ({
  initials: name.replace("º ", "").replace("VENDAS", "V"),
  name,
  sport: "Turma da escola",
  captain: "Representante · A definir",
  record: "Faça parte",
  color: teamColors[index % teamColors.length],
}));

// EQUIPE: integrantes da chapa, cargos e identificações exibidos no site.
export const teamMembers = [
  { initials: "N1", name: "Nome 1", role: "Presidência", code: "01" },
  { initials: "N2", name: "Nome 2", role: "Vice-presidência", code: "02" },
  { initials: "N3", name: "Nome 3", role: "Comunicação", code: "03" },
  { initials: "N4", name: "Nome 4", role: "Esportes e gincanas", code: "04" },
  { initials: "N5", name: "Nome 5", role: "Cultura e inclusão", code: "05" },
  { initials: "N6", name: "Nome 6", role: "Tecnologia e mídia", code: "06" },
];
