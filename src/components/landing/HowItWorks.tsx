import { useTranslation } from '../../core/i18n/i18n';

const STEPS = [1, 2, 3, 4] as const;

// Es una secuencia real, por eso va numerada: filas separadas por filetes, no cuatro tarjetas iguales
export function HowItWorks() {
  const tr = useTranslation();

  return (
    <app-how-it-works>
      <section class="section screen how" id="como-funciona">
        <div class="container how__layout">
          <h2 class="section-title how__title">{tr.t('how.title')}</h2>
          <ol class="how__steps">
            {STEPS.map((n) => (
              <li key={n} class="how__step">
                <span class="how__number">{n}</span>
                <h3>{tr.t(`how.s${n}Title`)}</h3>
                <p>{tr.t(`how.s${n}Text`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </app-how-it-works>
  );
}
