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
  art: string;
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
  ["Times", "times"],
  ["Equipe", "equipe"],
] as const;

// PROPOSTAS: conteúdo dos cards da seção de propostas.
export const proposals = [
  {
    number: "01",
    icon: "↗",
    title: "Quadra viva",
    text: "Treinos abertos, campeonatos mistos e mais acesso aos espaços esportivos.",
    tag: "Em movimento",
  },
  {
    number: "02",
    icon: "◎",
    title: "Mente em jogo",
    text: "Xadrez, quiz, desafios de lógica e olimpíadas para todo tipo de talento.",
    tag: "Próxima etapa",
  },
  {
    number: "03",
    icon: "⌁",
    title: "Conecta escola",
    text: "Calendário digital, central de avisos e resultados fáceis de acompanhar.",
    tag: "Planejada",
  },
  {
    number: "04",
    icon: "✦",
    title: "Espaço do aluno",
    text: "Mural de sugestões, rodas de conversa e devolutiva sobre cada proposta.",
    tag: "Recebendo ideias",
  },
  {
    number: "05",
    icon: "◌",
    title: "Escola em cena",
    text: "Cultura, música, talentos, oficinas e eventos que aproximam as turmas.",
    tag: "Co-criação",
  },
  {
    number: "06",
    icon: "⊕",
    title: "Bem-estar real",
    text: "Acolhimento, campanhas de cuidado e intervalos mais leves e inclusivos.",
    tag: "Prioridade",
  },
];

// COMENTÁRIOS: mensagens que aparecem inicialmente no mural de sugestões.
export const initialComments: Comment[] = [
  {
    initials: "AC",
    name: "Ana C.",
    className: "2º B",
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
    className: "3º C",
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
    type: "Álbum · 28 fotos",
    title: "Bastidores da Gincana Azul",
    date: "28 AGO 2026",
    description:
      "Energia, torcida e os melhores momentos da abertura da nossa gincana.",
    art: "art-court",
  },
  {
    id: 2,
    category: "Esportes",
    type: "Vídeo · 01:42",
    title: "Treino aberto de vôlei",
    date: "22 AGO 2026",
    description:
      "Um treino coletivo para descobrir talentos e montar os próximos times.",
    art: "art-volley",
  },
  {
    id: 3,
    category: "Cultura",
    type: "Galeria · 16 fotos",
    title: "Mutirão criativo",
    date: "16 AGO 2026",
    description:
      "Cartazes, ideias e muita colaboração para deixar a escola com a nossa cara.",
    art: "art-creative",
  },
  {
    id: 4,
    category: "Digital",
    type: "Resumo · 60 segundos",
    title: "O mês em movimento",
    date: "02 AGO 2026",
    description:
      "Tudo o que aconteceu, os próximos passos e como você pode participar.",
    art: "art-digital",
  },
];

// RANKING DE TURMAS: pontuação e variação mostradas na participação.
export const classRanking = [
  { label: "3º A", value: 91, trend: "+8" },
  { label: "2º A", value: 86, trend: "+5" },
  { label: "1º A", value: 78, trend: "+4" },
  { label: "2º B", value: 72, trend: "+2" },
  { label: "1º B", value: 64, trend: "+6" },
];

// RANKING DE MODALIDADES: pontuação dos esportes na mesma seção.
export const teamRanking = [
  { label: "Futebol", value: 88, trend: "+7" },
  { label: "Vôlei", value: 84, trend: "+9" },
  { label: "Basquete", value: 76, trend: "+3" },
  { label: "Ping-pong", value: 69, trend: "+5" },
];

// TIMES: informações dos times e classes de cor de cada card.
export const schoolTeams = [
  {
    initials: "3DS",
    name: "3DS",
    sport: "Vôlei misto",
    captain: "Representante · A definir",
    record: "6 vitórias",
    color: "team-cyan",
  },
  {
    initials: "3A",
    name: "3ADM",
    sport: "Basquete",
    captain: "Representante · A definir",
    record: "4 vitórias",
    color: "team-blue",
  },
  {
    initials: "M2",
    name: "M 2DS",
    sport: "Futebol",
    captain: "Representante · A definir",
    record: "8 vitórias",
    color: "team-violet",
  },
  {
    initials: "1D",
    name: "1D",
    sport: "Tênis de mesa",
    captain: "Representante · A definir",
    record: "11 vitórias",
    color: "team-electric",
  },
  {
    initials: "2C",
    name: "2C",
    sport: "Gincana mista",
    captain: "Representante · A definir",
    record: "5 desafios",
    color: "team-cobalt",
  },
];

// EQUIPE: integrantes da chapa, cargos e identificações exibidos no site.
export const teamMembers = [
  { initials: "N1", name: "Nome 1", role: "Presidência", code: "01" },
  { initials: "N2", name: "Nome 2", role: "Vice-presidência", code: "02" },
  { initials: "N3", name: "Nome 3", role: "Comunicação", code: "03" },
  { initials: "N4", name: "Nome 4", role: "Esportes e gincanas", code: "04" },
  { initials: "N5", name: "Nome 5", role: "Cultura e inclusão", code: "05" },
  { initials: "N6", name: "Nome 6", role: "Tecnologia e mídia", code: "06" },
];
