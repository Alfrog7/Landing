import { useEffect, useState } from 'preact/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-preact';

interface CalendarDay {
  date: string;
  dayNumber: number;
  monthLabel: string;
  isWeekend: boolean;
  isDisabled: boolean;
}

const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const MAX_MONTHS_AHEAD = 3;
const FERIADOS = ['01-01', '05-01', '07-28', '07-29', '08-06', '12-08', '12-25'];

function buildMonth(base: Date): CalendarDay[] {
  const year = base.getFullYear();
  const month = base.getMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
    const feriado = FERIADOS.includes(mmdd);
    const past = dateObj.getTime() < today.getTime();
    cells.push({
      date: iso,
      dayNumber: day,
      monthLabel: `${day}/${month + 1}`,
      isWeekend: weekend,
      isDisabled: past || weekend || feriado,
    });
  }

  return cells;
}

function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

interface CalendarSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export function CalendarSelector({ selectedDate, onDateChange }: CalendarSelectorProps) {
  // La fecha actual solo se conoce en el navegador: el HTML prerenderizado muestra
  // el esqueleto del calendario y los días aparecen al montar.
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentMonth(new Date());
  }, []);

  const days = currentMonth ? buildMonth(currentMonth) : [];
  const monthLabel = currentMonth
    ? currentMonth
        .toLocaleDateString('es-PE', { month: 'long', year: 'numeric' })
        .replace(/^\S/, (t) => t.toUpperCase())
    : '';

  const canGoBack = (): boolean => {
    if (!currentMonth) {
      return false;
    }
    const today = new Date();
    return currentMonth.getFullYear() > today.getFullYear() || currentMonth.getMonth() > today.getMonth();
  };

  const isNextMonthMax = (): boolean => {
    if (!currentMonth) {
      return true;
    }
    const max = new Date();
    max.setMonth(max.getMonth() + MAX_MONTHS_AHEAD);
    return isSameMonth(currentMonth, max);
  };

  const changeMonth = (delta: number) => {
    if (!currentMonth) {
      return;
    }
    const next = new Date(currentMonth);
    next.setDate(1);
    next.setMonth(next.getMonth() + delta);
    // Nunca retroceder antes del mes actual.
    const today = new Date();
    if (delta < 0 && next.getFullYear() === today.getFullYear() && next.getMonth() < today.getMonth()) {
      return;
    }
    setCurrentMonth(next);
  };

  return (
    <app-calendar-selector>
      <div class="calendar">
        <div class="calendar__nav">
          <button type="button" onClick={() => changeMonth(-1)} disabled={!canGoBack()} aria-label="Mes anterior">
            <ChevronLeft size={18} />
          </button>
          <strong>{monthLabel}</strong>
          <button type="button" onClick={() => changeMonth(1)} disabled={isNextMonthMax()} aria-label="Mes siguiente">
            <ChevronRight size={18} />
          </button>
        </div>
        <div class="calendar__weekdays" aria-hidden="true">
          {WEEKDAYS.map((weekday, index) => (
            <span key={index}>{weekday}</span>
          ))}
        </div>
        <div class="calendar__days">
          {days.map((day, index) => (
            <button
              key={index}
              type="button"
              class={`calendar__day${day.date === '' ? ' calendar__day--empty' : ''}${day.isWeekend ? ' calendar__day--weekend' : ''}${day.date !== '' && day.date === selectedDate ? ' calendar__day--active' : ''}`}
              disabled={day.isDisabled}
              aria-label={day.date ? `Seleccionar ${day.monthLabel}` : undefined}
              onClick={() => onDateChange(day.date)}
            >
              {day.dayNumber && day.date !== '' ? day.dayNumber : ''}
            </button>
          ))}
        </div>
        <p class="calendar__hint">Fines de semana y feriados no están disponibles.</p>
      </div>
    </app-calendar-selector>
  );
}
