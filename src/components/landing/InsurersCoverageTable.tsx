import { ShieldCheck } from 'lucide-preact';
import type { CoverageAvailability } from '../../core/models/insurance-service.model';
import { useTranslation, type Translator } from '../../core/i18n/i18n';
import { INSURERS_MATRIX_DATA } from '../../core/data/landing.data';
import { BRAND_CONFIG } from '../../core/config/brand.config';

interface MatrixInsurer {
  name: string;
  logo?: string;
  abbr?: string;
  pillBg?: string;
  pillFg?: string;
}

// Logotipos vectoriales de aliadas + pastillas de marca cuidadas para AVLA y Chubb
const INSURERS: MatrixInsurer[] = [
  ...(BRAND_CONFIG.insurers.map((i) => ({ name: i.name, logo: i.logo })) as MatrixInsurer[]),
  { name: 'AVLA / Insur', abbr: 'AVLA', pillBg: '#0b132b', pillFg: '#ffffff' },
  { name: 'Chubb', abbr: 'CHUBB', pillBg: '#eaf4ff', pillFg: '#084783' },
];

function Cell({ value, tr }: { value: CoverageAvailability; tr: Translator }) {
  if (value === true) {
    return <ShieldCheck class="matrix__check" size={20} aria-label={tr.t('matrix.available')} />;
  }
  if (value === 'consultar') {
    return <span class="matrix__consult">{tr.t('matrix.consult')}</span>;
  }
  return (
    <span class="matrix__dash" aria-label={tr.t('matrix.notAvailable')}>
      —
    </span>
  );
}

export function InsurersCoverageTable() {
  const tr = useTranslation();

  return (
    <app-insurers-coverage-table>
      <section class="section matrix" id="aseguradoras">
        <div class="container">
          <div class="text-center matrix__head">
            <span class="eyebrow">{tr.t('matrix.eyebrow')}</span>
            <h2 class="section-title">{tr.t('matrix.title')}</h2>
            <p class="matrix__subtitle">{tr.t('matrix.subtitle')}</p>
            <span class="matrix__neutral">
              <ShieldCheck size={15} />
              {tr.t('matrix.neutral')}
            </span>
          </div>

          <div class="matrix__card">
            <div class="matrix__scroll" role="region" aria-label={tr.t('matrix.tableAria')} tabIndex={0}>
              <table class="matrix__table">
                <thead>
                  <tr>
                    <th scope="col" class="matrix__service-col">
                      {tr.t('matrix.colService')}
                    </th>
                    {INSURERS.map((insurer) => (
                      <th key={insurer.name} scope="col" title={insurer.name}>
                        {insurer.logo ? (
                          <img class="matrix__insurer-logo" src={insurer.logo} alt={insurer.name} loading="lazy" />
                        ) : (
                          <span class="matrix__brand-pill" style={{ background: insurer.pillBg, color: insurer.pillFg }}>
                            {insurer.abbr}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {INSURERS_MATRIX_DATA.map((row) => (
                    <tr key={row.serviceName}>
                      <th scope="row">{tr.t(row.serviceName)}</th>
                      <td>
                        <Cell value={row.rimac} tr={tr} />
                      </td>
                      <td>
                        <Cell value={row.pacifico} tr={tr} />
                      </td>
                      <td>
                        <Cell value={row.mapfre} tr={tr} />
                      </td>
                      <td>
                        <Cell value={row.positiva} tr={tr} />
                      </td>
                      <td>
                        <Cell value={row.insurAvla} tr={tr} />
                      </td>
                      <td>
                        <Cell value={row.chubb} tr={tr} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </app-insurers-coverage-table>
  );
}
