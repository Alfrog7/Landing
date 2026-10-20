import { useState } from 'preact/hooks';
import { CircleCheck, ChevronDown, ShieldAlert } from 'lucide-preact';
import { useTranslation } from '../../core/i18n/i18n';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import type { AudienceCategory } from '../../core/models/insurance-service.model';

// TODO-PLANES: los detalles de los planes (items por tarjeta) quedan pendientes de
// confirmacion de Melanie (issue #19); los precios S/ 270 y S/ 370 ya estan aprobados.
// Reservado (no publicar): "Seguridad y camaras" con empresas aliadas se sumara aqui
// como tercer bloque cuando Melanie lo apruebe.

// "Area de Riesgos Virtual" (feedback §5, issue #15): bloque destacado de la parte
// Empresas, visible solo con la pestana Empresas activa. CTA expande las tarjetas
// de planes Esencial/Integral y cierra con consulta por WhatsApp prellenada.
export function RiskManagementBlock({ activeTab }: { activeTab: AudienceCategory }) {
  const tr = useTranslation();
  const [open, setOpen] = useState(false);

  if (activeTab !== 'empresas') {
    return null;
  }

  const planNames = tr.list('risk.planes');
  const planes = [
    { key: 'esencial', name: planNames[0] ?? '', price: tr.t('risk.esencialPrice'), note: '', features: tr.list('risk.esencialFeatures') },
    { key: 'integral', name: planNames[1] ?? '', price: tr.t('risk.integralPrice'), note: tr.t('risk.integralNote'), features: tr.list('risk.integralFeatures') },
  ];

  return (
    <app-risk-management-block>
      <section class="section screen risk" id="area-riesgos">
        <div class="container">
          <div class="risk__card">
            <span class="risk__badge">
              <ShieldAlert size={15} />
              {tr.t('risk.badge')}
            </span>
            <h2 class="section-title">{tr.t('risk.title')}</h2>
            <p class="risk__text">{tr.t('risk.text')}</p>
            <button
              type="button"
              class="risk__toggle"
              aria-expanded={open}
              aria-controls="risk-planes"
              onClick={() => setOpen(!open)}
            >
              {open ? tr.t('risk.close') : tr.t('risk.cta')}
              <ChevronDown size={16} class={open ? 'risk__chevron risk__chevron--up' : 'risk__chevron'} />
            </button>
            {open && (
              <div class="risk__plans" id="risk-planes">
                {planes.map((plan) => (
                  <article class="risk__plan" key={plan.key}>
                    <h3>{plan.name}</h3>
                    <p class="risk__price">
                      {plan.price}
                      <span> {tr.t('risk.perMonth')}</span>
                    </p>
                    {plan.note && <p class="risk__note">{plan.note}</p>}
                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>
                          <CircleCheck size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            )}
            <a
              class="risk__whatsapp"
              href={WhatsAppService.buildGenericUrl('quiero saber más sobre el *Área de Riesgos Virtual*.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tr.t('risk.whatsapp')}
            </a>
          </div>
        </div>
      </section>
    </app-risk-management-block>
  );
}
