// FUNDO E EFEITOS GERAIS: controla o cursor, o progresso da página, as luzes e as partículas decorativas.
import type { CSSProperties, RefObject } from "react";

type AmbientBackgroundProps = {
  cursorDotRef: RefObject<HTMLDivElement | null>;
  cursorRingRef: RefObject<HTMLDivElement | null>;
  scrollProgressRef: RefObject<HTMLDivElement | null>;
};

export function AmbientBackground({
  cursorDotRef,
  cursorRingRef,
  scrollProgressRef,
}: AmbientBackgroundProps) {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRingRef} aria-hidden="true" />
      <div className="scroll-progress" ref={scrollProgressRef} aria-hidden="true" />

      <div className="ambient" aria-hidden="true">
        <span className="aurora aurora-one" />
        <span className="aurora aurora-two" />
        <span className="aurora aurora-three" />
        <span className="aurora aurora-four" />
        <span className="tech-grid" />
        <span className="noise" />
        <div className="particle-field">
          {Array.from({ length: 18 }, (_, index) => (
            <span
              key={index}
              style={
                {
                  "--i": index,
                  "--particle-x": `${(index * 31) % 96}%`,
                  "--particle-y": `${(index * 47) % 94}%`,
                  "--particle-size": `${2 + (index % 3)}px`,
                  "--particle-opacity": 0.18 + (index % 5) * 0.1,
                  "--particle-duration": `${8 + index * 0.55}s`,
                  "--particle-delay": `${index * -0.7}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
