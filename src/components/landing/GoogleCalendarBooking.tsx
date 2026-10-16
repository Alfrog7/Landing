import { CalendarCheck } from 'lucide-preact';
import type { CalendarBooking } from '../../core/config/booking.config';

// Reservas conectadas a Google Calendar: las citas se agendan directo en el calendario de
// Melanie, con disponibilidad en tiempo real, sin dobles reservas e invitación por correo.
export function GoogleCalendarBooking({ booking }: { booking: NonNullable<CalendarBooking> }) {
  return (
    <app-google-calendar>
      <div class="gcal">
        {booking.mode === 'embed' ? (
          <iframe
            class="gcal__frame"
            src={booking.url}
            title="Agendar una cita con Melanie Silva"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        ) : (
          <div class="gcal__link">
            <CalendarCheck size={34} />
            <p>Elige el día y la hora que te convengan en el calendario de Melanie.</p>
            <a class="gcal__btn" href={booking.url} target="_blank" rel="noopener noreferrer">
              Reservar en Google Calendar
            </a>
          </div>
        )}
      </div>
    </app-google-calendar>
  );
}
