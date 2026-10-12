import { Component, DestroyRef, ElementRef, HostListener, effect, inject, signal, untracked, viewChildren } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideMenu, LucideMessageCircle, LucideX, LucideGlobe, LucideChevronDown } from '@lucide/angular';
import { BRAND_CONFIG } from '../../../core/config/brand.config';
import { WhatsAppService } from '../../../core/services/whatsapp.service';
import { TranslationService } from '../../../core/i18n/translation.service';

@Component({
  selector: 'app-top-navbar',
  imports: [RouterLink, LucideMenu, LucideMessageCircle, LucideX, LucideGlobe, LucideChevronDown],
  template: `
    <header class="navbar-wrap">
      <div class="navbar">
        <div
          class="navbar__pill"
          [class.navbar__pill--show]="pillShow()"
          [style.left.px]="pillLeft()"
          [style.width.px]="pillWidth()"
        ></div>

        <a
          routerLink="/"
          class="navbar__brand"
          aria-label="Inicio"
          (click)="goHome($event)"
          [class.navbar__brand--press]="pressed() === 'brand'"
        >
          <img [src]="brand.assets.logoLight" [alt]="brand.brandName + ' · ' + brand.brandSubtitle" class="navbar__brand-logo" />
        </a>

        <nav class="navbar__links" aria-label="Navegación principal">
          <a
            #navLink
            routerLink="/"
            fragment="soluciones"
            (click)="press('soluciones')"
            [class.navbar__link--press]="pressed() === 'soluciones'"
          >
            {{ tr.t('navbar.linksSolutions') }}
          </a>
          <a
            #navLink
            routerLink="/"
            fragment="sobre-melanie"
            (click)="press('sobre-melanie')"
            [class.navbar__link--press]="pressed() === 'sobre-melanie'"
          >
            {{ tr.t('navbar.linksWhy') }}
          </a>
          <a
            #navLink
            routerLink="/"
            fragment="aseguradoras"
            (click)="press('aseguradoras')"
            [class.navbar__link--press]="pressed() === 'aseguradoras'"
          >
            {{ tr.t('navbar.linksInsurers') }}
          </a>
          <a
            #navLink
            routerLink="/"
            fragment="faq"
            (click)="press('faq')"
            [class.navbar__link--press]="pressed() === 'faq'"
          >
            {{ tr.t('navbar.linksFaq') }}
          </a>
        </nav>

        <div class="navbar__actions">
          <a routerLink="/" fragment="agendar" class="navbar__link-quiet">
            {{ tr.t('navbar.schedule') }}
          </a>

          <div class="navbar__lang" (click)="$event.stopPropagation()">
            <button
              type="button"
              class="navbar__lang-btn"
              (click)="toggleLangMenu()"
              [attr.aria-expanded]="langOpen()"
              aria-haspopup="listbox"
              [attr.aria-label]="tr.t('navbar.ariaLang')"
            >
              <svg lucideGlobe [size]="15" />
              <span>{{ tr.current.shortCode }}</span>
              <svg class="navbar__lang-caret" [class.navbar__lang-caret--open]="langOpen()" lucideChevronDown [size]="12" />
            </button>

            @if (langOpen()) {
              <div
                class="navbar__lang-menu"
                role="listbox"
                [attr.aria-label]="tr.t('navbar.ariaLang')"
              >
                @for (language of tr.languages; track language.code) {
                  <button
                    type="button"
                    class="navbar__lang-item"
                    [class.navbar__lang-item--active]="language.code === tr.lang()"
                    (click)="selectLang(language.code)"
                  >
                    <span>{{ language.name }}</span>
                    <span class="navbar__lang-code">{{ language.shortCode }}</span>
                  </button>
                }
              </div>
            }
          </div>
        </div>

        <button
          type="button"
          class="navbar__burger"
          (click)="toggleMenu()"
          [attr.aria-expanded]="menuOpen()"
          [attr.aria-label]="menuOpen() ? tr.t('navbar.closeMenu') : tr.t('navbar.openMenu')"
        >
          @if (menuOpen()) {
            <svg lucideX [size]="20" />
          } @else {
            <svg lucideMenu [size]="20" />
          }
        </button>
      </div>

      @if (menuOpen()) {
        <nav class="navbar__mobile" aria-label="Menú móvil">
          <a routerLink="/" fragment="soluciones" (click)="menuOpen.set(false)">{{ tr.t('navbar.linksSolutions') }}</a>
          <a routerLink="/" fragment="sobre-melanie" (click)="menuOpen.set(false)">{{ tr.t('navbar.linksWhy') }}</a>
          <a routerLink="/" fragment="aseguradoras" (click)="menuOpen.set(false)">{{ tr.t('navbar.linksInsurers') }}</a>
          <a routerLink="/" fragment="faq" (click)="menuOpen.set(false)">{{ tr.t('navbar.linksFaq') }}</a>

          <a class="navbar__mobile-wa" [href]="whatsappUrl" target="_blank" rel="noopener noreferrer">
            <svg lucideMessageCircle [size]="17" />
            {{ tr.t('navbar.waMobile') }} {{ brand.contact.phone }}
          </a>

          <div class="navbar__lang navbar__lang--mobile" (click)="$event.stopPropagation()">
            <button
              type="button"
              class="navbar__lang-btn"
              (click)="toggleLangMenu()"
              [attr.aria-expanded]="langOpen()"
              aria-haspopup="listbox"
              [attr.aria-label]="tr.t('navbar.ariaLang')"
            >
              <svg lucideGlobe [size]="15" />
              <span>{{ tr.current.shortCode }}</span>
              <svg class="navbar__lang-caret" [class.navbar__lang-caret--open]="langOpen()" lucideChevronDown [size]="12" />
            </button>

            @if (langOpen()) {
              <div class="navbar__lang-menu" role="listbox">
                @for (language of tr.languages; track language.code) {
                  <button
                    type="button"
                    class="navbar__lang-item"
                    [class.navbar__lang-item--active]="language.code === tr.lang()"
                    (click)="selectLang(language.code)"
                  >
                    <span>{{ language.name }}</span>
                    <span class="navbar__lang-code">{{ language.shortCode }}</span>
                  </button>
                }
              </div>
            }
          </div>

          <a routerLink="/" fragment="agendar" class="navbar__mobile-cta" (click)="menuOpen.set(false)">
            {{ tr.t('navbar.schedule') }}
          </a>
        </nav>
      }
    </header>
  `,
  styles: [
    `
      .navbar-wrap {
        position: fixed;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        width: 92%;
        max-width: 80rem;
        z-index: 50;
      }
      .navbar {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        background: color-mix(in srgb, white 90%, transparent);
        backdrop-filter: blur(12px);
        border: 1px solid color-mix(in srgb, var(--color-border) 80%, transparent);
        box-shadow: var(--shadow-floating-nav);
        border-radius: 999px;
        padding: 0.75rem 1.5rem;
      }

      // Píldora deslizante de la sección marcada (equivalente a layoutId)
      .navbar__pill {
        position: absolute;
        top: 0.55rem;
        bottom: 0.55rem;
        left: 0;
        width: 0;
        border-radius: 999px;
        background: var(--color-primary-light);
        opacity: 0;
        pointer-events: none;
        transition: left 0.32s cubic-bezier(0.35, 0.8, 0.3, 1), width 0.32s cubic-bezier(0.35, 0.8, 0.3, 1),
          opacity 0.22s ease, transform 0.22s ease;
        transform: scaleY(0.92);
        z-index: 0;
      }
      .navbar__pill--show {
        opacity: 1;
        transform: scaleY(1);
      }

      .navbar__brand {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        text-decoration: none;
      }
      .navbar__brand-logo {
        height: 2.4rem;
        width: auto;
        transition: transform 0.18s ease;
      }
      .navbar__brand--press .navbar__brand-logo {
        animation: navbar-press 0.55s ease;
      }
      .navbar__links {
        display: flex;
        gap: 1.5rem;
        margin-inline: auto;
      }
      .navbar__links a {
        position: relative;
        z-index: 1;
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--color-body);
        text-decoration: none;
        padding: 0.2rem 0;
      }
      .navbar__links a::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -0.1rem;
        height: 2px;
        width: 100%;
        border-radius: 999px;
        background: var(--color-primary);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.25s ease;
      }
      .navbar__links a:hover {
        color: var(--color-primary-dark);
      }
      .navbar__links a:hover::after,
      .navbar__links a.navbar__link--press::after {
        transform: scaleX(1);
      }
      .navbar__links a.navbar__link--press {
        color: var(--color-primary-dark);
        animation: navbar-press 0.55s ease;
      }
      .navbar__actions {
        display: flex;
        align-items: center;
        gap: 0.9rem;
      }
      .navbar__link-quiet {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-body);
        white-space: nowrap;
      }
      .navbar__link-quiet:hover {
        color: var(--color-primary-dark);
      }

      // Selector de idioma
      .navbar__lang {
        position: relative;
      }
      .navbar__lang-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.4rem 0.7rem;
        border-radius: 999px;
        border: 1px solid var(--color-border);
        background: rgba(255, 255, 255, 0.85);
        font-family: var(--font-body);
        font-size: 0.74rem;
        font-weight: 700;
        color: var(--color-heading);
        cursor: pointer;
        transition: border-color 0.2s ease, background 0.2s ease;
      }
      .navbar__lang-btn:hover {
        background: #fff;
        border-color: var(--color-border-strong);
      }
      .navbar__lang-btn svg {
        color: var(--color-primary-dark);
      }
      .navbar__lang-caret {
        color: var(--color-muted) !important;
        transition: transform 0.2s ease;
      }
      .navbar__lang-caret--open {
        transform: rotate(180deg);
      }
      .navbar__lang-menu {
        position: absolute;
        right: 0;
        top: calc(100% + 0.5rem);
        z-index: 60;
        min-width: 11rem;
        background: color-mix(in srgb, white 95%, transparent);
        backdrop-filter: blur(10px);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-modal-split);
        padding: 0.4rem;
        animation: lang-menu-in 0.16s ease;
        transform-origin: top right;
      }
      .navbar__lang-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        width: 100%;
        padding: 0.55rem 0.7rem;
        border: 0;
        border-radius: var(--radius-sm);
        background: transparent;
        font-family: var(--font-body);
        font-size: 0.8rem;
        color: var(--color-body);
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .navbar__lang-item:hover {
        background: var(--color-bg);
      }
      .navbar__lang-item--active {
        font-weight: 800;
        color: var(--color-primary-dark);
      }
      .navbar__lang-item--active::after {
        content: '✓';
        font-weight: 800;
        color: var(--color-primary);
      }
      .navbar__lang-code {
        font-size: 0.68rem;
        font-weight: 700;
        color: var(--color-muted);
      }
      .navbar__lang--mobile {
        align-self: flex-start;
      }
      .navbar__lang--mobile .navbar__lang-menu {
        right: auto;
        left: 0;
        top: calc(100% + 0.4rem);
      }

      @keyframes lang-menu-in {
        from {
          opacity: 0;
          transform: scale(0.94) translateY(-4px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      @keyframes navbar-press {
        0% {
          transform: scale(1);
        }
        35% {
          transform: scale(0.88) translateY(1px);
        }
        100% {
          transform: scale(1);
        }
      }

      .navbar__burger {
        display: none;
        background: none;
        border: 1px solid var(--color-border);
        border-radius: 999px;
        padding: 0.45rem 0.65rem;
        cursor: pointer;
        color: var(--color-heading);
      }
      .navbar__mobile {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        padding: 0.85rem 1.25rem 1.1rem;
        margin-top: 0.5rem;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-3xl);
        box-shadow: var(--shadow-modal-split);
        animation: mobile-menu-in 0.28s cubic-bezier(0.35, 0.8, 0.3, 1);
        transform-origin: top center;
      }
      @keyframes mobile-menu-in {
        from {
          opacity: 0;
          transform: translateY(-12px) scaleY(0.96);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      .navbar__mobile a {
        padding: 0.7rem 0.6rem;
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--color-heading);
        border-radius: var(--radius-sm);
      }
      .navbar__mobile a:hover {
        background: var(--color-primary-light);
      }
      .navbar__mobile-cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: 0.45rem;
        padding: 0.8rem 1rem;
        background: var(--color-primary);
        color: #fff !important;
        border-radius: 999px;
        font-size: 0.95rem;
        font-weight: 800;
        text-align: center;
        box-shadow: var(--shadow-sm);
        transition: background 0.25s ease;
      }
      .navbar__mobile-cta:hover {
        background: var(--color-primary-dark);
      }
      .navbar__mobile-wa {
        color: var(--color-primary-dark) !important;
      }
      @media (max-width: 1024px) {
        .navbar {
          padding: 0.6rem 1rem;
        }
        .navbar__links,
        .navbar__link-quiet {
          display: none;
        }
        .navbar__brand-logo {
          height: 2rem;
        }
        .navbar__burger {
          display: block;
          margin-left: auto;
        }
      }
    `,
  ],
})
export class TopNavbarComponent {
  readonly brand = BRAND_CONFIG;
  readonly tr = inject(TranslationService);
  readonly menuOpen = signal(false);
  readonly langOpen = signal(false);
  readonly pressed = signal<string | null>(null);

