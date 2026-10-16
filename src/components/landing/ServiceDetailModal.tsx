import { useEffect, useRef } from 'preact/hooks';
import { CircleCheck, FileText, X } from 'lucide-preact';
import { useTranslation } from '../../core/i18n/i18n';
import type { ServiceDetail } from '../../core/models/insurance-service.model';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { Meipo } from './Meipo';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

interface ServiceDetailModalProps {
  service: ServiceDetail;
  onClose: () => void;
}

// Diálogo modal: capa a pantalla completa que cierra al hacer clic fuera o con Escape,
// enfoca el botón de cierre al abrir, atrapa el foco y lo devuelve al origen al cerrar.
export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const tr = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !containerRef.current) {
        return;
      }
      const items = Array.from(containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) {
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !containerRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !containerRef.current.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, []);

  const key = `services.${service.id}`;
  const coberturas = tr.list(`${key}.coberturas`);
  const requisitos = tr.list(`${key}.requisitos`);
  const entidades = tr.tOptional(`${key}.entidades`);

  const quote = () => {
    const url = WhatsAppService.buildServiceUrl(tr.t(`${key}.title`), tr.t(`${key}.tag`));
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div class="dialog-overlay">
      <div class="dialog-overlay__backdrop" onClick={onClose}></div>
      <div class="dialog-overlay__pane">
        <div class="dialog-overlay__container" role="dialog" ref={containerRef} tabIndex={-1}>
          <app-service-detail-modal>
            <div class="detail">
              <button type="button" class="detail__close" onClick={onClose} aria-label={tr.t('modal.close')} ref={closeRef}>
                <X size={18} />
              </button>

              <aside class="detail__visual">
                <img src={service.image} alt={tr.t(`${key}.title`)} class="detail__photo" />
                <div class="detail__visual-top">
                  <span class="detail__tag">{tr.t(`${key}.tag`)}</span>
                  <span class="detail__time">{tr.t(`${key}.badge`)}</span>
                </div>
                <div class="detail__tip">
                  <Meipo size={52} />
                  <p>{tr.t(`${key}.tip`)}</p>
                </div>
              </aside>

              <div class="detail__content">
                <h2 class="detail__title">{tr.t(`${key}.title`)}</h2>
                {entidades && <p class="detail__regulatory">{entidades}</p>}

                <section class="detail__block">
                  <h3>{tr.t('modal.coberturas')}</h3>
                  <ul>
                    {coberturas.map((item) => (
                      <li key={item}>
                        <CircleCheck size={18} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section class="detail__block">
                  <h3>{tr.t('modal.requisitos')}</h3>
                  <ul>
                    {requisitos.map((item) => (
                      <li key={item}>
                        <FileText size={18} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p class="detail__emission">
                    <strong>{tr.t('modal.emissionLabel')}</strong> {tr.t(`${key}.emision`)}
                  </p>
                </section>

                <section class="detail__block">
                  <h3>{tr.t('modal.aliadas')}</h3>
                  <div class="detail__insurers">
                    {service.insurers.map((insurer) => (
                      <span key={insurer} class="detail__pill">
                        {insurer}
                      </span>
                    ))}
                  </div>
                </section>

                <button type="button" class="detail__cta" onClick={quote}>
                  {tr.t('modal.ctaPrefix') + tr.t(`${key}.title`) + tr.t('modal.ctaSuffix')}
                </button>
              </div>
            </div>
          </app-service-detail-modal>
        </div>
      </div>
    </div>
  );
}
