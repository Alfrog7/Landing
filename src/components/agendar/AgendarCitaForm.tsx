import { useState } from 'preact/hooks';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';
import { CalendarSelector } from '../landing/CalendarSelector';
import { GoogleCalendarBooking } from '../landing/GoogleCalendarBooking';
import { GOOGLE_CALENDAR_BOOKING } from '../../core/config/booking.config';
import { BookingService } from '../../core/services/booking.service';
import type { BookingRequest } from '../../core/models/booking.model';

export default function AgendarCitaForm() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [booking, setBooking] = useState<BookingRequest | null>(null);

  const [dateError, setDateError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyRuc, setCompanyRuc] = useState('');
  const [notes, setNotes] = useState('');

  const slots = selectedDate ? BookingService.getAvailableTimeSlots(selectedDate) : [];
  const selectedDateLabel = selectedDate
    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString('es-PE', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : '';

  const onDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot('');
    setDateError(null);
  };

  const selectSlot = (time: string) => {
    setSelectedSlot(time);
    setDateError(null);
  };

  const digits = (event: Event, max: number): string => {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, max);
    input.value = value;
    return value;
  };

  const confirm = (event: Event) => {
    event.preventDefault();

    if (!selectedDate || !selectedSlot) {
      setDateError('Selecciona una fecha y un horario disponible.');
      return;
    }

    let valid = true;
    setNameError(null);
    setEmailError(null);
    setPhoneError(null);

    if (!fullName.trim()) {
      setNameError('Ingresa tu nombre completo.');
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(corporateEmail)) {
      setEmailError('Ingresa un correo corporativo válido.');
      valid = false;
    }
    if (!/^9\d{8}$/.test(phone)) {
      setPhoneError('Ingresa un celular válido de 9 dígitos (empieza en 9).');
      valid = false;
    }
    if (!valid) {
      return;
    }

    const request: BookingRequest = {
      date: selectedDate,
      timeSlot: selectedSlot,
      fullName,
      corporateEmail,
      phone,
      companyRuc: companyRuc || undefined,
      notes: notes || undefined,
    };

    BookingService.confirmBooking(request);
    setBooking(request);
    setSubmitted(true);
  };

  if (GOOGLE_CALENDAR_BOOKING) {
    return (
      <div class="booking-embed">
        <GoogleCalendarBooking booking={GOOGLE_CALENDAR_BOOKING} />
      </div>
    );
  }

  if (submitted) {
    return (
      <div class="booking-confirmation">
        <Badge variant="whatsapp">✓ Cita confirmada</Badge>
        <h2>Tu videollamada quedó reservada</h2>
        <p>
          {booking?.fullName}, te esperamos el <strong>{booking?.date}</strong> a las <strong>{booking?.timeSlot}</strong>.
          Enviamos el enlace de la reunión (Google Meet / Microsoft Teams) a {booking?.corporateEmail}.
        </p>
        <ul class="booking-confirmation__list">
          <li>
            <strong>Celular:</strong> {booking?.phone}
          </li>
          {booking?.companyRuc && (
            <li>
              <strong>RUC:</strong> {booking.companyRuc}
            </li>
          )}
          {booking?.notes && (
            <li>
              <strong>Necesidad:</strong> {booking.notes}
            </li>
          )}
        </ul>
        <div class="booking-confirmation__actions">
          <Button variant="primary" href="/cotizador">
            Ir al cotizador
          </Button>
          <Button variant="outline" href="/">
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form class="booking-main" onSubmit={confirm} noValidate>
      {/* Selector de fecha + horario */}
      <div class="booking-timing">
        <CalendarSelector selectedDate={selectedDate} onDateChange={onDateChange} />
        {selectedDate && (
          <div class="timeslots">
            <h3>Horarios disponibles para {selectedDateLabel}</h3>
            <div class="timeslots__grid">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  class={`slot${selectedSlot === slot.time ? ' slot--active' : ''}`}
                  disabled={!slot.isAvailable}
                  onClick={() => selectSlot(slot.time)}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        )}
        {dateError && (
          <p class="booking-error" role="alert">
            {dateError}
          </p>
        )}
      </div>

      {/* Formulario de registro */}
      <div class="booking-fields">
        <h3>Sus datos de contacto</h3>
        <app-booking-form>
          <FormField label="Nombre completo" inputId="fullName" error={nameError}>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Ej. Jorge Luis Ramírez"
              value={fullName}
              onInput={(e) => setFullName(e.currentTarget.value)}
            />
          </FormField>
          <FormField label="Correo corporativo" inputId="corporateEmail" error={emailError}>
            <input
              id="corporateEmail"
              name="corporateEmail"
              type="email"
              placeholder="jefe@empresa.com"
              value={corporateEmail}
              onInput={(e) => setCorporateEmail(e.currentTarget.value)}
            />
          </FormField>
          <FormField label="Celular (9 dígitos)" inputId="phone" error={phoneError}>
            <input
              id="phone"
              name="phone"
              inputMode="numeric"
              maxLength={9}
              placeholder="987654321"
              value={phone}
              onInput={(e) => setPhone(digits(e, 9))}
            />
          </FormField>
          <FormField label="RUC de tu empresa (opcional)" inputId="companyRuc">
            <input
              id="companyRuc"
              name="companyRuc"
              inputMode="numeric"
              maxLength={11}
              placeholder="20123456789"
              value={companyRuc}
              onInput={(e) => setCompanyRuc(digits(e, 11))}
            />
          </FormField>
          <FormField label="¿Cuál es la necesidad principal de tu empresa?" inputId="notes">
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Ej.: emitir SCTR para 15 operarios que ingresan el lunes a obra."
              value={notes}
              onInput={(e) => setNotes(e.currentTarget.value)}
            ></textarea>
          </FormField>
        </app-booking-form>
        <Button variant="primary" type="submit" block>
          Confirmar cita
        </Button>
      </div>
    </form>
  );
}
