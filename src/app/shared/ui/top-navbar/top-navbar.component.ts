import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BRAND_CONFIG } from '../../../core/config/brand.config';
import { MAIN_NAV_LINKS, QUICK_ACTIONS } from '../../../core/config/navigation.config';

@Component({
  selector: 'app-top-navbar',
  imports: [RouterLink],
  template: `
    <header class="navbar">
      <div class="navbar__inner container">
        <a routerLink="/" class="navbar__brand" aria-label="Inicio — {{ brand.brandName }}">
          <img [src]="brand.assets.logoLight" [alt]="brand.brandName" class="navbar__logo" />
          <span class="navbar__brand-text">
            {{ brand.brandName }}
            <small>{{ brand.licenseId }}</small>
          </span>
        </a>

        <nav class="navbar__links" aria-label="Navegación principal">
          @for (link of navLinks; track link.path) {
            <a [routerLink]="link.path">{{ link.label }}</a>
          }
        </nav>

        <div class="navbar__actions">
          <a [routerLink]="actions.portal" class="navbar__link-quiet">Portal Clientes</a>
          <a [routerLink]="actions.quote" class="navbar__btn navbar__btn--outline">+ Cotizar</a>
          <a [routerLink]="actions.booking" class="navbar__btn navbar__btn--primary">Agendar Cita</a>
        </div>

        <button
          type="button"
          class="navbar__burger"
          (click)="toggleMenu()"
          [attr.aria-expanded]="menuOpen()"
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      @if (menuOpen()) {
        <nav class="navbar__mobile" aria-label="Menú móvil">
          @for (link of navLinks; track link.path) {
            <a [routerLink]="link.path" (click)="toggleMenu()">{{ link.label }}</a>
          }
          <a [routerLink]="actions.portal" (click)="toggleMenu()">Portal Clientes</a>
          <a [routerLink]="actions.quote" (click)="toggleMenu()">+ Cotizar</a>
          <a [routerLink]="actions.booking" (click)="toggleMenu()">Agendar Cita</a>
          <a
            class="navbar__whatsapp"
            href="https://wa.me/{{ brand.contact.whatsappNumber }}"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp {{ brand.contact.phone }}
          </a>
        </nav>
      }
    </header>
  `,
  styles: [
    `
      .navbar {
        position: sticky;
        top: 0;
        z-index: 50;
        background: var(--color-surface);
        border-bottom: 1px solid var(--color-border);
        box-shadow: var(--shadow-sm);
      }
      .navbar__inner {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 0.65rem 0;
      }
      .navbar__brand {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        text-decoration: none;
      }
      .navbar__logo {
        height: 34px;
        width: auto;
      }
      .navbar__brand-text {
        display: flex;
        flex-direction: column;
        font-family: var(--font-heading);
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--color-heading);
        line-height: 1.05;
      }
      .navbar__brand-text small {
        font-family: var(--font-body);
        font-size: 0.68rem;
        font-weight: 600;
        color: var(--color-primary);
        letter-spacing: 0.05em;
      }
      .navbar__links {
        display: flex;
        gap: 1.4rem;
        margin-inline: auto;
      }
      .navbar__links a {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--color-body);
      }
      .navbar__links a:hover {
        color: var(--color-primary);
      }
      .navbar__actions {
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }
      .navbar__link-quiet {
        font-size: 0.88rem;
        font-weight: 600;
        color: var(--color-body);
      }
      .navbar__link-quiet:hover {
        color: var(--color-primary);
      }
      .navbar__btn {
        font-size: 0.88rem;
        font-weight: 700;
        padding: 0.55rem 1.1rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-primary);
      }
      .navbar__btn--outline {
        color: var(--color-primary);
        background: transparent;
      }
      .navbar__btn--outline:hover {
        background: var(--color-primary);
        color: #fff;
      }
      .navbar__btn--primary {
        color: #fff;
        background: var(--color-primary);
      }
      .navbar__btn--primary:hover {
        background: var(--color-primary-dark);
      }
      .navbar__burger {
        display: none;
        background: none;
        border: 1px solid var(--color-border-strong);
        border-radius: var(--radius-sm);
        font-size: 1.25rem;
        padding: 0.3rem 0.7rem;
        cursor: pointer;
        color: var(--color-heading);
      }
      .navbar__mobile {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 1rem 4%;
        border-top: 1px solid var(--color-border);
        background: var(--color-surface);
      }
      .navbar__mobile a {
        padding: 0.6rem 0.4rem;
        font-weight: 600;
        color: var(--color-heading);
        border-radius: var(--radius-sm);
      }
      .navbar__mobile a:hover {
        background: rgba(25, 82, 190, 0.06);
      }
      .navbar__whatsapp {
        color: var(--color-whatsapp) !important;
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
  readonly navLinks = MAIN_NAV_LINKS;
  readonly actions = QUICK_ACTIONS;
  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
