// MODAL DE MÍDIA: controla a janela que abre os detalhes de uma publicação e o botão de fechar.
import type { RefObject } from "react";
import type { MediaItem } from "../site-data";

type MediaModalProps = {
  activeMedia: MediaItem | null;
  modalRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
};

export function MediaModal({ activeMedia, modalRef, onClose }: MediaModalProps) {
  if (!activeMedia) return null;

  return (
    <div className="modal-backdrop">
      <button className="modal-dismiss" type="button" onClick={onClose} aria-label="Fechar imagem" />
      <div ref={modalRef} className="media-modal" role="dialog" aria-modal="true" aria-labelledby="media-modal-title" aria-describedby="media-modal-description">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar imagem">×</button>
        <div className="modal-art media-art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="media-image" src={activeMedia.image} alt={activeMedia.imageAlt} width={1672} height={941} />
        </div>
        <div className="modal-copy">
          <span>{activeMedia.category} · {activeMedia.date}</span>
          <h2 id="media-modal-title">{activeMedia.title}</h2>
          <p id="media-modal-description">{activeMedia.description}</p>
          <p className="media-image-note">Ilustração criada para apresentar as ideias da Chapa Azul.</p>
        </div>
      </div>
    </div>
  );
}
