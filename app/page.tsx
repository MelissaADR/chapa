"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  CSSProperties,
  FormEvent,
  PointerEvent as ReactPointerEvent,
} from "react";

type Comment = {
  initials: string;
  name: string;
  className: string;
  message: string;
};

type MediaItem = {
  id: number;
  category: "Esportes" | "Cultura" | "Digital";
  type: string;
  title: string;
  date: string;
  description: string;
  art: string;
};

type CalendarEvent = {
  day: number;
  month: "SET" | "OUT";
  title: string;
  category: string;
  place: string;
  time: string;
  accent: "cyan" | "violet" | "blue";
};

const navItems = [
  ["Propostas", "propostas"],
  ["Agenda", "eventos"],
  ["Arena", "arena"],
  ["Mídia", "midia"],
  ["Ranking", "participacao"],
  ["Times", "times"],
  ["Equipe", "equipe"],
] as const;

const proposals = [
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

const initialComments: Comment[] = [
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

const calendarEvents: CalendarEvent[] = [
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

const upcomingEvents: CalendarEvent[] = [
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

const sports = [
  { icon: "🏐", name: "Vôlei", detail: "Saque, união e energia", slots: "8 equipes" },
  { icon: "🏀", name: "Basquete", detail: "Cada passe conecta", slots: "6 equipes" },
  { icon: "⚽", name: "Futebol", detail: "Jogue pelo coletivo", slots: "12 equipes" },
  { icon: "🏓", name: "Ping-pong", detail: "Reflexo e precisão", slots: "24 vagas" },
];

const gameTypes = [
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

const mediaItems: MediaItem[] = [
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

const classRanking = [
  { label: "3º A", value: 91, trend: "+8" },
  { label: "2º A", value: 86, trend: "+5" },
  { label: "1º A", value: 78, trend: "+4" },
  { label: "2º B", value: 72, trend: "+2" },
  { label: "1º B", value: 64, trend: "+6" },
];

const teamRanking = [
  { label: "Futebol", value: 88, trend: "+7" },
  { label: "Vôlei", value: 84, trend: "+9" },
  { label: "Basquete", value: 76, trend: "+3" },
  { label: "Ping-pong", value: 69, trend: "+5" },
];

const schoolTeams = [
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

const teamMembers = [
  { initials: "N1", name: "Nome 1", role: "Presidência", code: "01" },
  { initials: "N2", name: "Nome 2", role: "Vice-presidência", code: "02" },
  { initials: "N3", name: "Nome 3", role: "Comunicação", code: "03" },
  { initials: "N4", name: "Nome 4", role: "Esportes e gincanas", code: "04" },
  { initials: "N5", name: "Nome 5", role: "Cultura e inclusão", code: "05" },
  { initials: "N6", name: "Nome 6", role: "Tecnologia e mídia", code: "06" },
];

function PixelWordmark({ subtitle }: { subtitle?: string }) {
  return (
    <span className="pixel-lockup">
      <span className="pixel-wordmark" aria-label="Chapa Azul">
        <span>CHAPA</span>
        <strong>AZUL</strong>
      </span>
      {subtitle ? <small>{subtitle}</small> : null}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <span className="eyebrow">
        <span className="eyebrow-dot" /> {eyebrow}
      </span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export default function Home() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [comments, setComments] = useState(initialComments);
  const [suggestionSent, setSuggestionSent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(calendarEvents[0]);
  const [calendarMonth, setCalendarMonth] = useState<CalendarEvent["month"]>("SET");
  const [mediaFilter, setMediaFilter] = useState("Todos");
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [rankingView, setRankingView] = useState<"turmas" | "equipes">(
    "turmas",
  );

  const filteredMedia = useMemo(
    () =>
      mediaFilter === "Todos"
        ? mediaItems
        : mediaItems.filter((item) => item.category === mediaFilter),
    [mediaFilter],
  );

  const calendarInfo = calendarMonth === "SET"
    ? { label: "Setembro", code: "09", leading: 2, days: 30 }
    : { label: "Outubro", code: "10", leading: 4, days: 31 };

  const calendarCells = useMemo(() => {
    const { leading, days } = calendarMonth === "SET"
      ? { leading: 2, days: 30 }
      : { leading: 4, days: 31 };
    return Array.from({ length: 35 }, (_, index) => {
      const day = index - leading + 1;
      return day > 0 && day <= days ? day : null;
    });
  }, [calendarMonth]);

  useEffect(() => {
    const root = document.documentElement;
    let animationFrame = 0;

    const onPointerMove = (event: PointerEvent) => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        root.style.setProperty("--mouse-x", `${event.clientX}px`);
        root.style.setProperty("--mouse-y", `${event.clientY}px`);
        cursorDot.current?.style.setProperty(
          "transform",
          `translate3d(${event.clientX}px, ${event.clientY}px, 0)`,
        );
        cursorRing.current?.style.setProperty(
          "transform",
          `translate3d(${event.clientX}px, ${event.clientY}px, 0)`,
        );
      });
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element;
      const isInteractive = Boolean(
        target.closest("a, button, input, textarea, .tilt-card"),
      );
      cursorRing.current?.classList.toggle("is-active", isInteractive);
    };

    const onClick = (event: MouseEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const burst = document.createElement("span");
      burst.className = "cursor-burst";
      burst.style.left = `${event.clientX}px`;
      burst.style.top = `${event.clientY}px`;
      document.body.appendChild(burst);
      window.setTimeout(() => burst.remove(), 650);
    };

    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      scrollProgress.current?.style.setProperty(
        "transform",
        `scaleX(${progress})`,
      );
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [mediaFilter, rankingView, comments.length]);

  useEffect(() => {
    if (!activeMedia) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      modalRef.current?.querySelector<HTMLElement>("button")?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMedia(null);
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocus.current?.focus();
    };
  }, [activeMedia]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, [menuOpen]);

  const handleTilt = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    element.style.setProperty("--tilt-y", `${(x - 0.5) * 8}deg`);
    element.style.setProperty("--tilt-x", `${(0.5 - y) * 8}deg`);
    element.style.setProperty("--glare-x", `${x * 100}%`);
    element.style.setProperty("--glare-y", `${y * 100}%`);
  };

  const resetTilt = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
  };

  const handleSuggestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "Estudante").trim();
    const className = String(formData.get("className") || "Turma").trim();
    const message = String(formData.get("message") || "").trim();
    if (!message) return;
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    setComments((current) => [
      { initials: initials || "EA", name, className, message },
      ...current,
    ]);
    setSuggestionSent(true);
    form.reset();
    window.setTimeout(() => setSuggestionSent(false), 4500);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const changeCalendarMonth = (month: CalendarEvent["month"]) => {
    setCalendarMonth(month);
    const firstEvent = upcomingEvents.find((event) => event.month === month);
    if (firstEvent) setSelectedEvent(firstEvent);
  };

  const currentRanking =
    rankingView === "turmas" ? classRanking : teamRanking;

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="cursor-dot" ref={cursorDot} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRing} aria-hidden="true" />
      <div className="scroll-progress" ref={scrollProgress} aria-hidden="true" />

      <div className="ambient" aria-hidden="true">
        <span className="aurora aurora-one" />
        <span className="aurora aurora-two" />
        <span className="aurora aurora-three" />
        <span className="aurora aurora-four" />
        <span className="tech-grid" />
        <span className="noise" />
        <div className="particle-field">
          {Array.from({ length: 18 }, (_, index) => (
            <span
              key={index}
              style={
                {
                  "--i": index,
                  "--particle-x": `${(index * 31) % 96}%`,
                  "--particle-y": `${(index * 47) % 94}%`,
                  "--particle-size": `${2 + (index % 3)}px`,
                  "--particle-opacity": 0.18 + (index % 5) * 0.1,
                  "--particle-duration": `${8 + index * 0.55}s`,
                  "--particle-delay": `${index * -0.7}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Chapa Azul — início">
          <PixelWordmark subtitle="Grêmio estudantil" />
        </a>

        <nav id="main-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "is-active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <button className="header-cta" type="button" onClick={() => scrollTo("voz")}>
          Envie sua ideia <span>↗</span>
        </button>
        <button
          className={menuOpen ? "menu-toggle is-open" : "menu-toggle"}
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </header>

      <main id="conteudo">
        <section className="hero page-shell" id="inicio">
          <div className="hero-copy">
            <div className="signal-pill hero-enter hero-delay-1">
              <span className="signal-wave" />
              CHAPA AZUL · 2026
              <span className="signal-status">ONLINE</span>
            </div>
            <h1 className="hero-enter hero-delay-2">
              A escola em
              <span className="outline-word"> movimento.</span>
              <span className="gradient-line">A voz é de todo mundo.</span>
            </h1>
            <p className="hero-lead hero-enter hero-delay-3">
              Ideias que saem do papel, esporte que conecta e participação que
              transforma. Um novo jeito de viver a escola começa agora.
            </p>
            <div className="hero-actions hero-enter hero-delay-4">
              <button className="button button-primary" type="button" onClick={() => scrollTo("propostas")}>
                Conheça as propostas <span>↗</span>
              </button>
              <button className="button button-ghost" type="button" onClick={() => scrollTo("eventos")}>
                <span className="button-pulse" /> Ver calendário
              </button>
            </div>
            <div className="hero-stats hero-enter hero-delay-5">
              <div>
                <strong>12</strong>
                <span>propostas abertas</span>
              </div>
              <div>
                <strong>08</strong>
                <span>eventos planejados</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>feito com os alunos</span>
              </div>
            </div>
          </div>

          <div
            className="hero-system tilt-card hero-enter hero-delay-3"
            onPointerMove={handleTilt}
            onPointerLeave={resetTilt}
          >
            <div className="system-topline">
              <span>AZUL.OS / MOVIMENTO</span>
              <span className="system-live"><i /> AO VIVO</span>
            </div>
            <div className="radar-stage">
              <div className="radar-ring ring-one" />
              <div className="radar-ring ring-two" />
              <div className="radar-ring ring-three" />
              <div className="radar-scan" />
              <div className="radar-axis axis-x" />
              <div className="radar-axis axis-y" />
              <div className="radar-core">
                <span>CHAPA</span>
                <strong>AZUL</strong>
                <small>01</small>
              </div>
              <span className="radar-node node-one" />
              <span className="radar-node node-two" />
              <span className="radar-node node-three" />
              <div className="floating-data data-one">
                <span>PRÓXIMO EVENTO</span>
                <strong>12 SET</strong>
              </div>
              <div className="floating-data data-two">
                <span>PARTICIPAÇÃO</span>
                <strong>+24%</strong>
              </div>
            </div>
            <div className="system-footer">
              <span>ENERGIA COLETIVA</span>
              <div className="signal-bars">
                <i /><i /><i /><i /><i />
              </div>
              <span>STATUS · ATIVO</span>
            </div>
          </div>

          <button className="scroll-cue" type="button" onClick={() => scrollTo("sobre")} aria-label="Ir para a próxima seção">
            <span>Role para descobrir</span>
            <i>↓</i>
          </button>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...Array(2)].map((_, group) => (
              <span key={group}>
                ESPORTE <i>✦</i> CULTURA <i>✦</i> TECNOLOGIA <i>✦</i> ESCUTA <i>✦</i> INCLUSÃO <i>✦</i> MOVIMENTO <i>✦</i>
              </span>
            ))}
          </div>
        </div>

        <section className="section page-shell about-section" id="sobre">
          <SectionTitle
            eyebrow="01 · SOBRE A CHAPA"
            title="Feita com você, não apenas para você."
            description="A Chapa Azul nasceu para ouvir os alunos, aproximar as turmas e criar experiências que façam a escola pulsar dentro e fora da sala."
          />

          <div className="manifesto-grid">
            <article className="manifesto-card tilt-card" data-reveal onPointerMove={handleTilt} onPointerLeave={resetTilt}>
              <span className="card-index">MISSÃO / 01</span>
              <p>
                Transformar participação em <em>ação real</em>, com espaço para
                todas as vozes e resultados que todo mundo consegue acompanhar.
              </p>
              <div className="manifesto-line" />
              <span className="manifesto-sign">CHAPA AZUL · COLETIVO 2026</span>
            </article>
            <div className="values-grid">
              {[
                ["01", "Escuta ativa", "Toda opinião merece espaço."],
                ["02", "Movimento", "Mais cultura, esporte e integração."],
                ["03", "Transparência", "Cada ideia com retorno e resultado."],
                ["04", "Inclusão", "Todo mundo entra no jogo."],
              ].map(([number, title, text], index) => (
                <article className="value-card" data-number={number} data-reveal style={{ "--delay": `${index * 70}ms` } as CSSProperties} key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section page-shell proposals-section" id="propostas">
          <div className="split-heading">
            <SectionTitle
              eyebrow="02 · NOSSO PLANO"
              title="Ideias que podem virar realidade."
            />
            <p data-reveal>
              Propostas vivas: você acompanha, comenta e ajuda a construir cada
              próxima etapa.
            </p>
          </div>
          <div className="proposal-grid">
            {proposals.map((proposal, index) => (
              <article
                className="proposal-card tilt-card"
                data-reveal
                style={{ "--delay": `${index * 55}ms` } as CSSProperties}
                key={proposal.title}
                onPointerMove={handleTilt}
                onPointerLeave={resetTilt}
              >
                <div className="proposal-top">
                  <span>{proposal.number}</span>
                  <i>{proposal.icon}</i>
                </div>
                <h3>{proposal.title}</h3>
                <p>{proposal.text}</p>
                <div className="proposal-status">
                  <span /> {proposal.tag}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section page-shell voice-section" id="voz">
          <div className="voice-layout">
            <div className="voice-copy">
              <SectionTitle
                eyebrow="03 · VOZ DOS ALUNOS"
                title="A escola fala. A Chapa Azul escuta."
                description="Conte o que pode melhorar. As melhores ideias começam com alguém decidindo falar."
              />
              <div className="comment-stack">
                {comments.slice(0, 3).map((comment, index) => (
                  <article className="comment-card" data-reveal key={`${comment.name}-${index}`}>
                    <div className="avatar">{comment.initials}</div>
                    <div>
                      <div className="comment-meta">
                        <strong>{comment.name}</strong>
                        <span>{comment.className}</span>
                      </div>
                      <p>“{comment.message}”</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <form className="idea-form tilt-card" onSubmit={handleSuggestion} data-reveal onPointerMove={handleTilt} onPointerLeave={resetTilt}>
              <div className="form-orbit" aria-hidden="true" />
              <span className="form-code">CANAL ABERTO · #AZUL-IDEIAS</span>
              <h3>O que você mudaria primeiro?</h3>
              <p>Sua mensagem entra no nosso mural e ajuda a definir prioridades.</p>
              <span className="local-note">Demonstração local · a mensagem permanece no mural até a página ser recarregada.</span>
              <div className="input-row">
                <label>
                  <span>Seu nome</span>
                  <input name="name" type="text" placeholder="Ex.: Ana C." maxLength={30} required />
                </label>
                <label>
                  <span>Turma</span>
                  <input name="className" type="text" placeholder="Ex.: 2º B" maxLength={12} required />
                </label>
              </div>
              <label>
                <span>Sua ideia</span>
                <textarea name="message" placeholder="Conte sua ideia em poucas palavras..." rows={5} maxLength={280} required />
              </label>
              <div className="form-bottom">
                <span>Até 280 caracteres</span>
                <button className="button button-primary" type="submit">
                  Enviar sugestão <span>↗</span>
                </button>
              </div>
              <div className={suggestionSent ? "form-success is-visible" : "form-success"} role="status" aria-live="polite">
                <span>✓</span> Ideia recebida! Ela já faz parte do movimento.
              </div>
            </form>
          </div>
        </section>

        <section className="section page-shell events-section" id="eventos">
          <SectionTitle
            eyebrow="04 · AGENDA EM MOVIMENTO"
            title="Marque na agenda. Encontre sua próxima experiência."
            description="Calendário centralizado para ninguém ficar de fora dos encontros, campeonatos e gincanas."
          />
          <div className="calendar-layout">
            <div className="calendar-panel" data-reveal>
              <div className="calendar-header">
                <div>
                  <span>CALENDÁRIO / {calendarInfo.code}.2026</span>
                  <h3>{calendarInfo.label} <strong>2026</strong></h3>
                </div>
                <div className="calendar-controls" aria-label="Mês exibido">
                  <button type="button" aria-label="Ver setembro" disabled={calendarMonth === "SET"} onClick={() => changeCalendarMonth("SET")}>←</button>
                  <button type="button" aria-label="Ver outubro" disabled={calendarMonth === "OUT"} onClick={() => changeCalendarMonth("OUT")}>→</button>
                </div>
              </div>
              <div className="weekdays" aria-hidden="true">
                {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((day) => <span key={day}>{day}</span>)}
              </div>
              <div className="calendar-grid">
                {calendarCells.map((day, index) => {
                  if (!day) return <span className="empty-day" key={`empty-${index}`} />;
                  const event = upcomingEvents.find((item) => item.month === calendarMonth && item.day === day);
                  if (!event) return <span className="calendar-day" key={day}>{day}</span>;
                  return (
                    <button
                      type="button"
                      className={`calendar-day has-event ${selectedEvent.month === calendarMonth && selectedEvent.day === day ? "is-selected" : ""} event-${event.accent}`}
                      key={day}
                      onClick={() => setSelectedEvent(event)}
                      aria-label={`${day} de ${calendarInfo.label.toLowerCase()}: ${event.title}`}
                    >
                      {day}<i />
                    </button>
                  );
                })}
              </div>
              <div className="selected-event" aria-live="polite">
                <div className={`date-block event-${selectedEvent.accent}`}>
                  <strong>{selectedEvent.day}</strong>
                  <span>{selectedEvent.month}</span>
                </div>
                <div>
                  <span>{selectedEvent.category}</span>
                  <h4>{selectedEvent.title}</h4>
                  <p>{selectedEvent.place} · {selectedEvent.time}</p>
                </div>
                <span className="event-arrow" aria-hidden="true">↗</span>
              </div>
            </div>

            <div className="event-list" data-reveal>
              <div className="event-list-header">
                <span>PRÓXIMOS EVENTOS</span>
                <span>{String(upcomingEvents.length).padStart(2, "0")} NO RADAR</span>
              </div>
              {upcomingEvents.map((event, index) => (
                <button className="event-row" type="button" key={`${event.month}-${event.day}`} onClick={() => { setSelectedEvent(event); setCalendarMonth(event.month); }}>
                  <span className="event-count">0{index + 1}</span>
                  <span className={`event-date event-${event.accent}`}><strong>{event.day}</strong>{event.month}</span>
                  <span className="event-info">
                    <small>{event.category}</small>
                    <strong>{event.title}</strong>
                    <em>{event.place} · {event.time}</em>
                  </span>
                  <i>↗</i>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="arena-section" id="arena">
          <div className="page-shell section">
            <div className="arena-heading" data-reveal>
              <span className="arena-kicker">CAMPEONATOS + GINCANAS</span>
              <h2>Entre na <span>ARENA AZUL.</span></h2>
              <p>Jogue limpo. Torça alto. Respeite sempre.</p>
            </div>
            <div className="sports-grid">
              {sports.map((sport, index) => (
                <article className="sport-card tilt-card" data-reveal key={sport.name} style={{ "--delay": `${index * 70}ms` } as CSSProperties} onPointerMove={handleTilt} onPointerLeave={resetTilt}>
                  <div className="sport-icon" aria-hidden="true"><span>{sport.icon}</span></div>
                  <span className="sport-number">0{index + 1}</span>
                  <h3>{sport.name}</h3>
                  <p>{sport.detail}</p>
                  <div className="sport-slots"><i /> {sport.slots}</div>
                </article>
              ))}
            </div>

            <div className="prize-banner" data-reveal>
              <div className="prize-symbol" aria-hidden="true">★</div>
              <div>
                <span>PREMIAÇÃO DA GRANDE FINAL</span>
                <h3>Troféu itinerante, medalhas e uma experiência para a equipe campeã.</h3>
                <p>Premiação final sujeita à aprovação da escola.</p>
              </div>
              <button className="button button-light" type="button" onClick={() => scrollTo("voz")}>
                Inscrever equipe <span>↗</span>
              </button>
            </div>

            <div className="game-types">
              <div className="game-intro" data-reveal>
                <span>TRÊS MODOS DE JOGAR</span>
                <h3>Tem desafio para todo tipo de talento.</h3>
              </div>
              {gameTypes.map((game) => (
                <article className="game-card" data-reveal key={game.index}>
                  <span className="game-index">{game.index}</span>
                  <div>
                    <small>{game.code}</small>
                    <h4>{game.title}</h4>
                    <p>{game.text}</p>
                  </div>
                  <i>↗</i>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section page-shell media-section" id="midia">
          <div className="media-top">
            <SectionTitle
              eyebrow="05 · CENTRO DE MÍDIA"
              title="Tudo o que a gente movimenta."
              description="Registros, bastidores e resultados dos projetos organizados pela Chapa Azul."
            />
            <div className="filter-pills" data-reveal role="group" aria-label="Filtrar centro de mídia">
              {["Todos", "Esportes", "Cultura", "Digital"].map((filter) => (
                <button type="button" key={filter} aria-pressed={mediaFilter === filter} className={mediaFilter === filter ? "is-active" : ""} onClick={() => setMediaFilter(filter)}>
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="media-grid">
            {filteredMedia.map((item, index) => (
              <article className={`media-card ${index === 0 && mediaFilter === "Todos" ? "media-featured" : ""}`} data-reveal key={item.id}>
                <button type="button" className={`media-art ${item.art}`} onClick={() => setActiveMedia(item)} aria-label={`Abrir ${item.title}`}>
                  <span className="art-grid" />
                  <span className="art-orbit" />
                  <span className="media-category">{item.category}</span>
                  <span className="media-play">↗</span>
                  <span className="media-art-code">AZUL.MEDIA / 0{item.id}</span>
                </button>
                <div className="media-content">
                  <span>{item.type} · {item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <button type="button" onClick={() => setActiveMedia(item)}>Abrir cobertura <span>↗</span></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section participation-section" id="participacao">
          <div className="page-shell">
            <div className="participation-heading">
              <SectionTitle
                eyebrow="06 · DADOS ABERTOS"
                title="O placar da participação."
                description="O ranking celebra presença e colaboração — não apenas vitória."
              />
              <div className="live-badge" data-reveal><i /> DADOS DE DEMONSTRAÇÃO</div>
            </div>

            <div className="dashboard-grid">
              <div className="ranking-panel" data-reveal>
                <div className="panel-header">
                  <div>
                    <span>PARTICIPAÇÃO / SETEMBRO</span>
                    <h3>Presença nos eventos</h3>
                  </div>
                  <div className="ranking-toggle" role="group" aria-label="Tipo de ranking">
                    <button type="button" aria-pressed={rankingView === "turmas"} className={rankingView === "turmas" ? "is-active" : ""} onClick={() => setRankingView("turmas")}>Turmas</button>
                    <button type="button" aria-pressed={rankingView === "equipes"} className={rankingView === "equipes" ? "is-active" : ""} onClick={() => setRankingView("equipes")}>Equipes</button>
                  </div>
                </div>
                <div className="ranking-list">
                  {currentRanking.map((item, index) => (
                    <div className="ranking-row" key={item.label} data-reveal>
                      <span className="rank-position">{String(index + 1).padStart(2, "0")}</span>
                      <strong>{item.label}</strong>
                      <div className="rank-track" role="progressbar" aria-label={`Participação de ${item.label}`} aria-valuenow={item.value} aria-valuemin={0} aria-valuemax={100}><i style={{ "--rank": `${item.value}%` } as CSSProperties} /></div>
                      <span className="rank-value">{item.value}%</span>
                      <small>↑ {item.trend}</small>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="spotlight-card tilt-card" data-reveal onPointerMove={handleTilt} onPointerLeave={resetTilt}>
                <div className="spotlight-top">
                  <span>DESTAQUE DO MÊS</span>
                  <i>★</i>
                </div>
                <div className="spotlight-avatar"><span>JM</span><i /></div>
                <h3>Júlia M.</h3>
                <p>2º A · Participou de <strong>7 eventos</strong></p>
                <div className="spotlight-stats">
                  <div><strong>04</strong><span>modalidades</span></div>
                  <div><strong>21h</strong><span>em ação</span></div>
                </div>
                <span className="spotlight-note">Participação registrada com autorização.</span>
              </aside>

              <div className="summary-strip" data-reveal>
                <div><strong>312</strong><span>participações registradas</span></div>
                <div><strong>14</strong><span>equipes ativas</span></div>
                <div><strong>08</strong><span>eventos realizados</span></div>
                <div><strong>+24%</strong><span>adesão este mês</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section page-shell teams-section" id="times">
          <div className="split-heading">
            <SectionTitle
              eyebrow="07 · TIMES DA ESCOLA"
              title="Quem veste a camisa faz parte da história."
            />
            <p data-reveal>Conheça as equipes, acompanhe resultados e encontre seu lugar no próximo jogo.</p>
          </div>
          <div className="school-team-grid">
            {schoolTeams.map((team, index) => (
              <article className={`school-team-card tilt-card ${team.color}`} data-reveal key={team.name} style={{ "--delay": `${index * 60}ms` } as CSSProperties} onPointerMove={handleTilt} onPointerLeave={resetTilt}>
                <div className="team-crest"><span>{team.initials}</span><i /></div>
                <div className="team-copy">
                  <span>{team.sport}</span>
                  <h3>{team.name}</h3>
                  <p>{team.captain}</p>
                </div>
                <div className="team-record"><i /> {team.record}</div>
                <button type="button" onClick={() => scrollTo("voz")} aria-label={`Quero participar do time ${team.name}`}>↗</button>
              </article>
            ))}
          </div>
        </section>

        <section className="section page-shell team-section" id="equipe">
          <SectionTitle
            eyebrow="08 · QUEM FAZ ACONTECER"
            title="Responsabilidades claras. Portas sempre abertas."
            description="Uma equipe diversa, conectada e pronta para transformar boas ideias em experiências reais."
          />
          <p className="demo-note" data-reveal>Os nomes desta versão são ilustrativos e devem ser substituídos pelos integrantes oficiais.</p>
          <div className="member-grid">
            {teamMembers.map((member, index) => (
              <article className="member-card" data-reveal key={member.name} style={{ "--delay": `${index * 60}ms` } as CSSProperties}>
                <span className="member-code">AZ/{member.code}</span>
                <div className="member-avatar"><span>{member.initials}</span><i /></div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <span className="member-status"><i /> DISPONÍVEL</span>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta page-shell" data-reveal>
          <div className="final-grid" aria-hidden="true" />
          <div className="final-orb" aria-hidden="true"><PixelWordmark /></div>
          <span className="eyebrow"><span className="eyebrow-dot" /> O PRÓXIMO PASSO É SEU</span>
          <h2>A próxima mudança pode começar com a <span>sua ideia.</span></h2>
          <p>Vem construir uma escola mais ativa, conectada e azul com a gente.</p>
          <div className="final-actions">
            <button className="button button-light" type="button" onClick={() => scrollTo("voz")}>Participar da Chapa Azul <span>↗</span></button>
            <button className="button button-outline-light" type="button" onClick={() => scrollTo("equipe")}>Falar com a equipe</button>
          </div>
        </section>
      </main>

      <footer className="site-footer page-shell">
        <a className="brand footer-brand" href="#inicio">
          <PixelWordmark subtitle="Grêmio estudantil · 2026" />
        </a>
        <div className="footer-links">
          <a href="#propostas">Propostas</a>
          <a href="#eventos">Agenda</a>
          <a href="#midia">Mídia</a>
          <a href="#voz">Contato</a>
        </div>
        <button type="button" className="back-top" onClick={() => scrollTo("inicio")} aria-label="Voltar ao início">↑</button>
      </footer>

      {activeMedia ? (
        <div className="modal-backdrop">
          <button className="modal-dismiss" type="button" onClick={() => setActiveMedia(null)} aria-label="Fechar cobertura" />
          <div ref={modalRef} className="media-modal" role="dialog" aria-modal="true" aria-labelledby="media-modal-title" aria-describedby="media-modal-description">
            <button className="modal-close" type="button" onClick={() => setActiveMedia(null)} aria-label="Fechar cobertura">×</button>
            <div className={`modal-art media-art ${activeMedia.art}`}>
              <span className="art-grid" />
              <span className="art-orbit" />
              <span className="media-art-code">AZUL.MEDIA / 0{activeMedia.id}</span>
            </div>
            <div className="modal-copy">
              <span>{activeMedia.category} · {activeMedia.date}</span>
              <h2 id="media-modal-title">{activeMedia.title}</h2>
              <p id="media-modal-description">{activeMedia.description}</p>
              <div className="modal-placeholder">
                <i>+</i>
                <span>Espaço pronto para receber as fotos e vídeos oficiais do evento.</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
