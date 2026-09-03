// SEÇÃO AGENDA: controla o calendário, a troca de mês e a seleção dos próximos eventos.
import { upcomingEvents } from "../site-data";
import type { CalendarEvent } from "../site-data";
import { SectionTitle } from "./shared";

type EventsSectionProps = {
  selectedEvent: CalendarEvent;
  calendarMonth: CalendarEvent["month"];
  onSelectedEventChange: (event: CalendarEvent) => void;
  onCalendarMonthChange: (month: CalendarEvent["month"]) => void;
};

export function EventsSection({
  selectedEvent,
  calendarMonth,
  onSelectedEventChange,
  onCalendarMonthChange,
}: EventsSectionProps) {
  const calendarInfo = calendarMonth === "SET"
    ? { label: "Setembro", code: "09", leading: 2, days: 30 }
    : { label: "Outubro", code: "10", leading: 4, days: 31 };

  const calendarCells = Array.from({ length: 35 }, (_, index) => {
    const day = index - calendarInfo.leading + 1;
    return day > 0 && day <= calendarInfo.days ? day : null;
  });

  const changeCalendarMonth = (month: CalendarEvent["month"]) => {
    onCalendarMonthChange(month);
    const firstEvent = upcomingEvents.find((event) => event.month === month);
    if (firstEvent) onSelectedEventChange(firstEvent);
  };

  const selectListedEvent = (event: CalendarEvent) => {
    onSelectedEventChange(event);
    onCalendarMonthChange(event.month);
  };

  return (
    <section className="section page-shell events-section" id="eventos">
      <SectionTitle
        eyebrow="04 · AGENDA EM MOVIMENTO"
        title="Marque na agenda. Encontre sua próxima experiência."
        description="Calendário centralizado para ninguém ficar de fora dos encontros, campeonatos e gincanas."
      />
      <div className="calendar-layout">
        <div className="calendar-panel" data-reveal>
          <div className="calendar-header">
            <div>
              <span>CALENDÁRIO / {calendarInfo.code}.2026</span>
              <h3>{calendarInfo.label} <strong>2026</strong></h3>
            </div>
            <div className="calendar-controls" aria-label="Mês exibido">
              <button type="button" aria-label="Ver setembro" disabled={calendarMonth === "SET"} onClick={() => changeCalendarMonth("SET")}>←</button>
              <button type="button" aria-label="Ver outubro" disabled={calendarMonth === "OUT"} onClick={() => changeCalendarMonth("OUT")}>→</button>
            </div>
          </div>
          <div className="weekdays" aria-hidden="true">
            {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"].map((day) => <span key={day}>{day}</span>)}
          </div>
          <div className="calendar-grid">
            {calendarCells.map((day, index) => {
              if (!day) return <span className="empty-day" key={`empty-${index}`} />;
              const event = upcomingEvents.find((item) => item.month === calendarMonth && item.day === day);
              if (!event) return <span className="calendar-day" key={day}>{day}</span>;
              return (
                <button
                  type="button"
                  className={`calendar-day has-event ${selectedEvent.month === calendarMonth && selectedEvent.day === day ? "is-selected" : ""} event-${event.accent}`}
                  key={day}
                  onClick={() => onSelectedEventChange(event)}
                  aria-label={`${day} de ${calendarInfo.label.toLowerCase()}: ${event.title}`}
                >
                  {day}<i />
                </button>
              );
            })}
          </div>
          <div className="selected-event" aria-live="polite">
            <div className={`date-block event-${selectedEvent.accent}`}>
              <strong>{selectedEvent.day}</strong>
              <span>{selectedEvent.month}</span>
            </div>
            <div>
              <span>{selectedEvent.category}</span>
              <h4>{selectedEvent.title}</h4>
              <p>{selectedEvent.place} · {selectedEvent.time}</p>
            </div>
            <span className="event-arrow" aria-hidden="true">↗</span>
          </div>
        </div>

        <div className="event-list" data-reveal>
          <div className="event-list-header">
            <span>PRÓXIMOS EVENTOS</span>
            <span>{String(upcomingEvents.length).padStart(2, "0")} NO RADAR</span>
          </div>
          {upcomingEvents.map((event, index) => (
            <button className="event-row" type="button" key={`${event.month}-${event.day}`} onClick={() => selectListedEvent(event)}>
              <span className="event-count">0{index + 1}</span>
              <span className={`event-date event-${event.accent}`}><strong>{event.day}</strong>{event.month}</span>
              <span className="event-info">
                <small>{event.category}</small>
                <strong>{event.title}</strong>
                <em>{event.place} · {event.time}</em>
              </span>
              <i>↗</i>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
