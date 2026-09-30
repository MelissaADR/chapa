"use client";

import { useState } from "react";
import type { FormEvent } from "react";
// Conexões com os componentes visuais que formam cada parte da página.
import {
  AboutSection,
  AmbientBackground,
  ArenaSection,
  EventsSection,
  FinalCta,
  HeroSection,
  MediaModal,
  MediaSection,
  MovementMarquee,
  ParticipationSection,
  ProposalsSection,
  SiteFooter,
  SiteHeader,
  TeamSection,
  TeamsSection,
  VoiceSection,
} from "./components";
import type { RankingView } from "./components";
// Conexão com os dados iniciais usados pelo calendário e pelos comentários.
import { calendarEvents, initialComments } from "./site-data";
import type { CalendarEvent, MediaItem } from "./site-data";
// Conexões com as funções de animação, menu, cursor e modal.
import {
  handleTilt,
  resetTilt,
  useMediaModal,
  useMenuEscape,
  useRevealEffects,
  useSiteChrome,
} from "./site-interactions";

export default function Home() {
  // ESTADOS DO MENU E DOS COMENTÁRIOS: controlam o menu, o mural e o aviso de envio.
  const [menuOpen, setMenuOpen] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [suggestionSent, setSuggestionSent] = useState(false);

  // ESTADOS DO CALENDÁRIO: guardam o evento selecionado e o mês visível.
  const [selectedEvent, setSelectedEvent] = useState(calendarEvents[0]);
  const [calendarMonth, setCalendarMonth] =
    useState<CalendarEvent["month"]>("SET");

  // ESTADOS DE MÍDIA E RANKING: controlam filtro, modal e tipo de classificação.
  const [mediaFilter, setMediaFilter] = useState("Todos");
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [rankingView, setRankingView] = useState<RankingView>("turmas");

  // CONEXÕES DA PÁGINA: ativam cursor, progresso, animações, modal e teclado.
  const { activeSection, cursorDot, cursorRing, scrollProgress } =
    useSiteChrome();
  useRevealEffects(mediaFilter, rankingView, comments.length);
  const modalRef = useMediaModal(activeMedia, setActiveMedia);
  useMenuEscape(menuOpen, setMenuOpen);

  // COMENTÁRIOS: recebe o formulário e adiciona a nova sugestão ao mural.
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

  // MENU E BOTÕES: rola suavemente até a seção escolhida.
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* FUNDO: elementos decorativos, cursor personalizado e barra de progresso. */}
      <AmbientBackground
        cursorDotRef={cursorDot}
        cursorRingRef={cursorRing}
        scrollProgressRef={scrollProgress}
      />
      {/* MENU: cabeçalho, navegação e controle do menu para celular. */}
      <SiteHeader
        menuOpen={menuOpen}
        activeSection={activeSection}
        onMenuOpenChange={setMenuOpen}
        scrollTo={scrollTo}
      />

      <main id="conteudo">
        {/* INÍCIO: apresentação principal e botões de chamada. */}
        <HeroSection
          scrollTo={scrollTo}
        />
        {/* FAIXA DE MOVIMENTO: mensagem animada entre o início e o conteúdo. */}
        <MovementMarquee />
        {/* SOBRE: explica a proposta geral da chapa. */}
        <AboutSection onTilt={handleTilt} onTiltEnd={resetTilt} />
        {/* PROPOSTAS: cards alimentados pelos dados de propostas. */}
        <ProposalsSection onTilt={handleTilt} onTiltEnd={resetTilt} />
        {/* COMENTÁRIOS: mural e formulário para novas sugestões. */}
        <VoiceSection
          comments={comments}
          suggestionSent={suggestionSent}
          onSuggestionSubmit={handleSuggestion}
          onTilt={handleTilt}
          onTiltEnd={resetTilt}
        />
        {/* CALENDÁRIO: agenda, troca de mês e detalhes do evento selecionado. */}
        <EventsSection
          selectedEvent={selectedEvent}
          calendarMonth={calendarMonth}
          onSelectedEventChange={setSelectedEvent}
          onCalendarMonthChange={setCalendarMonth}
        />
        {/* ESPORTES: modalidades, jogos e acesso à seção de times. */}
        <ArenaSection
          scrollTo={scrollTo}
          onTilt={handleTilt}
          onTiltEnd={resetTilt}
        />
        {/* MÍDIA: filtros e abertura das publicações no modal. */}
        <MediaSection
          mediaFilter={mediaFilter}
          onMediaFilterChange={setMediaFilter}
          onMediaOpen={setActiveMedia}
        />
        {/* RANKINGS: alterna entre a classificação de turmas e modalidades. */}
        <ParticipationSection
          rankingView={rankingView}
          onRankingViewChange={setRankingView}
          onTilt={handleTilt}
          onTiltEnd={resetTilt}
        />
        {/* TIMES: cards dos times e ligação com outras seções. */}
        <TeamsSection
          scrollTo={scrollTo}
          onTilt={handleTilt}
          onTiltEnd={resetTilt}
        />
        {/* EQUIPE: integrantes e cargos da chapa. */}
        <TeamSection />
        {/* CHAMADA FINAL: convite e botão de retorno para uma seção do site. */}
        <FinalCta scrollTo={scrollTo} />
      </main>

      {/* RODAPÉ: informações finais e atalhos de navegação. */}
      <SiteFooter scrollTo={scrollTo} />
      {/* MODAL DE MÍDIA: mostra a publicação escolhida sobre o restante da página. */}
      <MediaModal
        activeMedia={activeMedia}
        modalRef={modalRef}
        onClose={() => setActiveMedia(null)}
      />
    </>
  );
}
