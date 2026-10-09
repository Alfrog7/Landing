import { Component, inject, input, model, output, signal } from '@angular/core';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { WhatsAppService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-login-card',
  imports: [FormFieldComponent, ButtonComponent],
  template: `
    <div class="login-card">
      <h1>Portal de Clientes</h1>
      <p class="login-card__lead">
        Autogestión de constancias y pólizas SCTR. Acceso exclusivo para empresas aseguradas.
      </p>
      <form (submit)="login($event)" novalidate>
        <app-form-field label="RUC de la empresa (11 dígitos)" inputId="portal-ruc" [error]="rucError()">
          <input
            id="portal-ruc"
            name="ruc"
            inputmode="numeric"
            maxlength="11"
            placeholder="20123456789"
            [value]="ruc()"
            (input)="onRucInput($event)"
          />
        </app-form-field>
        <app-form-field
          label="DNI del contacto registrado (8 dígitos) o contraseña corporativa"
          inputId="portal-access"
          [error]="accessError()"
        >
          <input
            id="portal-access"
            name="access"
            type="password"
            placeholder="••••••••"
            [value]="access()"
            (input)="access.set($any($event.target).value)"
          />
        </app-form-field>
        <app-button variant="primary" type="submit" [block]="true">Ingresar al portal</app-button>
      </form>
      <p class="login-card__help">
        ¿Problemas de acceso?
        <a [href]="helpUrl" target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a>
      </p>
    </div>
  `,
  styles: [
    `
      .login-card {
        display: grid;
        gap: 1rem;
      }
      h1 {
        font-size: 1.7rem;
        margin: 0;
      }
      .login-card__lead {
        margin: 0;
        color: var(--color-muted);
        font-size: 0.92rem;
      }
      form {
        display: grid;
        gap: 1.1rem;
      }
      .login-card__help {
        margin: 0;
        font-size: 0.85rem;
        color: var(--color-muted);
        text-align: center;
      }
      .login-card__help a {
        font-weight: 700;
        color: var(--color-whatsapp);
      }
    `,
  ],
})
export class LoginCardComponent {
  readonly ruc = model('');
  readonly access = model('');
  readonly rucError = input<string | null>(null);
  readonly accessError = input<string | null>(null);
  readonly loading = input(false);

  readonly loginSubmit = output<{ ruc: string; access: string }>();

  private readonly whatsapp = inject(WhatsAppService);

  readonly helpUrl = this.whatsapp.buildGenericUrl(
    'tengo problemas para acceder al portal de clientes.'
  );

  onRucInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const value = inputEl.value.replace(/\D/g, '').slice(0, 11);
    inputEl.value = value;
    this.ruc.set(value);
  }

  login(event: Event): void {
    event.preventDefault();
    this.loginSubmit.emit({ ruc: this.ruc(), access: this.access() });
  }
}
