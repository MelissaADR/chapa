// SEÇÃO ARENA: controla os esportes, campeonatos, gincanas e informações de premiação.
import type { CSSProperties } from "react";
import { gameTypes, sports } from "../site-data";
import type { ScrollToSection, TiltProps } from "./component-types";

type ArenaSectionProps = TiltProps & {
  scrollTo: ScrollToSection;
};

export function ArenaSection({ scrollTo, onTilt, onTiltEnd }: ArenaSectionProps) {
  return (
    <section className="arena-section" id="arena">
      <div className="page-shell section">
        <div className="arena-heading" data-reveal>
          <span className="arena-kicker">CAMPEONATOS + GINCANAS</span>
          <h2>Entre na <span>ARENA AZUL.</span></h2>
          <p>Jogue limpo. Torça alto. Respeite sempre.</p>
        </div>
        <div className="sports-grid">
          {sports.map((sport, index) => (
            <article className="sport-card tilt-card" data-reveal key={sport.name} style={{ "--delay": `${index * 70}ms` } as CSSProperties} onPointerMove={onTilt} onPointerLeave={onTiltEnd}>
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
  );
}
