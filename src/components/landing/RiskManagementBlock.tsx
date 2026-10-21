import { useState, useRef } from 'preact/hooks';
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
  // Demo del mapa (TODO-BROKER-IMG): el hub "MEL" es arrastrable y al soltar
  // vuelve a su posicion central con la transicion CSS (efecto de rebote)
  const hubRef = useRef<HTMLSpanElement>(null);
  const [hubDragging, setHubDragging] = useState(false);
  const hubDrag = useRef({ active: false, startX: 0, startY: 0 });

  const setHubTransform = (dx: number, dy: number) => {
    if (hubRef.current) {
      hubRef.current.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    }
  };

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

          {/* "Todo parte de un mismo lugar: tu bróker" (feedback §6, issue #17):
              contenedor con DEMOSTRACIÓN provisional del mapa de conexiones.
              TODO-BROKER-IMG (issue #19): se reemplaza por la imagen oficial
              cuando Melanie la entregue */}
          <div class="risk__broker">
            <p class="risk__broker-title">{tr.t('broker.title')}</p>
            <p class="risk__broker-text">{tr.t('broker.text')}</p>
            <div class="risk__broker-map" role="img" aria-label={tr.t('broker.title')}>
              <svg
                class="risk__broker-lines"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line x1="50" y1="20" x2="12" y2="9" vector-effect="non-scaling-stroke" />
                <line x1="50" y1="20" x2="50" y2="4" vector-effect="non-scaling-stroke" />
                <line x1="50" y1="20" x2="88" y2="9" vector-effect="non-scaling-stroke" />
                <line x1="50" y1="20" x2="30" y2="34" vector-effect="non-scaling-stroke" />
                <line x1="50" y1="20" x2="70" y2="34" vector-effect="non-scaling-stroke" />
              </svg>
              <span
                ref={hubRef}
                class={`risk__broker-node risk__broker-node--hub${hubDragging ? ' risk__broker-node--hub--dragging' : ''}`}
                onPointerDown={(e) => {
                  e.preventDefault();
                  hubDrag.current = { active: true, startX: e.clientX, startY: e.clientY };
                  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                  setHubDragging(true);
                }}
                onPointerMove={(e) => {
                  const d = hubDrag.current;
                  if (!d.active) {
                    return;
                  }
                  setHubTransform(e.clientX - d.startX, e.clientY - d.startY);
                }}
                onPointerUp={() => {
                  hubDrag.current.active = false;
                  setHubDragging(false);
                  setHubTransform(0, 0);
                }}
                onPointerCancel={() => {
                  hubDrag.current.active = false;
                  setHubDragging(false);
                  setHubTransform(0, 0);
                }}
              >
                MEL
                <span>{tr.t('broker.hub')}</span>
              </span>
              {tr.list('broker.allies').map((ally, index) => (
                <span
                  key={ally}
                  class={`risk__broker-node risk__broker-node--ally risk__broker-node--${index + 1}`}
                >
                  {ally}
                </span>
              ))}
            </div>
            <span class="risk__broker-note">{tr.t('broker.note')}</span>
          </div>
        </div>
      </section>
    </app-risk-management-block>
  );
}
