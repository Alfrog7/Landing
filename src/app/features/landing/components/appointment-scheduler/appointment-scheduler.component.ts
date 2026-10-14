import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideBadgeCheck } from '@lucide/angular';
import { CalendarSelectorComponent } from '../../../agendar-cita/components/calendar-selector/calendar-selector.component';
import { BRAND_CONFIG } from '../../../../core/config/brand.config';
import { WhatsAppService } from '../../../../core/services/whatsapp.service';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { MeipoIllustrationComponent } from '../meipo/meipo-illustration.component';

const TIME_SLOTS = ['09:30 AM', '11:00 AM', '03:30 PM', '04:45 PM', '05:30 PM'];

@Component({
  selector: 'app-appointment-scheduler',
  imports: [FormsModule, LucideBadgeCheck, CalendarSelectorComponent, MeipoIllustrationComponent],
  template: `
    <section class="section scheduler" id="agendar">
      <span class="scheduler__orb scheduler__orb--emerald" aria-hidden="true"></span>
      <span class="scheduler__orb scheduler__orb--sky" aria-hidden="true"></span>
      <div class="container">
        <div class="text-center scheduler__head">
          <span class="eyebrow">{{ tr.t('schedule.eyebrow') }}</span>
          <h2 class="section-title">{{ tr.t('schedule.title') }}</h2>
        </div>

        <div class="scheduler__panel">
          <aside class="scheduler__aside">
            <div class="scheduler__photo-card">
              <img
                [src]="photoSrc()"
                (error)="onPhotoError()"
                [alt]="brand.ownerName"
                class="scheduler__avatar"
              />
              <span class="scheduler__sbs-badge">
                <svg lucideBadgeCheck [size]="14" />
                {{ brand.sbsChipShort }}
              </span>
            </div>
            <strong class="scheduler__owner">{{ brand.ownerName }}</strong>
            <span class="scheduler__license">{{ tr.t('why.role') }} · {{ brand.licenseId }}</span>

            <ul class="scheduler__tags">
              <li>{{ tr.t('schedule.tag1') }}</li>
              <li>{{ tr.t('schedule.tag2') }}</li>
              <li>{{ tr.t('schedule.tag3') }}</li>
            </ul>

            <div class="scheduler__tip">
              <app-meipo [size]="46" />
              <p>
                {{ tr.t('schedule.meipoTip') }}
              </p>
            </div>

            <p class="scheduler__privacy">
              {{ tr.t('schedule.privacy') }}
            </p>
          </aside>

          <form class="scheduler__form" (submit)="onSubmit($event)">
            <fieldset>
              <legend>{{ tr.t('schedule.step1') }}</legend>
              <div class="scheduler__step1">
                <app-calendar-selector
                  [selectedDate]="selectedDate()"
                  (dateChange)="selectedDate.set($event)"
                />
                <div class="scheduler__slots-column">
                  <p class="scheduler__slots-title">{{ tr.t('schedule.slotsTitle') }}</p>
                  <div class="scheduler__slots-grid">
                    @for (slot of timeSlots; track slot) {
                      <button
                        type="button"
                        class="scheduler__slot"
                        [class.scheduler__slot--active]="selectedSlot() === slot"
                        (click)="selectSlot(slot)"
                      >
                        {{ slot }}
                      </button>
                    }
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>{{ tr.t('schedule.step2') }}</legend>
              <div class="scheduler__fields">
                <input
                  type="text"
                  [placeholder]="tr.t('schedule.phName')"
                  autocomplete="name"
                  [ngModel]="fullName()"
                  (ngModelChange)="fullName.set($event)"
                  name="fullName"
                  required
                />
                <input
                  type="text"
                  [placeholder]="tr.t('schedule.phCompany')"
                  autocomplete="organization"
                  [ngModel]="companyOrRuc()"
                  (ngModelChange)="companyOrRuc.set($event)"
                  name="companyOrRuc"
                />
                <input
                  type="tel"
                  [placeholder]="tr.t('schedule.phWhats')"
                  autocomplete="tel"
                  [ngModel]="whatsapp()"
                  (ngModelChange)="whatsapp.set($event)"
                  name="whatsapp"
                  required
                />
                <select
                  [ngModel]="serviceTopic()"
                  (ngModelChange)="serviceTopic.set($event)"
                  name="serviceTopic"
                  required
                >
                  @for (topic of tr.list('schedule.topics'); track $index) {
                    <option [value]="topic">{{ topic }}</option>
                  }
                </select>
              </div>
            </fieldset>

            <button
              type="submit"
              class="scheduler__confirm"
              [disabled]="!canSubmit()"
            >
              {{ tr.t('schedule.confirm') }}
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      // Sección compactada (py-10/py-12): menos espacio muerto vertical
      .scheduler {
        position: relative;
        padding: clamp(2.5rem, 5vw, 3rem) 0;
      }
      // Orbes de gradiente ambiental detrás del panel del agendador
      .scheduler__orb {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
      }
      .scheduler__orb--emerald {
        width: min(480px, 60vw);
        height: 400px;
        left: -5%;
        top: 4%;
        background: rgba(16, 185, 129, 0.07);
        filter: blur(80px);
      }
      .scheduler__orb--sky {
        width: min(430px, 52vw);
        height: 360px;
        right: -6%;
        bottom: 6%;
        background: rgba(14, 165, 233, 0.05);
        filter: blur(90px);
      }
      .scheduler > .container {
        position: relative;
        z-index: 1;
      }
      .scheduler__head {
        max-width: 620px;
        margin: 0 auto 1.6rem;
      }
      .scheduler__panel {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 1.5rem;
        width: 100%;
        max-width: 100%;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-3xl);
        box-shadow: var(--shadow-md);
        // p-6 md:p-8
        padding: 1.5rem;
      }
      @media (min-width: 768px) {
        .scheduler__panel {
          padding: 2rem;
        }
      }
      // Los hijos de la grilla no deben impedir el encogimiento del track
      .scheduler__panel > .scheduler__aside,
      .scheduler__panel > .scheduler__form {
        min-width: 0;
      }
      .scheduler__aside {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        border-right: 1px solid var(--color-border);
        padding-right: 1.5rem;
      }
      .scheduler__photo-card {
        position: relative;
        margin-bottom: 0.4rem;
      }
      .scheduler__avatar {
        width: 100%;
        aspect-ratio: 4 / 3;
        border-radius: var(--radius-xl);
        object-fit: cover;
        // Sombra profunda suave (shadow-xl)
        box-shadow: var(--shadow-lg);
      }
      .scheduler__sbs-badge {
        position: absolute;
        bottom: 0.7rem;
        left: 0.7rem;
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(8px);
        border: 1px solid var(--color-border);
        border-radius: 999px;
        padding: 0.3rem 0.65rem;
        font-size: 0.68rem;
        font-weight: 700;
        color: var(--color-primary-dark);
        box-shadow: var(--shadow-md);
        white-space: nowrap;
      }
      .scheduler__sbs-badge svg {
        color: var(--color-primary);
        flex-shrink: 0;
      }
      .scheduler__owner {
        font-size: 1.05rem;
        font-weight: 800;
        color: var(--color-heading);
      }
      .scheduler__license {
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--color-primary-dark);
      }
      .scheduler__tags {
        list-style: none;
        margin: 0.8rem 0 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        font-size: 0.84rem;
        color: var(--color-body);
      }
      .scheduler__tags li::before {
        content: '✓';
        color: var(--color-primary);
        font-weight: 800;
        margin-right: 0.45rem;
      }
      .scheduler__tip {
        display: flex;
        gap: 0.7rem;
        align-items: center;
        background: var(--color-sky-light);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 0.8rem;
        margin-top: 1rem;
        min-width: 0;
      }
      .scheduler__tip app-meipo {
        flex: 0 0 auto;
      }
      .scheduler__tip p {
        margin: 0;
        font-size: 0.8rem;
        color: var(--color-heading);
      }
      .scheduler__privacy {
        margin: 0.6rem 0 0;
        font-size: 0.75rem;
        color: var(--color-muted);
      }
      fieldset {
        border: 0;
        padding: 0;
        margin: 0 0 1.4rem;
      }
      legend {
        font-size: 0.95rem;
        font-weight: 800;
        color: var(--color-heading);
        margin-bottom: 0.9rem;
      }
      // Paso 1: calendario y horarios en paralelo (apilados en móvil)
      .scheduler__step1 {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        align-items: start;
        margin-top: 0.75rem;
      }
      @media (min-width: 768px) {
        .scheduler__step1 {
          grid-template-columns: 1fr 1fr;
        }
      }
      app-calendar-selector {
        display: block;
      }
      .scheduler__slots-title {
        margin: 0 0 0.7rem;
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--color-muted);
      }
      .scheduler__slots-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.625rem;
      }
      .scheduler__slot {
        padding: 0.6rem 0.75rem;
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 999px;
        font-family: var(--font-body);
        font-size: 0.84rem;
        font-weight: 600;
        color: var(--color-heading);
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .scheduler__slot:hover:not(:disabled) {
        border-color: var(--color-border-strong);
      }
      // Horario seleccionado: esmeralda vibrante con texto blanco y negrita
      .scheduler__slot--active {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: #fff;
        font-weight: 800;
        box-shadow: 0 8px 18px -8px rgba(16, 185, 129, 0.55);
      }
      .scheduler__fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.8rem;
        min-width: 0;
      }
      .scheduler__fields input,
      .scheduler__fields select {
        width: 100%;
        min-width: 0;
        padding: 0.75rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        font-family: var(--font-body);
        font-size: 0.9rem;
        color: var(--color-heading);
        outline: none;
        background: var(--color-surface);
        transition: border-color 0.2s ease;
      }
      .scheduler__fields input:focus,
      .scheduler__fields select:focus {
        border-color: var(--color-primary);
      }
      .scheduler__confirm {
        display: block;
        width: 100%;
        max-width: 100%;
        margin-top: 0.3rem;
        box-sizing: border-box;
        padding: 0.95rem 1.4rem;
        border: 0;
        border-radius: var(--radius-lg);
        background: var(--color-primary);
        color: #fff;
        font-family: var(--font-body);
        font-size: 1rem;
        font-weight: 800;
        box-shadow: 0 12px 26px -12px rgba(16, 185, 129, 0.55);
        cursor: pointer;
        transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
      }
      .scheduler__confirm:hover:not(:disabled) {
        background: var(--color-primary-dark);
        transform: translateY(-1px);
        box-shadow: 0 14px 30px -12px rgba(5, 150, 105, 0.6);
      }
      .scheduler__confirm:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      @media (max-width: 900px) {
        .scheduler__panel {
          grid-template-columns: 1fr;
          gap: 1.25rem;
          padding: 1.25rem;
        }
        .scheduler__aside {
          border-right: 0;
          border-bottom: 1px solid var(--color-border);
          padding-right: 0;
          padding-bottom: 1.25rem;
        }
        .scheduler__tip {
          margin-top: 0.6rem;
        }
        fieldset {
          margin-bottom: 1.1rem;
        }
        legend {
          margin-bottom: 0.6rem;
        }
        .scheduler__fields {
          grid-template-columns: 1fr;
          gap: 0.6rem;
        }
      }
    `,
  ],
})
export class AppointmentSchedulerComponent {
  readonly brand = BRAND_CONFIG;
  readonly tr = inject(TranslationService);
  readonly timeSlots = TIME_SLOTS;
  private readonly whatsappApi = inject(WhatsAppService);

