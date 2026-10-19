import { useEffect, useState } from 'preact/hooks';
import { Calendar, Check, ChevronDown, Globe, Menu, X } from 'lucide-preact';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { BRAND_CONFIG } from '../../core/config/brand.config';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { useTranslation } from '../../core/i18n/i18n';

const whatsappUrl = WhatsAppService.buildGenericUrl(
  'quisiera conversar con asesoría personalizada sobre mi seguro.'
);

const NAV_LINKS = [
  { fragment: 'soluciones', labelKey: 'navbar.linksSolutions' },
  { fragment: 'como-funciona', labelKey: 'navbar.linksHow' },
  { fragment: 'aseguradoras', labelKey: 'navbar.linksInsurers' },
  { fragment: 'sobre-melanie', labelKey: 'navbar.linksWhy' },
  { fragment: 'faq', labelKey: 'navbar.linksFaq' },
] as const;

export default function Navbar() {
  const tr = useTranslation();
  const brand = BRAND_CONFIG;
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onDocClick = () => setLangOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // Logo: regreso suave al inicio + saludo de Mepo
  const goHome = (event: MouseEvent) => {
    window.dispatchEvent(new Event('mepo-wave'));
    if (window.location.pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const selectLang = (code: 'es' | 'en' | 'fr' | 'it') => {
    tr.setLang(code);
    setLangOpen(false);
  };

  const langSelector = (mobile: boolean) => (
    <div class={`navbar__lang${mobile ? ' navbar__lang--mobile' : ''}`} onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        class="navbar__lang-btn"
        onClick={() => setLangOpen((open) => !open)}
        aria-expanded={langOpen}
        aria-haspopup="listbox"
        aria-label={tr.t('navbar.ariaLang')}
      >
        <Globe size={15} />
        <span>{tr.current.shortCode}</span>
        <ChevronDown class={`navbar__lang-caret${langOpen ? ' navbar__lang-caret--open' : ''}`} size={12} />
      </button>

      {langOpen && (
        <div class="navbar__lang-menu" role="listbox" aria-label={mobile ? undefined : tr.t('navbar.ariaLang')}>
          {tr.languages.map((language) => (
            <button
              key={language.code}
              type="button"
              class={`navbar__lang-item${language.code === tr.lang ? ' navbar__lang-item--active' : ''}`}
              onClick={() => selectLang(language.code)}
            >
              <span>{language.name}</span>
              <span class="navbar__lang-code">
                {language.code === tr.lang && <Check size={14} class="navbar__lang-check" />}
                {language.shortCode}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <app-top-navbar>
      <header class="navbar-wrap">
        <div class="navbar container">
          <a href="/" class="navbar__brand" aria-label="Inicio" onClick={goHome}>
            <img
              src={brand.assets.logoLight}
              alt={`${brand.brandName} · ${brand.brandSubtitle}`}
              class="navbar__brand-logo"
            />
          </a>

          <nav class="navbar__links" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <a key={link.fragment} href={`/#${link.fragment}`}>
                {tr.t(link.labelKey)}
              </a>
            ))}
          </nav>

          <div class="navbar__actions">
            {langSelector(false)}
            <a href="/#agendar" class="navbar__cta">
              <Calendar size={15} />
              {tr.t('navbar.schedule')}
            </a>
          </div>

          <button
            type="button"
            class="navbar__burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? tr.t('navbar.closeMenu') : tr.t('navbar.openMenu')}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav class="navbar__mobile" aria-label="Menú móvil">
            {NAV_LINKS.map((link) => (
              <a key={link.fragment} href={`/#${link.fragment}`} onClick={() => setMenuOpen(false)}>
                {tr.t(link.labelKey)}
              </a>
            ))}

            <a class="navbar__mobile-wa" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} />
              {tr.t('navbar.waMobile')} {brand.contact.phone}
            </a>

            {langSelector(true)}

            <a href="/#agendar" class="navbar__mobile-cta" onClick={() => setMenuOpen(false)}>
              {tr.t('navbar.schedule')}
            </a>
          </nav>
        )}
      </header>
    </app-top-navbar>
  );
}
