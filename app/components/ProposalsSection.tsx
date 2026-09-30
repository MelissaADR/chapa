// SEÇÃO PROPOSTAS: controla a lista de ideias, seus cards e o andamento de cada proposta.
import type { CSSProperties } from "react";
import { proposals } from "../site-data";
import type { TiltProps } from "./component-types";
import { SectionTitle } from "./shared";

export function ProposalsSection({ onTilt, onTiltEnd }: TiltProps) {
  return (
    <section className="section page-shell proposals-section" id="propostas">
      <div className="split-heading">
        <SectionTitle
          eyebrow="02 · NOSSO PLANO"
          title="PROPOSTAS"
        />
        <p data-reveal>
          Oito ideias para aprender, se divertir e valorizar toda a escola.
          Conheça o que queremos construir com você.
        </p>
      </div>
      <div className="proposal-grid">
        {proposals.map((proposal, index) => (
          <article
            className="proposal-card tilt-card"
            data-reveal
            style={{ "--delay": `${index * 55}ms` } as CSSProperties}
            key={proposal.title}
            onPointerMove={onTilt}
            onPointerLeave={onTiltEnd}
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
  );
}
