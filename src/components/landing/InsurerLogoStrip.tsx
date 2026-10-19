import { useTranslation } from '../../core/i18n/i18n';

export interface StripInsurer {
  id: string;
  name: string;
  logo: string;
}

// Franja de aseguradoras (reemplaza a la Matriz Multiaseguradora).
// Logos oficiales disponibles + wordmarks provisionales (TODO-LOGOS: issue #19).
const STRIP_INSURERS: StripInsurer[] = [
  { id: 'mapfre', name: 'Mapfre', logo: '/assets/images/insurers/mapfre.svg' },
  { id: 'pacifico', name: 'Pacífico Seguros', logo: '/assets/images/insurers/pacifico.svg' },
  { id: 'rimac', name: 'Rímac Seguros', logo: '/assets/images/insurers/rimac.svg' },
  { id: 'positiva', name: 'La Positiva', logo: '/assets/images/insurers/positiva.svg' },
  { id: 'chubb', name: 'Chubb', logo: '/assets/images/insurers/chubb.svg' },
  { id: 'crecer', name: 'Crecer', logo: '/assets/images/insurers/crecer.svg' },
  { id: 'protecta', name: 'Protecta Security', logo: '/assets/images/insurers/protecta.svg' },
  { id: 'secrex', name: 'Secrex Cesce', logo: '/assets/images/insurers/secrex.svg' },
  { id: 'insur', name: 'InSur', logo: '/assets/images/insurers/insur.svg' },
  { id: 'avla', name: 'Avla', logo: '/assets/images/insurers/avla.svg' },
  { id: 'augustar', name: 'AuguStar', logo: '/assets/images/insurers/augustar.svg' },
  { id: 'sanitas', name: 'Sanitas', logo: '/assets/images/insurers/sanitas.svg' },
  { id: 'qualitas', name: 'Quálitas', logo: '/assets/images/insurers/qualitas.svg' },
];

export function InsurerLogoStrip() {
  const tr = useTranslation();

  return (
    <app-insurer-strip>
      <section class="insurer-strip" id="aseguradoras" aria-label={tr.t('strip.title')}>
        <div class="container">
          <p class="insurer-strip__title">{tr.t('strip.title')}</p>
          <ul class="insurer-strip__list">
            {STRIP_INSURERS.map((insurer) => (
              <li key={insurer.id} class="insurer-strip__item">
                <img
                  src={insurer.logo}
                  alt={insurer.name}
                  title={insurer.name}
                  class="insurer-strip__logo"
                  loading="lazy"
                  width={140}
                  height={40}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </app-insurer-strip>
  );
}
