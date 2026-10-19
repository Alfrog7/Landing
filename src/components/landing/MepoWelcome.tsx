import { useTranslation } from '../../core/i18n/i18n';
import { WhatsAppService } from '../../core/services/whatsapp.service';

// Bienvenida de Mepo (feedback §3): los 3 letreros de madera funcionan como botones.
// La imagen entregada incluye suricatos prohibidos por el feedback (derechos de terceros,
// ver issue #19): se recorta el tercio izquierdo con CSS para mostrarlos nunca.
const askUrl = WhatsAppService.buildGenericUrl(
  'quiero saber en qu\u00e9 me puedes servir, Melanie.'
);

export function MepoWelcome() {
  const tr = useTranslation();

  return (
    <app-mepo-welcome>
      <section class="welcome" aria-label={tr.t('mepo.sign1')}>
        <div class="container welcome__grid">
          <figure class="welcome__media">
            <img
              src="/assets/images/mepo/mepo-bienvenida.jpeg"
              alt={tr.t('mepo.salute')}
              class="welcome__photo"
              width={1408}
              height={768}
              loading="eager"
            />
          </figure>

          <div class="welcome__panel">
            <p class="welcome__salute">{tr.t('mepo.salute')}</p>
            <nav class="welcome__signs" aria-label={tr.t('mepo.sign1')}>
              <a class="welcome__sign welcome__sign--green" href="/" aria-label={`${tr.t('mepo.sign1')} — ${tr.t('navbar.subtitle')}`}>
                <span class="welcome__sign-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>
                </span>
                <b>{tr.t('mepo.sign1')}</b>
              </a>
              <a class="welcome__sign welcome__sign--orange" href="/#soluciones" aria-label={`${tr.t('mepo.sign2')} — ${tr.t('carousel.eyebrow')}`}>
                <span class="welcome__sign-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V6" /><path d="M6 12l6-6 6 6" /></svg>
                </span>
                <b>{tr.t('mepo.sign2')}</b>
              </a>
              <a class="welcome__sign welcome__sign--blue" href={askUrl} target="_blank" rel="noopener noreferrer" aria-label={`${tr.t('mepo.sign3')} — WhatsApp`}>
                <span class="welcome__sign-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.6 2.2c-.8.4-1.1 1-1.1 1.8" /><circle cx="12" cy="16.6" r="0.6" fill="#fff" stroke="none" /></svg>
                </span>
                <b>{tr.t('mepo.sign3')}</b>
              </a>
            </nav>
          </div>
        </div>
      </section>
    </app-mepo-welcome>
  );
}
