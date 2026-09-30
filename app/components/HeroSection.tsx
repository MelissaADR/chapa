// TELA INICIAL: destaque principal, botões, números, logo com Gumball e faixa de movimento.
import { proposals, schoolClasses } from "../site-data";
import type { ScrollToSection } from "./component-types";
import { PixelWordmark } from "./shared";

type HeroSectionProps = {
  scrollTo: ScrollToSection;
};

export function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
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
            <strong>{String(proposals.length).padStart(2, "0")}</strong>
            <span>propostas</span>
          </div>
          <div>
            <strong>{schoolClasses.length}</strong>
            <span>turmas unidas</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>feito com os alunos</span>
          </div>
        </div>
      </div>

      <div className="hero-brand hero-enter hero-delay-3">
        {/* A imagem original aponta para a marca à direita. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-gumball"
          src="/images/gumball-apontando.png"
          alt="Gumball apontando para a logo da Chapa Azul"
          width={454}
          height={521}
          fetchPriority="high"
        />
        <div className="hero-logo">
          <PixelWordmark subtitle="Grêmio estudantil" />
        </div>
      </div>

      <button className="scroll-cue" type="button" onClick={() => scrollTo("sobre")} aria-label="Ir para a próxima seção">
        <span>Role para descobrir</span>
        <i>↓</i>
      </button>
    </section>
  );
}

export function MovementMarquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...Array(2)].map((_, group) => (
          <span key={group}>
            ESPORTE <i>✦</i> CULTURA <i>✦</i> TECNOLOGIA <i>✦</i> ESCUTA <i>✦</i> INCLUSÃO <i>✦</i> MOVIMENTO <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