  // Fotografía real con fallback automático al placeholder mientras no exista el archivo
  readonly photoSrc = signal<string>(BRAND_CONFIG.assets.advisorPhotoReal);
  onPhotoError(): void {
    this.photoSrc.set(BRAND_CONFIG.assets.advisorPhoto);
  }

  readonly selectedDate = signal('');
  readonly selectedSlot = signal('');
  readonly fullName = signal('');
  readonly companyOrRuc = signal('');
  readonly whatsapp = signal('');
  readonly serviceTopic = signal('');

  readonly canSubmit = computed(
    () =>
      this.selectedDate().length > 0 &&
      this.selectedSlot().length > 0 &&
      this.fullName().trim().length > 0 &&
      this.whatsapp().trim().length > 0
  );

  constructor(whatsapp: WhatsAppService) {
    this.serviceTopic.set(this.tr.list('schedule.topics')[0] ?? '');
  }

  selectSlot(slot: string): void {
    this.selectedSlot.set(slot);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.canSubmit()) {
      return;
    }
    const [year, month, day] = this.selectedDate().split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dateLabel = dateObj.toLocaleDateString(this.tr.current.locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    const url = this.whatsappApi.buildAppointmentUrl({
      date: dateLabel,
      time: this.selectedSlot(),
      fullName: this.fullName(),
      companyOrRuc: this.companyOrRuc(),
      serviceTopic: this.serviceTopic(),
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
