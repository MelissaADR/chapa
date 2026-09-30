// SEÇÃO MÍDIA: controla os filtros e os cards de fotos, vídeos e registros dos projetos.
import { mediaItems } from "../site-data";
import type { MediaItem } from "../site-data";
import { SectionTitle } from "./shared";

type MediaSectionProps = {
  mediaFilter: string;
  onMediaFilterChange: (filter: string) => void;
  onMediaOpen: (item: MediaItem) => void;
};

export function MediaSection({
  mediaFilter,
  onMediaFilterChange,
  onMediaOpen,
}: MediaSectionProps) {
  const filteredMedia = mediaFilter === "Todos"
    ? mediaItems
    : mediaItems.filter((item) => item.category === mediaFilter);

  return (
    <section className="section page-shell media-section" id="midia">
      <div className="media-top">
        <SectionTitle
          eyebrow="05 · CENTRO DE MÍDIA"
          title="Tudo o que a gente movimenta."
          description="Esporte, cultura e tecnologia: um gostinho do que queremos viver juntos na escola."
        />
        <div className="filter-pills" data-reveal role="group" aria-label="Filtrar centro de mídia">
          {["Todos", "Esportes", "Cultura", "Digital"].map((filter) => (
            <button type="button" key={filter} aria-pressed={mediaFilter === filter} className={mediaFilter === filter ? "is-active" : ""} onClick={() => onMediaFilterChange(filter)}>
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="media-grid">
        {filteredMedia.map((item, index) => (
          <article className={`media-card ${index === 0 && mediaFilter === "Todos" ? "media-featured" : ""}`} data-reveal key={item.id}>
            <button type="button" className="media-art" onClick={() => onMediaOpen(item)} aria-label={`Abrir ${item.title}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="media-image" src={item.image} alt={item.imageAlt} width={1672} height={941} loading="lazy" decoding="async" />
              <span className="media-category">{item.category}</span>
              <span className="media-play">↗</span>
              <span className="media-art-code">IMAGEM ILUSTRATIVA</span>
            </button>
            <div className="media-content">
              <span>{item.type} · {item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button type="button" onClick={() => onMediaOpen(item)}>Ver imagem <span>↗</span></button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
