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
      <button className="modal-dismiss" type="button" onClick={onClose} aria-label="Fechar cobertura" />
      <div ref={modalRef} className="media-modal" role="dialog" aria-modal="true" aria-labelledby="media-modal-title" aria-describedby="media-modal-description">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar cobertura">×</button>
        <div className={`modal-art media-art ${activeMedia.art}`}>
          <span className="art-grid" />
          <span className="art-orbit" />
          <span className="media-art-code">AZUL.MEDIA / 0{activeMedia.id}</span>
        </div>
        <div className="modal-copy">
          <span>{activeMedia.category} · {activeMedia.date}</span>
          <h2 id="media-modal-title">{activeMedia.title}</h2>
          <p id="media-modal-description">{activeMedia.description}</p>
          <div className="modal-placeholder">
            <i>+</i>
            <span>Espaço pronto para receber as fotos e vídeos oficiais do evento.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
