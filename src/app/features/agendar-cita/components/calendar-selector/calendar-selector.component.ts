import { Component, input, output, signal } from '@angular/core';

interface CalendarDay {
  date: string;
  dayNumber: number;
  monthLabel: string;
  isWeekend: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'app-calendar-selector',
  template: `
    <div class="calendar">
      <div class="calendar__nav">
        <button type="button" (click)="changeMonth(-1)" [disabled]="!canGoBack()" aria-label="Mes anterior">←</button>
        <strong>{{ monthLabel() }}</strong>
        <button type="button" (click)="changeMonth(1)" [disabled]="isNextMonthMax()" aria-label="Mes siguiente">→</button>
      </div>
      <div class="calendar__weekdays" aria-hidden="true">
        @for (weekday of weekdays; track weekday) {
          <span>{{ weekday }}</span>
        }
      </div>
      <div class="calendar__days">
        @for (day of days(); track day.date) {
          <button
            type="button"
            class="calendar__day"
            [class.calendar__day--empty]="day.date === ''"
            [class.calendar__day--weekend]="day.isWeekend"
            [class.calendar__day--active]="day.date === selectedDate()"
            [disabled]="day.isDisabled"
            [attr.aria-label]="day.date ? 'Seleccionar ' + day.monthLabel : null"
            (click)="select(day.date)"
          >
            {{ day.dayNumber && day.date !== '' ? day.dayNumber : '' }}
          </button>
        }
      </div>
      <p class="calendar__hint">Fines de semana y feriados no están disponibles.</p>
    </div>
  `,
  styles: [
    `
      .calendar {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        background: var(--color-surface);
        padding: 1.1rem;
      }
      .calendar__nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.7rem;
      }
      .calendar__nav strong {
        color: var(--color-heading);
      }
      .calendar__nav button {
        border: 1px solid var(--color-border-strong);
        background: var(--color-surface);
        border-radius: var(--radius-sm);
        width: 34px;
        height: 34px;
        cursor: pointer;
        font-size: 1rem;
      }
      .calendar__nav button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .calendar__weekdays,
      .calendar__days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
      }
      .calendar__weekdays span {
        text-align: center;
        font-size: 0.7rem;
        font-weight: 700;
        color: var(--color-muted);
        padding: 0.25rem 0;
      }
      .calendar__day {
        aspect-ratio: 1;
        border: 1px solid transparent;
        border-radius: var(--radius-sm);
        background: transparent;
        font-family: var(--font-body);
        font-size: 0.85rem;
        color: var(--color-heading);
        cursor: pointer;
      }
      .calendar__day:hover:not(:disabled) {
        background: var(--color-primary-light);
      }
      .calendar__day--empty {
        cursor: default;
      }
      .calendar__day:disabled {
        color: var(--color-border-strong);
        cursor: not-allowed;
      }
      .calendar__day--weekend {
        color: var(--color-muted);
      }
      .calendar__day--active {
        background: var(--color-primary);
        color: #fff;
        font-weight: 700;
      }
      .calendar__hint {
        font-size: 0.78rem;
        color: var(--color-muted);
        margin: 0.7rem 0 0;
      }
    `,
  ],
})
export class CalendarSelectorComponent {
  readonly selectedDate = input<string>('');
  readonly dateChange = output<string>();

  readonly weekdays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  readonly currentMonth = signal(new Date());
  readonly days = signal<CalendarDay[]>([]);
  readonly monthLabel = signal('');

  static readonly MAX_MONTHS_AHEAD = 3;

  constructor() {
    this.buildMonth();
  }

  canGoBack(): boolean {
    const today = new Date();
    return (
      this.currentMonth().getFullYear() > today.getFullYear() ||
      this.currentMonth().getMonth() > today.getMonth()
    );
  }

  isNextMonthMax(): boolean {
    const max = new Date();
    max.setMonth(max.getMonth() + CalendarSelectorComponent.MAX_MONTHS_AHEAD);
    return this.isSameMonth(this.currentMonth(), max);
  }

  changeMonth(delta: number): void {
    const next = new Date(this.currentMonth());
    next.setDate(1);
    next.setMonth(next.getMonth() + delta);
    // Nunca retroceder antes del mes actual.
    const today = new Date();
    if (delta < 0 && next.getFullYear() === today.getFullYear() && next.getMonth() < today.getMonth()) {
      return;
    }
    this.currentMonth.set(next);
    this.buildMonth();
  }

  select(date: string): void {
    this.dateChange.emit(date);
  }

  private buildMonth(): void {
    const base = new Date(this.currentMonth());
    const year = base.getFullYear();
    const month = base.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const feriados = ['01-01', '05-01', '07-28', '07-29', '08-06', '12-08', '12-25'];

    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // lunes=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: CalendarDay[] = [];

    for (let i = 0; i < firstWeekday; i++) {
      cells.push({ date: '', dayNumber: 0, monthLabel: '', isWeekend: false, isDisabled: true });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const weekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
      const mmdd = `${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const feriado = feriados.includes(mmdd);
      const past = dateObj.getTime() < today.getTime();
      cells.push({
        date: iso,
        dayNumber: day,
        monthLabel: `${day}/${month + 1}`,
        isWeekend: weekend,
        isDisabled: past || weekend || feriado,
      });
    }

    this.days.set(cells);
    this.monthLabel.set(
      base.toLocaleDateString('es-PE', { month: 'long', year: 'numeric' }).replace(/(^|\s)\S/g, (t) => t.toUpperCase())
    );
  }

  private isSameMonth(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
  }
}
