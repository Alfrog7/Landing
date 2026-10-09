import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideMenu, LucideMessageCircle, LucideX } from '@lucide/angular';
import { BRAND_CONFIG } from '../../../core/config/brand.config';
import { WhatsAppService } from '../../../core/services/whatsapp.service';

@Component({
  selector: 'app-top-navbar',
  imports: [RouterLink, LucideMenu, LucideMessageCircle, LucideX],
  template: `
    <header class="navbar-wrap">
      <div class="navbar">
        <a routerLink="/" class="navbar__brand" aria-label="Inicio">
          <span class="navbar__brand-text">
            {{ brand.brandName }}
            <small>{{ brand.brandSubtitle }}</small>
          </span>
          <span class="navbar__chip">{{ brand.sbsChipShort }}</span>
        </a>

        <nav class="navbar__links" aria-label="Navegación principal">
          <a routerLink="/" fragment="soluciones">Soluciones</a>
          <a routerLink="/" fragment="sobre-melanie">¿Por qué Melanie?</a>
          <a routerLink="/" fragment="aseguradoras">Aseguradoras</a>
          <a routerLink="/" fragment="faq">Preguntas</a>
        </nav>

        <div class="navbar__actions">
          <a routerLink="/" fragment="agendar" class="navbar__link-quiet">
            Agendar Cita (15 min)
          </a>
        </div>

        <button
          type="button"
          class="navbar__burger"
          (click)="toggleMenu()"
          [attr.aria-expanded]="menuOpen()"
          aria-label="Abrir menú"
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
          <a routerLink="/" fragment="soluciones" (click)="menuOpen.set(false)">Soluciones</a>
          <a routerLink="/" fragment="sobre-melanie" (click)="menuOpen.set(false)">¿Por qué Melanie?</a>
          <a routerLink="/" fragment="aseguradoras" (click)="menuOpen.set(false)">Aseguradoras</a>
          <a routerLink="/" fragment="faq" (click)="menuOpen.set(false)">Preguntas</a>
          <a routerLink="/" fragment="agendar" (click)="menuOpen.set(false)">Agendar Cita (15 min)</a>
          <a class="navbar__mobile-wa" [href]="whatsappUrl" target="_blank" rel="noopener noreferrer">
            <svg lucideMessageCircle [size]="17" />
            WhatsApp {{ brand.contact.phone }}
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
      .navbar__brand {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        text-decoration: none;
      }
      .navbar__brand-text {
        display: flex;
        flex-direction: column;
        font-family: var(--font-heading);
        font-size: 1.15rem;
        font-weight: 800;
        color: var(--color-heading);
        line-height: 1.05;
        letter-spacing: -0.01em;
      }
      .navbar__brand-text small {
        font-family: var(--font-body);
        font-size: 0.62rem;
        font-weight: 600;
        color: var(--color-primary-dark);
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .navbar__chip {
        font-size: 0.7rem;
        font-weight: 600;
        color: var(--color-muted);
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 999px;
        padding: 0.28rem 0.75rem;
        white-space: nowrap;
      }
      .navbar__links {
        display: flex;
        gap: 1.5rem;
        margin-inline: auto;
      }
      .navbar__links a {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--color-body);
      }
      .navbar__links a:hover {
        color: var(--color-primary-dark);
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
        gap: 0.25rem;
        padding: 1rem 1.5rem;
        margin-top: 0.5rem;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-3xl);
        box-shadow: var(--shadow-modal-split);
      }
      .navbar__mobile a {
        padding: 0.65rem 0.6rem;
        font-weight: 600;
        color: var(--color-heading);
        border-radius: var(--radius-sm);
      }
      .navbar__mobile a:hover {
        background: var(--color-primary-light);
      }
      .navbar__mobile-wa {
        color: var(--color-primary-dark) !important;
      }
      @media (max-width: 1180px) {
        .navbar__chip {
          display: none;
        }
      }
      @media (max-width: 1024px) {
        .navbar__links,
        .navbar__actions {
          display: none;
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
  readonly menuOpen = signal(false);
  readonly whatsappUrl: string;

  constructor(whatsapp: WhatsAppService) {
    this.whatsappUrl = whatsapp.buildGenericUrl(
      'quisiera conversar con asesoría personalizada sobre mi seguro.'
    );
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
