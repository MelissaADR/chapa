// SEÇÃO VOZ DOS ALUNOS: controla os comentários e o formulário para enviar novas sugestões.
import type { FormEvent } from "react";
import { schoolClasses, type Comment } from "../site-data";
import type { TiltProps } from "./component-types";
import { SectionTitle } from "./shared";

type VoiceSectionProps = TiltProps & {
  comments: Comment[];
  suggestionSent: boolean;
  onSuggestionSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function VoiceSection({
  comments,
  suggestionSent,
  onSuggestionSubmit,
  onTilt,
  onTiltEnd,
}: VoiceSectionProps) {
  return (
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

        <form className="idea-form tilt-card" onSubmit={onSuggestionSubmit} data-reveal onPointerMove={onTilt} onPointerLeave={onTiltEnd}>
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
              <select name="className" defaultValue="" required>
                <option value="" disabled>Selecione</option>
                {schoolClasses.map((className) => (
                  <option value={className} key={className}>{className}</option>
                ))}
              </select>
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
  );
}
