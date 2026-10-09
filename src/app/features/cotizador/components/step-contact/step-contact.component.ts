import { Component, model, input } from '@angular/core';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-step-contact',
  imports: [FormFieldComponent],
  template: `
    <app-form-field label="Responsable (RR.HH. / Administración)" inputId="contactName" [error]="nameError()">
      <input
        id="contactName"
        name="contactName"
        type="text"
        placeholder="Ej. Ana Karen Quispe"
        [value]="contactName()"
        (input)="contactName.set($any($event.target).value)"
      />
    </app-form-field>
    <app-form-field label="Correo corporativo" inputId="contactEmail" [error]="emailError()">
      <input
        id="contactEmail"
        name="contactEmail"
        type="email"
        placeholder="rrhh@empresa.com"
        [value]="contactEmail()"
        (input)="contactEmail.set($any($event.target).value)"
      />
    </app-form-field>
    <app-form-field label="Celular (9 dígitos)" inputId="contactPhone" [error]="phoneError()">
      <input
        id="contactPhone"
        name="contactPhone"
        inputmode="numeric"
        maxlength="9"
        placeholder="987654321"
        [value]="contactPhone()"
        (input)="onPhoneInput($event)"
      />
    </app-form-field>
    <p class="privacy">
      Usamos tus datos únicamente para responder tu cotización conforme a la política de
      privacidad de la corredora.
    </p>
  `,
  styles: [
    `
      .privacy {
        font-size: 0.8rem;
        color: var(--color-muted);
        margin: 0;
      }
    `,
  ],
})
export class StepContactComponent {
  readonly contactName = model('');
  readonly contactEmail = model('');
  readonly contactPhone = model('');

  readonly nameError = input<string | null>(null);
  readonly emailError = input<string | null>(null);
  readonly phoneError = input<string | null>(null);

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 9);
    input.value = value;
    this.contactPhone.set(value);
  }
}
