import { TriangleAlert } from 'lucide-preact';
import { BRAND_CONFIG } from '../../core/config/brand.config';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { useTranslation } from '../../core/i18n/i18n';

const urgentUrl = WhatsAppService.buildUrgentCheckpointUrl();
const year = new Date().getFullYear();
const disabledLink = { disabled: '', 'aria-disabled': 'true' } as Record<string, string>;

export default function Footer() {
  const tr = useTranslation();
  const brand = BRAND_CONFIG;

  return (
    <app-footer>
      <footer class="footer" id="contacto">
        <div class="container footer__grid">
          <div class="footer__brand">
            {/* TODO-LOGO-MEL: wordmark tipografico mientras llega el logo oficial (issue #19) */}
            <span class="footer__logo" aria-hidden="true">MEL</span>
            <p class="footer__lema">“{brand.lema}”</p>
            <p class="footer__credential">
              <strong>
                {brand.brandName} · {tr.t('navbar.subtitle')}
              </strong>
              <br />
              {brand.ownerName} — {brand.licenseId}.<br />
              {tr.t('footer.credentialLine')}
            </p>
            <a class="footer__emergency" href={urgentUrl} target="_blank" rel="noopener noreferrer">
              <TriangleAlert size={16} />
              {tr.t('footer.emergency')}
            </a>
          </div>

          <div class="footer__col">
            <h3>{tr.t('footer.nav')}</h3>
            <a href="/#soluciones">{tr.t('navbar.linksSolutions')}</a>
            <a href="/#como-funciona">{tr.t('navbar.linksHow')}</a>
            <a href="/#aseguradoras">{tr.t('navbar.linksInsurers')}</a>
            <a href="/cotizador">{tr.t('footer.linkCotizador')}</a>
            <a href="/preguntas-frecuentes">{tr.t('footer.linkFaq')}</a>
            <a href="/portal-clientes">{tr.t('footer.linkPortal')}</a>
          </div>

          <div class="footer__col">
            <h3>{tr.t('footer.contactTitle')}</h3>
            <p class="footer__contact-item">
              <strong>{tr.t('footer.phoneLabel')}</strong> {brand.contact.phone}
            </p>
            <p class="footer__contact-item">
              <strong>{tr.t('footer.emailLabel')}</strong> {brand.contact.email}
            </p>
            <p class="footer__contact-item">
              <strong>{tr.t('footer.scheduleLabel')}</strong> {tr.t('footer.scheduleValue')}
            </p>
            <p class="footer__contact-item">
              <strong>{tr.t('footer.locationLabel')}</strong> {brand.contact.location}
            </p>
          </div>

          <div class="footer__col">
            <h3>{tr.t('footer.insurersTitle')}</h3>
            <div class="footer__insurers">
              {brand.insurers.map((insurer) => (
                <img key={insurer.id} src={insurer.logo} alt={insurer.name} class="footer__insurer-logo" />
              ))}
            </div>
            <div class="footer__legal">
              <a href="#" {...disabledLink} title={tr.t('footer.comingSoon')}>
                {tr.t('footer.sbsChannel')}
              </a>
              <a href="#" {...disabledLink} title={tr.t('footer.comingSoon')}>
                {tr.t('footer.privacy')}
              </a>
              <a href="#" {...disabledLink} title={tr.t('footer.comingSoon')}>
                {tr.t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <p>
            © {year} {brand.ownerName}. {tr.t('why.role')} — {brand.licenseId}. {tr.t('footer.rights')}
          </p>
        </div>
      </footer>
    </app-footer>
  );
}
