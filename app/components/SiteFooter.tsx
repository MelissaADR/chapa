// RODAPÉ: controla a marca, os links finais e o botão para voltar ao início.
import type { ScrollToSection } from "./component-types";
import { PixelWordmark } from "./shared";

export function SiteFooter({ scrollTo }: { scrollTo: ScrollToSection }) {
  return (
    <footer className="site-footer page-shell">
      <a className="brand footer-brand" href="#inicio">
        <PixelWordmark subtitle="Grêmio estudantil · 2026" />
      </a>
      <div className="footer-links">
        <a href="#propostas">Propostas</a>
        <a href="#eventos">Agenda</a>
        <a href="#midia">Mídia</a>
        <a href="#voz">Contato</a>
      </div>
      <button type="button" className="back-top" onClick={() => scrollTo("inicio")} aria-label="Voltar ao início">↑</button>
    </footer>
  );
}
