// Página de reservas de Google Calendar ("Appointment schedule").
// Se configura con PUBLIC_GOOGLE_CALENDAR_URL (ver .env.example). Si está vacía, el sitio usa el
// agendador propio y confirma por WhatsApp.
const raw = (import.meta.env.PUBLIC_GOOGLE_CALENDAR_URL ?? '').trim();

export type CalendarBooking = { mode: 'embed' | 'link'; url: string } | null;

function resolve(): CalendarBooking {
  if (!raw) {
    return null;
  }
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:') {
      return null;
    }
    // Solo la URL de "incrustar" de Google Calendar se puede mostrar dentro de la página.
    if (url.hostname === 'calendar.google.com') {
      url.searchParams.set('gv', 'true');
      return { mode: 'embed', url: url.toString() };
    }
    // Enlaces cortos (calendar.app.google/…) no admiten iframe: se abren en una pestaña nueva.
    if (url.hostname === 'calendar.app.google') {
      return { mode: 'link', url: url.toString() };
    }
  } catch {
    // URL inválida: se ignora y se usa el agendador propio.
  }
  return null;
}

export const GOOGLE_CALENDAR_BOOKING: CalendarBooking = resolve();
