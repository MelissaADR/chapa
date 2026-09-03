// TELA INICIAL: controla o destaque principal, seus botões, números, arte animada e faixa de movimento.
import type { ScrollToSection, TiltProps } from "./component-types";

type HeroSectionProps = TiltProps & {
  scrollTo: ScrollToSection;
};

export function HeroSection({ scrollTo, onTilt, onTiltEnd }: HeroSectionProps) {
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
        onPointerMove={onTilt}
        onPointerLeave={onTiltEnd}
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
