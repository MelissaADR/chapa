// SEÇÃO TIMES: controla os times da escola, seus resultados e o botão para participar.
import type { CSSProperties } from "react";
import { schoolTeams } from "../site-data";
import type { ScrollToSection, TiltProps } from "./component-types";
import { SectionTitle } from "./shared";

type TeamsSectionProps = TiltProps & {
  scrollTo: ScrollToSection;
};

export function TeamsSection({ scrollTo, onTilt, onTiltEnd }: TeamsSectionProps) {
  return (
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
          <article className={`school-team-card tilt-card ${team.color}`} data-reveal key={team.name} style={{ "--delay": `${index * 60}ms` } as CSSProperties} onPointerMove={onTilt} onPointerLeave={onTiltEnd}>
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
  );
}
