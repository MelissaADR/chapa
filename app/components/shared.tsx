// ELEMENTOS REUTILIZÁVEIS: controla o logotipo em texto e o modelo de título usado nas seções.
export function PixelWordmark({ subtitle }: { subtitle?: string }) {
  return (
    <span className="pixel-lockup">
      <span className="pixel-wordmark" aria-label="Chapa Azul">
        <span>CHAPA</span>
        <strong>AZUL</strong>
      </span>
      {subtitle ? <small>{subtitle}</small> : null}
    </span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <span className="eyebrow">
        <span className="eyebrow-dot" /> {eyebrow}
      </span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
