// SEÇÃO PARTICIPAÇÃO: controla o painel de dados e a troca entre os rankings de turmas e equipes.
import type { CSSProperties } from "react";
import { classRanking, teamRanking } from "../site-data";
import type { TiltProps } from "./component-types";
import { SectionTitle } from "./shared";

export type RankingView = "turmas" | "equipes";

type ParticipationSectionProps = TiltProps & {
  rankingView: RankingView;
  onRankingViewChange: (view: RankingView) => void;
};

export function ParticipationSection({
  rankingView,
  onRankingViewChange,
  onTilt,
  onTiltEnd,
}: ParticipationSectionProps) {
  const currentRanking = rankingView === "turmas" ? classRanking : teamRanking;

  return (
    <section className="section participation-section" id="participacao">
      <div className="page-shell">
        <div className="participation-heading">
          <SectionTitle
            eyebrow="06 · DADOS ABERTOS"
            title="O placar da participação."
            description="O ranking celebra presença e colaboração — não apenas vitória."
          />
          <div className="live-badge" data-reveal><i /> DADOS DE DEMONSTRAÇÃO</div>
        </div>

        <div className="dashboard-grid">
          <div className="ranking-panel" data-reveal>
            <div className="panel-header">
              <div>
                <span>PARTICIPAÇÃO / SETEMBRO</span>
                <h3>Presença nos eventos</h3>
              </div>
              <div className="ranking-toggle" role="group" aria-label="Tipo de ranking">
                <button type="button" aria-pressed={rankingView === "turmas"} className={rankingView === "turmas" ? "is-active" : ""} onClick={() => onRankingViewChange("turmas")}>Turmas</button>
                <button type="button" aria-pressed={rankingView === "equipes"} className={rankingView === "equipes" ? "is-active" : ""} onClick={() => onRankingViewChange("equipes")}>Equipes</button>
              </div>
            </div>
            <div className="ranking-list">
              {currentRanking.map((item, index) => (
                <div className="ranking-row" key={item.label} data-reveal>
                  <span className="rank-position">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.label}</strong>
                  <div className="rank-track" role="progressbar" aria-label={`Participação de ${item.label}`} aria-valuenow={item.value} aria-valuemin={0} aria-valuemax={100}><i style={{ "--rank": `${item.value}%` } as CSSProperties} /></div>
                  <span className="rank-value">{item.value}%</span>
                  <small>↑ {item.trend}</small>
                </div>
              ))}
            </div>
          </div>

          <aside className="spotlight-card tilt-card" data-reveal onPointerMove={onTilt} onPointerLeave={onTiltEnd}>
            <div className="spotlight-top">
              <span>DESTAQUE DO MÊS</span>
              <i>★</i>
            </div>
            <div className="spotlight-avatar"><span>JM</span><i /></div>
            <h3>Júlia M.</h3>
            <p>2º A · Participou de <strong>7 eventos</strong></p>
            <div className="spotlight-stats">
              <div><strong>04</strong><span>modalidades</span></div>
              <div><strong>21h</strong><span>em ação</span></div>
            </div>
            <span className="spotlight-note">Participação registrada com autorização.</span>
          </aside>

          <div className="summary-strip" data-reveal>
            <div><strong>312</strong><span>participações registradas</span></div>
            <div><strong>14</strong><span>equipes ativas</span></div>
            <div><strong>08</strong><span>eventos realizados</span></div>
            <div><strong>+24%</strong><span>adesão este mês</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
