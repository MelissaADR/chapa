// MENU E CABEÇALHO: controla a marca, a navegação principal e a abertura do menu no celular.
import { navItems } from "../site-data";
import type { ScrollToSection } from "./component-types";
import { PixelWordmark } from "./shared";

type SiteHeaderProps = {
  menuOpen: boolean;
  activeSection: string;
  onMenuOpenChange: (open: boolean) => void;
  scrollTo: ScrollToSection;
};

export function SiteHeader({
  menuOpen,
  activeSection,
  onMenuOpenChange,
  scrollTo,
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Chapa Azul — início">
        <PixelWordmark subtitle="Grêmio estudantil" />
      </a>

      <nav id="main-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
        {navItems.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeSection === id ? "is-active" : ""}
            onClick={() => onMenuOpenChange(false)}
          >
            {label}
          </a>
        ))}
      </nav>

      <button className="header-cta" type="button" onClick={() => scrollTo("voz")}>
        Envie sua ideia <span>↗</span>
      </button>
      <button
        className={menuOpen ? "menu-toggle is-open" : "menu-toggle"}
        type="button"
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => onMenuOpenChange(!menuOpen)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
