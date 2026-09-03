// TIPOS COMPARTILHADOS: define os formatos usados pelas funções de rolagem e inclinação dos cards.
import type { PointerEvent as ReactPointerEvent } from "react";

export type ScrollToSection = (id: string) => void;
export type TiltHandler = (event: ReactPointerEvent<HTMLElement>) => void;

export type TiltProps = {
  onTilt: TiltHandler;
  onTiltEnd: TiltHandler;
};
