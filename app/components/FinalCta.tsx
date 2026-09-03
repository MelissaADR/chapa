// CHAMADA FINAL: controla o convite exibido antes do rodapé e seus botões de navegação.
import type { ScrollToSection } from "./component-types";
import { PixelWordmark } from "./shared";

export function FinalCta({ scrollTo }: { scrollTo: ScrollToSection }) {
  return (
    <section className="final-cta page-shell" data-reveal>
      <div className="final-grid" aria-hidden="true" />
      <div className="final-orb" aria-hidden="true"><PixelWordmark /></div>
      <span className="eyebrow"><span className="eyebrow-dot" /> O PRÓXIMO PASSO É SEU</span>
      <h2>A próxima mudança pode começar com a <span>sua ideia.</span></h2>
      <p>Vem construir uma escola mais ativa, conectada e azul com a gente.</p>
      <div className="final-actions">
        <button className="button button-light" type="button" onClick={() => scrollTo("voz")}>Participar da Chapa Azul <span>↗</span></button>
        <button className="button button-outline-light" type="button" onClick={() => scrollTo("equipe")}>Falar com a equipe</button>
      </div>
    </section>
  );
}
