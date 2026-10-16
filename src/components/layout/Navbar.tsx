import { useEffect, useRef, useState } from 'preact/hooks';
import { Calendar, ChevronDown, Globe, Menu, ShieldCheck, X } from 'lucide-preact';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { BRAND_CONFIG } from '../../core/config/brand.config';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { useTranslation } from '../../core/i18n/i18n';

const whatsappUrl = WhatsAppService.buildGenericUrl(
  'quisiera conversar con asesoría personalizada sobre mi seguro.'
);

const NAV_LINKS = [
  { fragment: 'soluciones', labelKey: 'navbar.linksSolutions' },
  { fragment: 'sobre-melanie', labelKey: 'navbar.linksWhy' },
  { fragment: 'aseguradoras', labelKey: 'navbar.linksInsurers' },
  { fragment: 'faq', labelKey: 'navbar.linksFaq' },
] as const;

export default function Navbar() {
  const tr = useTranslation();
  const brand = BRAND_CONFIG;
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [pressed, setPressed] = useState<string | null>(null);

  // Píldora deslizante de la sección marcada
  const [pill, setPill] = useState({ left: 0, width: 0, show: false });
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const pressedRef = useRef<string | null>(null);
  const pressTimer = useRef<number | null>(null);
  const pillTimer = useRef<number | null>(null);

  const updatePill = () => {
    const key = pressedRef.current;
    const link = key ? linkRefs.current[key] : null;
    if (!link || !link.offsetWidth) {
      setPill((p) => ({ ...p, show: false }));
      return;
    }
    setPill({ left: link.offsetLeft, width: link.offsetWidth, show: true });
  };

  const updatePillRef = useRef(updatePill);
  updatePillRef.current = updatePill;

  useEffect(() => {
    const onResize = () => updatePillRef.current();
    const onDocClick = () => setLangOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
      if (pressTimer.current !== null) window.clearTimeout(pressTimer.current);
      if (pillTimer.current !== null) window.clearTimeout(pillTimer.current);
    };
  }, []);

  useEffect(() => {
    pillTimer.current = window.setTimeout(() => updatePillRef.current(), 60);
    return () => {
      if (pillTimer.current !== null) window.clearTimeout(pillTimer.current);
    };
  }, [tr.lang]);

  const press = (id: string) => {
    pressedRef.current = id;
    setPressed(id);
    if (pressTimer.current !== null) {
      window.clearTimeout(pressTimer.current);
    }
    pressTimer.current = window.setTimeout(() => {
      pressedRef.current = null;
      setPressed(null);
    }, 650);
    requestAnimationFrame(() => updatePillRef.current());
  };

  // Logo: regreso suave al inicio + saludo de Meipo
  const goHome = (event: MouseEvent) => {
    press('brand');
    window.dispatchEvent(new Event('meipo-wave'));
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
              <span class="navbar__lang-code">{language.shortCode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <app-top-navbar>
      <header class="navbar-wrap">
        <div class="navbar">
          <div
            class={`navbar__pill${pill.show ? ' navbar__pill--show' : ''}`}
            style={{ left: `${pill.left}px`, width: `${pill.width}px` }}
          />

          <a
            href="/"
            class={`navbar__brand${pressed === 'brand' ? ' navbar__brand--press' : ''}`}
            aria-label="Inicio"
            onClick={goHome}
          >
            <img
              src={brand.assets.logoLight}
              alt={`${brand.brandName} · ${brand.brandSubtitle}`}
              class="navbar__brand-logo"
            />
          </a>

          <span class="navbar__sbs-chip" title="Corredora de Seguros Colegiada ante la SBS del Perú">
            <ShieldCheck size={13} />
            {brand.sbsChipShort}
          </span>

          <nav class="navbar__links" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.fragment}
                ref={(el) => {
                  linkRefs.current[link.fragment] = el;
                }}
                href={`/#${link.fragment}`}
                onClick={() => press(link.fragment)}
                class={pressed === link.fragment ? 'navbar__link--press' : undefined}
              >
                {tr.t(link.labelKey)}
              </a>
            ))}
          </nav>

          <div class="navbar__actions">
            <a href="/#agendar" class="navbar__cta">
              <Calendar size={14} />
              {tr.t('navbar.schedule')}
            </a>

            {langSelector(false)}
          </div>

          <button
            type="button"
            class="navbar__burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? tr.t('navbar.closeMenu') : tr.t('navbar.openMenu')}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
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
              <WhatsAppIcon size={17} />
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
