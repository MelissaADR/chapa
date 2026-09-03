"use client";

import { useEffect, useRef, useState } from "react";
import type {
  Dispatch,
  PointerEvent as ReactPointerEvent,
  SetStateAction,
} from "react";
import type { MediaItem } from "./site-data";

// CURSOR, PROGRESSO E MENU ATIVO: acompanha mouse/rolagem e identifica a seção visível.
export function useSiteChrome() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const root = document.documentElement;
    let animationFrame = 0;

    const onPointerMove = (event: PointerEvent) => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        root.style.setProperty("--mouse-x", `${event.clientX}px`);
        root.style.setProperty("--mouse-y", `${event.clientY}px`);
        cursorDot.current?.style.setProperty(
          "transform",
          `translate3d(${event.clientX}px, ${event.clientY}px, 0)`,
        );
        cursorRing.current?.style.setProperty(
          "transform",
          `translate3d(${event.clientX}px, ${event.clientY}px, 0)`,
        );
      });
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element;
      const isInteractive = Boolean(
        target.closest("a, button, input, textarea, .tilt-card"),
      );
      cursorRing.current?.classList.toggle("is-active", isInteractive);
    };

    const onClick = (event: MouseEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const burst = document.createElement("span");
      burst.className = "cursor-burst";
      burst.style.left = `${event.clientX}px`;
      burst.style.top = `${event.clientY}px`;
      document.body.appendChild(burst);
      window.setTimeout(() => burst.remove(), 650);
    };

    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      scrollProgress.current?.style.setProperty(
        "transform",
        `scaleX(${progress})`,
      );
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      sectionObserver.disconnect();
    };
  }, []);

  return { activeSection, cursorDot, cursorRing, scrollProgress };
}

// ANIMAÇÕES DE ENTRADA: mostra os elementos marcados com data-reveal durante a rolagem.
export function useRevealEffects(
  mediaFilter: string,
  rankingView: "turmas" | "equipes",
  commentsLength: number,
) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [mediaFilter, rankingView, commentsLength]);
}

// MODAL DE MÍDIA: bloqueia o fundo, controla foco, Tab e fechamento pela tecla Esc.
export function useMediaModal(
  activeMedia: MediaItem | null,
  setActiveMedia: Dispatch<SetStateAction<MediaItem | null>>,
) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!activeMedia) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      modalRef.current?.querySelector<HTMLElement>("button")?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMedia(null);
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocus.current?.focus();
    };
  }, [activeMedia, setActiveMedia]);

  return modalRef;
}

// MENU NO TECLADO: permite fechar o menu de celular usando a tecla Esc.
export function useMenuEscape(
  menuOpen: boolean,
  setMenuOpen: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, [menuOpen, setMenuOpen]);
}

// EFEITO 3D DOS CARDS: calcula inclinação e brilho a partir da posição do ponteiro.
export function handleTilt(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType === "touch") return;
  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  element.style.setProperty("--tilt-y", `${(x - 0.5) * 8}deg`);
  element.style.setProperty("--tilt-x", `${(0.5 - y) * 8}deg`);
  element.style.setProperty("--glare-x", `${x * 100}%`);
  element.style.setProperty("--glare-y", `${y * 100}%`);
}

// RETORNO DO CARD: remove a inclinação quando o ponteiro sai do elemento.
export function resetTilt(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
}
