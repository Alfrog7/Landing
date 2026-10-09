import { Component, computed, inject, signal } from '@angular/core';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CalendarSelectorComponent } from './components/calendar-selector/calendar-selector.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { BookingService } from '../../core/services/booking.service';
import { BRAND_CONFIG } from '../../core/config/brand.config';
import { BookingRequest } from '../../core/models/booking.model';

@Component({
  selector: 'app-agendar-cita',
  imports: [BadgeComponent, ButtonComponent, CalendarSelectorComponent, BookingFormComponent],
  template: `
    <header class="booking-hero">
      <div class="container">
        <span class="eyebrow eyebrow--light">Asesoría ejecutiva</span>
        <h1>Agendar Cita: 15 minutos con la corredora</h1>
        <p>Videollamada de diagnóstico (Google Meet / Microsoft Teams). Sin costo y sin compromiso.</p>
      </div>
    </header>

    <section class="section">
      <div class="container booking-grid">
        <!-- Ficha de la sesión -->
        <aside class="booking-summary">
          <div class="session-card">
            <span class="session-card__icon" aria-hidden="true">📹</span>
            <h2>Asesoría Ejecutiva de 15 Minutos</h2>
            <ul>
              <li>Modalidad: videollamada (Google Meet / Teams)</li>
              <li>Duración: 15 minutos, en punto</li>
              <li>Horario: Lunes a Viernes, 8:30 AM - 6:30 PM</li>
              <li>Recomendación: ten a mano tu planilla y RUC</li>
            </ul>
            <div class="session-card__badges">
              <app-badge variant="whatsapp">Asesoría gratuita</app-badge>
              <app-badge variant="primary">Respuesta el mismo día</app-badge>
            </div>
          </div>
        </aside>

        @if (!submitted()) {
          <form class="booking-main" (submit)="confirm($event)" novalidate>
            <!-- Selector de fecha + horario -->
            <div class="booking-timing">
              <app-calendar-selector [selectedDate]="selectedDate()" (dateChange)="onDateChange($event)" />
              @if (selectedDate()) {
                <div class="timeslots">
                  <h3>Horarios disponibles para {{ selectedDateLabel() }}</h3>
                  <div class="timeslots__grid">
                    @for (slot of slots(); track slot.id) {
                      <button
                        type="button"
                        class="slot"
                        [class.slot--active]="selectedSlot() === slot.time"
                        [disabled]="!slot.isAvailable"
                        (click)="selectSlot(slot.time)"
                      >
                        {{ slot.time }}
                      </button>
                    }
                  </div>
                </div>
              }
              @if (dateError(); as error) {
                <p class="booking-error" role="alert">{{ error }}</p>
              }
            </div>

            <!-- Formulario de registro -->
            <div class="booking-fields">
              <h3>Sus datos de contacto</h3>
              <app-booking-form
                [(fullName)]="fullName"
                [(corporateEmail)]="corporateEmail"
                [(phone)]="phone"
                [(companyRuc)]="companyRuc"
                [(notes)]="notes"
                [nameError]="nameError()"
                [emailError]="emailError()"
                [phoneError]="phoneError()"
              />
              <app-button variant="primary" type="submit" [block]="true">
                Confirmar cita
              </app-button>
            </div>
          </form>
        } @else {
          <div class="booking-confirmation">
            <app-badge variant="whatsapp">✓ Cita confirmada</app-badge>
            <h2>Tu videollamada quedó reservada</h2>
            <p>
              {{ booking()?.fullName }}, te esperamos el
              <strong>{{ booking()?.date }}</strong> a las <strong>{{ booking()?.timeSlot }}</strong>.
              Enviamos el enlace de la reunión (Google Meet / Microsoft Teams) a
              {{ booking()?.corporateEmail }}.
            </p>
            <ul class="booking-confirmation__list">
              <li><strong>Celular:</strong> {{ booking()?.phone }}</li>
              @if (booking()?.companyRuc) {
                <li><strong>RUC:</strong> {{ booking()?.companyRuc }}</li>
              }
              @if (booking()?.notes) {
                <li><strong>Necesidad:</strong> {{ booking()?.notes }}</li>
              }
            </ul>
            <div class="booking-confirmation__actions">
              <app-button variant="primary" href="/cotizador">Ir al cotizador</app-button>
              <app-button variant="outline" href="/">Volver al inicio</app-button>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .booking-hero {
        background: var(--color-primary);
        color: #fff;
        padding: clamp(2.5rem, 6vw, 3.8rem) 0;
      }
      .eyebrow--light {
        color: #a8c4f5;
      }
      .booking-hero h1 {
        color: #fff;
        font-size: clamp(1.8rem, 4vw, 2.6rem);
        margin-bottom: 0.4rem;
      }
      .booking-hero p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0;
      }
      .booking-grid {
        display: grid;
        grid-template-columns: 0.8fr 1.2fr;
        gap: 2rem;
        align-items: start;
      }
      .session-card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        padding: 1.6rem;
        position: sticky;
        top: 96px;
      }
      .session-card__icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 0.7rem;
      }
      .session-card h2 {
        font-size: 1.25rem;
        margin-bottom: 0.8rem;
      }
      .session-card ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.5rem;
        font-size: 0.9rem;
        margin-bottom: 1.1rem;
      }
      .session-card ul li::before {
        content: '›';
        color: var(--color-primary);
        font-weight: 800;
        margin-right: 0.45rem;
      }
      .session-card__badges {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .booking-main {
        display: grid;
        grid-template-columns: 0.9fr 1.1fr;
        gap: 1.6rem;
        align-items: start;
      }
      .booking-timing,
      .booking-fields {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        padding: 1.4rem;
        display: grid;
        gap: 1rem;
      }
      .booking-fields h3 {
        margin: 0;
        font-size: 1.1rem;
      }
      .timeslots h3 {
        font-size: 0.95rem;
        margin: 0 0 0.6rem;
      }
      .timeslots__grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
      }
      .slot {
        border: 1px solid var(--color-border-strong);
        background: var(--color-surface);
        border-radius: var(--radius-sm);
        padding: 0.45rem 0.3rem;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--color-heading);
        cursor: pointer;
      }
      .slot:hover:not(:disabled) {
        border-color: var(--color-primary);
        color: var(--color-primary);
      }
      .slot--active {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: #fff;
      }
      .slot:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        text-decoration: line-through;
      }
      .booking-error {
        margin: 0;
        color: #dc2626;
        font-size: 0.85rem;
        font-weight: 600;
      }
      .booking-confirmation {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
        padding: 2rem;
      }
      .booking-confirmation h2 {
        margin: 0.8rem 0 0.5rem;
      }
      .booking-confirmation__list {
        list-style: none;
        padding: 0;
        margin: 1.2rem 0 1.5rem;
        display: grid;
        gap: 0.4rem;
        font-size: 0.92rem;
      }
      .booking-confirmation__actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      @media (max-width: 960px) {
        .booking-grid {
          grid-template-columns: 1fr;
        }
        .session-card {
          position: static;
        }
        .booking-main {
          grid-template-columns: 1fr;
        }
      }
      @media (max-width: 560px) {
        .timeslots__grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `,
  ],
})
export class AgendarCitaComponent {
  readonly brand = BRAND_CONFIG;

