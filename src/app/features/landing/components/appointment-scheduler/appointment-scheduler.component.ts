import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideMessageCircle } from '@lucide/angular';
import { BRAND_CONFIG } from '../../../../core/config/brand.config';
import { WhatsAppService } from '../../../../core/services/whatsapp.service';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { MeipoIllustrationComponent } from '../meipo/meipo-illustration.component';

interface SchedulerDay {
  date: Date;
  weekday: string;
  dayNumber: number;
}

const TIME_SLOTS = ['09:30 AM', '11:00 AM', '03:30 PM', '04:45 PM', '05:30 PM'];

@Component({
  selector: 'app-appointment-scheduler',
  imports: [FormsModule, LucideMessageCircle, MeipoIllustrationComponent],
  template: `
    <section class="section scheduler" id="agendar">
      <div class="container">
        <div class="text-center scheduler__head">
          <span class="eyebrow">{{ tr.t('schedule.eyebrow') }}</span>
          <h2 class="section-title">{{ tr.t('schedule.title') }}</h2>
        </div>

        <div class="scheduler__panel">
          <aside class="scheduler__aside">
            <img
              [src]="brand.assets.advisorPhoto"
              [alt]="brand.ownerName"
              class="scheduler__avatar"
            />
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
              <div class="scheduler__days">
                @for (day of days(); track day.date.toISOString()) {
                  <button
                    type="button"
                    class="scheduler__day"
                    [class.scheduler__day--active]="selectedDay() === day"
                    (click)="selectDay(day)"
                  >
                    <span>{{ day.weekday }}</span>
                    <strong>{{ day.dayNumber }}</strong>
                  </button>
                }
              </div>
              <div class="scheduler__slots">
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

        <div class="scheduler__urgent">
          <div>
            <strong>{{ tr.t('schedule.urgentTitle') }}</strong>
            <p>{{ tr.t('schedule.urgentText') }}</p>
          </div>
          <a class="scheduler__urgent-btn" [href]="urgentUrl" target="_blank" rel="noopener noreferrer">
            <svg lucideMessageCircle [size]="18" />
            {{ tr.t('schedule.urgentBtn') }} ({{ brand.contact.phone }})
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .scheduler__head {
        max-width: 620px;
        margin: 0 auto 2.2rem;
      }
      .scheduler__panel {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 2rem;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-3xl);
        box-shadow: var(--shadow-md);
        padding: 2rem;
      }
      .scheduler__aside {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        border-right: 1px solid var(--color-border);
        padding-right: 2rem;
      }
      .scheduler__avatar {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        object-fit: cover;
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
      .scheduler__days {
        display: flex;
        gap: 0.5rem;
        overflow-x: auto;
        padding-bottom: 0.3rem;
        margin-bottom: 0.9rem;
      }
      .scheduler__day {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.15rem;
        min-width: 72px;
        padding: 0.6rem 0.4rem;
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        font-family: var(--font-body);
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .scheduler__day span {
        font-size: 0.74rem;
        font-weight: 600;
        color: var(--color-muted);
        text-transform: capitalize;
      }
      .scheduler__day strong {
        font-size: 1.05rem;
        color: var(--color-heading);
      }
      .scheduler__day--active {
        background: var(--color-primary-light);
        border-color: var(--color-primary);
      }
      .scheduler__day--active strong {
        color: var(--color-primary-dark);
      }
      .scheduler__slots {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .scheduler__slot {
        padding: 0.55rem 1rem;
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
      .scheduler__slot--active {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: #fff;
      }
      .scheduler__fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.8rem;
      }
      .scheduler__fields input,
      .scheduler__fields select {
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
        width: 100%;
        padding: 0.95rem 1.4rem;
        border: 0;
        border-radius: var(--radius-lg);
        background: var(--color-primary);
        color: #fff;
        font-family: var(--font-body);
        font-size: 0.98rem;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.25s ease;
      }
      .scheduler__confirm:hover:not(:disabled) {
        background: var(--color-primary-dark);
      }
      .scheduler__confirm:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .scheduler__urgent {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1.2rem;
        background: var(--color-primary-light);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-3xl);
        padding: 1.4rem 1.6rem;
        margin-top: 1.6rem;
      }
      .scheduler__urgent strong {
        color: var(--color-heading);
        font-size: 1rem;
      }
      .scheduler__urgent p {
        margin: 0.2rem 0 0;
        font-size: 0.88rem;
        color: var(--color-body);
      }
      .scheduler__urgent-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.8rem 1.3rem;
        background: var(--color-primary);
        color: #fff;
        border-radius: 999px;
        font-size: 0.88rem;
        font-weight: 700;
        white-space: nowrap;
        transition: background 0.25s ease;
      }
      .scheduler__urgent-btn:hover {
        background: var(--color-primary-dark);
      }
      @media (max-width: 900px) {
        .scheduler__panel {
          grid-template-columns: 1fr;
        }
        .scheduler__aside {
          border-right: 0;
          border-bottom: 1px solid var(--color-border);
          padding-right: 0;
          padding-bottom: 1.5rem;
        }
        .scheduler__fields {
          grid-template-columns: 1fr;
        }
        .scheduler__urgent {
          flex-direction: column;
          align-items: flex-start;
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

  readonly selectedDay = signal<SchedulerDay | null>(null);
  readonly selectedSlot = signal('');
  readonly fullName = signal('');
  readonly companyOrRuc = signal('');
  readonly whatsapp = signal('');
  readonly serviceTopic = signal('');

  readonly days = computed<SchedulerDay[]>(() => {
    const locale = this.tr.current.locale;
    const result: SchedulerDay[] = [];
    const cursor = new Date();
    cursor.setDate(cursor.getDate() + 1);
    while (result.length < 5) {
      const day = cursor.getDay();
      if (day !== 0 && day !== 6) {
        result.push({
          date: new Date(cursor),
          weekday: cursor.toLocaleDateString(locale, { weekday: 'short' }),
          dayNumber: cursor.getDate(),
        });
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    return result;
  });

  readonly canSubmit = computed(
    () =>
      this.selectedDay() !== null &&
      this.selectedSlot().length > 0 &&
      this.fullName().trim().length > 0 &&
      this.whatsapp().trim().length > 0
  );

  readonly urgentUrl: string;

  constructor(whatsapp: WhatsAppService) {
    this.selectedDay.set(this.days()[0]);
    this.serviceTopic.set(this.tr.list('schedule.topics')[0] ?? '');
    this.urgentUrl = whatsapp.buildUrgentCheckpointUrl();
  }

  selectDay(day: SchedulerDay): void {
    this.selectedDay.set(day);
  }
  selectSlot(slot: string): void {
    this.selectedSlot.set(slot);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.canSubmit()) {
      return;
    }
    const day = this.selectedDay()!;
    const dateLabel = day.date.toLocaleDateString(this.tr.current.locale, {
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
