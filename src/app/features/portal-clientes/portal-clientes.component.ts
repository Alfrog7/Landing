import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { ExpressDownloadComponent } from './components/express-download/express-download.component';
import { BRAND_CONFIG } from '../../core/config/brand.config';

@Component({
  selector: 'app-portal-clientes',
  imports: [RouterLink, LoginCardComponent, ExpressDownloadComponent],
  template: `
    <div class="portal">
      <header class="portal__bar">
        <a routerLink="/" class="portal__brand" aria-label="Volver al inicio">
          <span class="portal__shield" aria-hidden="true">S</span>
          <span class="portal__name">
            {{ brand.brandName }}
            <small>{{ brand.licenseId }}</small>
          </span>
        </a>
        <span class="portal__badge">{{ brand.supervisionBadge }}</span>
      </header>

      <main class="portal__main">
        @if (!session()) {
          <div class="portal__login">
            @if (loginError(); as error) {
              <p class="portal__error" role="alert">{{ error }}</p>
            }
            @if (loading()) {
              <p class="portal__loading">Validando credenciales…</p>
            } @else {
              <app-login-card
                [(ruc)]="ruc"
                [(access)]="access"
                [rucError]="rucError()"
                [accessError]="accessError()"
                (loginSubmit)="onLogin($event)"
              />
            }
          </div>
        } @else {
          <app-express-download [ruc]="ruc()" (logout)="logout()" />
        }
      </main>

      <footer class="portal__footer">
        <p>
          © {{ year }} {{ brand.brandName }} — {{ brand.roleTitle }}. {{ brand.contact.email }} ·
          {{ brand.contact.phone }}
        </p>
      </footer>
    </div>
  `,
  styles: [
    `
      .portal {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background:
          radial-gradient(circle at 20% 0%, rgba(25, 82, 190, 0.08), transparent 50%),
          var(--color-bg);
      }
      .portal__bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 5%;
        border-bottom: 1px solid var(--color-border);
        background: var(--color-surface);
      }
      .portal__brand {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        text-decoration: none;
      }
      .portal__shield {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--color-primary);
        color: #fff;
        font-family: var(--font-heading);
        font-weight: 800;
      }
      .portal__name {
        display: flex;
        flex-direction: column;
        font-family: var(--font-heading);
        font-weight: 700;
        color: var(--color-heading);
        line-height: 1.05;
      }
      .portal__name small {
        font-family: var(--font-body);
        font-size: 0.68rem;
        font-weight: 700;
        color: var(--color-primary);
      }
      .portal__badge {
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--color-muted);
        background: rgba(25, 82, 190, 0.08);
        border-radius: 999px;
        padding: 0.35rem 0.8rem;
      }
      .portal__main {
        flex: 1;
        display: grid;
        place-items: center;
        padding: 2.5rem 5%;
      }
      .portal__login {
        width: min(440px, 100%);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-md);
        padding: 2.2rem;
      }
      .portal__error,
      .portal__loading {
        margin: 0 0 1rem;
        font-size: 0.85rem;
        font-weight: 600;
      }
      .portal__error {
        color: #dc2626;
      }
      .portal__loading {
        color: var(--color-muted);
      }
      .portal__main app-express-download {
        width: min(980px, 100%);
      }
      .portal__footer {
        padding: 1.1rem 5%;
        border-top: 1px solid var(--color-border);
        background: var(--color-surface);
      }
      .portal__footer p {
        margin: 0;
        font-size: 0.78rem;
        color: var(--color-muted);
        text-align: center;
      }
      .portal form {
        display: grid;
        gap: 1.1rem;
      }
    `,
  ],
})
export class PortalClientesComponent {
  readonly brand = BRAND_CONFIG;
  readonly year = new Date().getFullYear();

  readonly ruc = signal('');
  readonly access = signal('');
  readonly session = signal(false);
  readonly loading = signal(false);

  readonly rucError = signal<string | null>(null);
  readonly accessError = signal<string | null>(null);
  readonly loginError = signal<string | null>(null);

  onLogin({ ruc, access }: { ruc: string; access: string }): void {
    this.rucError.set(null);
    this.accessError.set(null);
    this.loginError.set(null);

    const rucValido =
      /^\d{11}$/.test(ruc) && (ruc.startsWith('10') || ruc.startsWith('20'));
    if (!rucValido) {
      this.rucError.set('RUC inválido: requiere 11 dígitos e iniciar con 10 o 20.');
      return;
    }
    const isDni = /^\d{8}$/.test(access);
    if (!isDni && access.trim().length < 8) {
      this.accessError.set('Ingresa un DNI de 8 dígitos o tu contraseña corporativa.');
      return;
    }

    // Login demostrativo: la autenticación real invocará al backend de autogestión.
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.session.set(true);
    }, 600);
  }

  logout(): void {
    this.session.set(false);
    this.access.set('');
  }
}