  // Píldora deslizante de la sección marcada
  readonly navLink = viewChildren<ElementRef<HTMLAnchorElement>>('navLink');
  readonly pillLeft = signal(0);
  readonly pillWidth = signal(0);
  readonly pillShow = signal(false);

  readonly whatsappUrl: string;
  private pressTimer: number | null = null;
  private pillTimer: number | null = null;

  constructor(
    whatsapp: WhatsAppService,
    private readonly router: Router
  ) {
    this.whatsappUrl = whatsapp.buildGenericUrl(
      'quisiera conversar con asesoría personalizada sobre mi seguro.'
    );
    window.addEventListener('resize', this.onResize);
    inject(DestroyRef).onDestroy(() => {
      window.removeEventListener('resize', this.onResize);
      if (this.pressTimer !== null) {
        window.clearTimeout(this.pressTimer);
      }
      if (this.pillTimer !== null) {
        window.clearTimeout(this.pillTimer);
      }
    });

    effect(() => {
      this.tr.lang();
      untracked(() => this.pillTimer = window.setTimeout(() => this.updatePill(), 60));
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  toggleLangMenu(): void {
    this.langOpen.update((open) => !open);
  }

  selectLang(code: 'es' | 'en' | 'fr' | 'it'): void {
    this.tr.setLang(code);
    this.langOpen.set(false);
  }

  @HostListener('document:click')
  closeLangMenu(): void {
    if (this.langOpen()) {
      this.langOpen.set(false);
    }
  }

      @HostListener('document:keydown.escape')
  onEscape(): void {
    this.langOpen.set(false);
    this.menuOpen.set(false);
  }

  press(id: string): void {
    this.pressed.set(id);
    if (this.pressTimer !== null) {
      window.clearTimeout(this.pressTimer);
    }
    this.pressTimer = window.setTimeout(() => this.pressed.set(null), 650);
    requestAnimationFrame(() => this.updatePill());
  }

  // Logo: regreso suave al inicio + saludo de Meipo
  goHome(event: MouseEvent): void {
    this.press('brand');
    window.dispatchEvent(new Event('meipo-wave'));
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onResize = (): void => this.updatePill();

  private updatePill(): void {
    const key = this.pressed();
    const link = this.navLink().find((el) => el.nativeElement.getAttribute('fragment') === key)?.nativeElement;
    if (!link) {
      this.pillShow.set(false);
      return;
    }
    const width = link.offsetWidth;
    if (!width) {
      this.pillShow.set(false);
      return;
    }
    this.pillLeft.set(link.offsetLeft);
    this.pillWidth.set(width);
    this.pillShow.set(true);
  }
}
