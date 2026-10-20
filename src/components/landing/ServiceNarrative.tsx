import { GraduationCap, HeartHandshake, PiggyBank } from 'lucide-preact';
import type { FunctionalComponent, JSX } from 'preact';
import { useTranslation } from '../../core/i18n/i18n';

// Icono por caso de Vida, indexado igual que las listas i18n casosNames/casosPhrases (issue #13)
const CASE_ICONS: FunctionalComponent<{ size?: number }>[] = [HeartHandshake, GraduationCap, PiggyBank];

interface ServiceNarrativeProps {
  variant: 'pasos' | 'casos';
}

// Narrativas de marca dentro de la ficha (feedback §6, issue #13):
// 'pasos' = linea de 7 pasos de la carta fianza (solo ficha de fianzas);
// 'casos' = "Tres formas de proteger lo que mas quieres" (solo ficha de Vida).
export function ServiceNarrative({ variant }: ServiceNarrativeProps): JSX.Element | null {
  const tr = useTranslation();

  if (variant === 'pasos') {
    const pasos = tr.list('narratives.pasos');
    if (!pasos.length) {
      return null;
    }
    return (
      <section class="detail__block detail__pasos" aria-label={tr.t('narratives.pasosTitle')}>
        <h3>{tr.t('narratives.pasosTitle')}</h3>
        <ol class="detail__pasos-list">
          {pasos.map((paso, index) => (
            <li key={paso}>
              <span class="detail__pasos-index" aria-hidden="true">
                {index + 1}
              </span>
              {paso}
            </li>
          ))}
        </ol>
        <p class="detail__pasos-close">{tr.t('narratives.pasosClose')}</p>
      </section>
    );
  }

  const names = tr.list('narratives.casosNames');
  const phrases = tr.list('narratives.casosPhrases');
  if (!names.length) {
    return null;
  }
  return (
    <section class="detail__block detail__casos" aria-label={tr.t('narratives.casosTitle')}>
      <h3>{tr.t('narratives.casosTitle')}</h3>
      <div class="detail__casos-grid">
        {names.map((name, index) => {
          const Icon = CASE_ICONS[index] ?? PiggyBank;
          return (
            <article class="detail__casos-card" key={name}>
              <span class="detail__casos-icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <h4>{name}</h4>
              <p>{phrases[index]}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
