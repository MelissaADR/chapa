// SEÇÃO EQUIPE: controla os cards com nomes, cargos e disponibilidade dos integrantes da chapa.
import type { CSSProperties } from "react";
import { teamMembers } from "../site-data";
import { SectionTitle } from "./shared";

export function TeamSection() {
  return (
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
  );
}
