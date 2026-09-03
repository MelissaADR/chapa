// SEÇÃO SOBRE: controla a apresentação da chapa, sua missão e seus valores.
import type { CSSProperties } from "react";
import type { TiltProps } from "./component-types";
import { SectionTitle } from "./shared";

export function AboutSection({ onTilt, onTiltEnd }: TiltProps) {
  return (
    <section className="section page-shell about-section" id="sobre">
      <SectionTitle
        eyebrow="01 · SOBRE A CHAPA"
        title="Feita com você, não apenas para você."
        description="A Chapa Azul nasceu para ouvir os alunos, aproximar as turmas e criar experiências que façam a escola pulsar dentro e fora da sala."
      />

      <div className="manifesto-grid">
        <article className="manifesto-card tilt-card" data-reveal onPointerMove={onTilt} onPointerLeave={onTiltEnd}>
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
  );
}