  readonly selectedDate = signal('');
  readonly selectedSlot = signal('');
  readonly submitted = signal(false);
  readonly booking = signal<BookingRequest | null>(null);

  readonly dateError = signal<string | null>(null);
  readonly nameError = signal<string | null>(null);
  readonly emailError = signal<string | null>(null);
  readonly phoneError = signal<string | null>(null);

  readonly fullName = signal('');
  readonly corporateEmail = signal('');
  readonly phone = signal('');
  readonly companyRuc = signal('');
  readonly notes = signal('');

  readonly slots = computed(() => {
    const date = this.selectedDate();
    return date ? this.bookingService.getAvailableTimeSlots(date) : [];
  });

  readonly selectedDateLabel = computed(() => {
    const date = this.selectedDate();
    if (!date) {
      return '';
    }
    return new Date(`${date}T00:00:00`).toLocaleDateString('es-PE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  });

  private readonly bookingService = inject(BookingService);

  onDateChange(date: string): void {
    this.selectedDate.set(date);
    this.selectedSlot.set('');
    this.dateError.set(null);
  }

  selectSlot(time: string): void {
    this.selectedSlot.set(time);
    this.dateError.set(null);
  }

  confirm(event: Event): void {
    event.preventDefault();

    if (!this.selectedDate() || !this.selectedSlot()) {
      this.dateError.set('Selecciona una fecha y un horario disponible.');
      return;
    }

    let valid = true;
    this.nameError.set(null);
    this.emailError.set(null);
    this.phoneError.set(null);

    if (!this.fullName().trim()) {
      this.nameError.set('Ingresa tu nombre completo.');
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.corporateEmail())) {
      this.emailError.set('Ingresa un correo corporativo válido.');
      valid = false;
    }
    if (!/^9\d{8}$/.test(this.phone())) {
      this.phoneError.set('Ingresa un celular válido de 9 dígitos (empieza en 9).');
      valid = false;
    }
    if (!valid) {
      return;
    }

    const request: BookingRequest = {
      date: this.selectedDate(),
      timeSlot: this.selectedSlot(),
      fullName: this.fullName(),
      corporateEmail: this.corporateEmail(),
      phone: this.phone(),
      companyRuc: this.companyRuc() || undefined,
      notes: this.notes() || undefined,
    };

    this.bookingService.confirmBooking(request);
    this.booking.set(request);
    this.submitted.set(true);
  }
}
