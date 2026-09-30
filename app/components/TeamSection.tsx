// SEÇÃO EQUIPE: apresenta os representantes da chapa e suas turmas.
import type { CSSProperties } from "react";
import { teamMembers } from "../site-data";
import { SectionTitle } from "./shared";

export function TeamSection() {
  return (
    <section className="section page-shell team-section" id="equipe">
      <SectionTitle
        eyebrow="08 · QUEM FAZ ACONTECER"
        title="Representantes da Chapa Azul."
        description="Uma equipe diversa, conectada e pronta para transformar boas ideias em experiências reais."
      />
      <div className="member-grid">
        {teamMembers.map((member, index) => (
          <article className="member-card" data-reveal key={member.name} style={{ "--delay": `${index * 60}ms` } as CSSProperties}>
            <span className="member-code">AZ/{member.code}</span>
            <div className="member-avatar"><span>{member.initials}</span><i /></div>
            <h3>{member.name}</h3>
            <p>Representante · {member.className}</p>
            <span className="member-status"><i /> DISPONÍVEL</span>
          </article>
        ))}
      </div>
    </section>
  );
}
