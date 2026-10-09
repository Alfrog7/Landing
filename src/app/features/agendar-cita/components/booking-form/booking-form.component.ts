import { Component, input, signal, model } from '@angular/core';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-booking-form',
  imports: [FormFieldComponent],
  template: `
    <app-form-field label="Nombre completo" inputId="fullName" [error]="nameError()">
      <input
        id="fullName"
        name="fullName"
        type="text"
        placeholder="Ej. Jorge Luis Ramírez"
        [value]="fullName()"
        (input)="fullName.set($any($event.target).value)"
      />
    </app-form-field>
    <app-form-field label="Correo corporativo" inputId="corporateEmail" [error]="emailError()">
      <input
        id="corporateEmail"
        name="corporateEmail"
        type="email"
        placeholder="jefe@empresa.com"
        [value]="corporateEmail()"
        (input)="corporateEmail.set($any($event.target).value)"
      />
    </app-form-field>
    <app-form-field label="Celular (9 dígitos)" inputId="phone" [error]="phoneError()">
      <input
        id="phone"
        name="phone"
        inputmode="numeric"
        maxlength="9"
        placeholder="987654321"
        [value]="phone()"
        (input)="onPhoneInput($event)"
      />
    </app-form-field>
    <app-form-field label="RUC de tu empresa (opcional)" inputId="companyRuc">
      <input
        id="companyRuc"
        name="companyRuc"
        inputmode="numeric"
        maxlength="11"
        placeholder="20123456789"
        [value]="companyRuc()"
        (input)="onRucInput($event)"
      />
    </app-form-field>
    <app-form-field label="¿Cuál es la necesidad principal de tu empresa?" inputId="notes">
      <textarea
        id="notes"
        name="notes"
        rows="3"
        placeholder="Ej.: emitir SCTR para 15 operarios que ingresan el lunes a obra."
        [value]="notes()"
        (input)="notes.set($any($event.target).value)"
      ></textarea>
    </app-form-field>
  `,
})
export class BookingFormComponent {
  readonly fullName = model('');
  readonly corporateEmail = model('');
  readonly phone = model('');
  readonly companyRuc = model('');
  readonly notes = model('');

  readonly nameError = input<string | null>(null);
  readonly emailError = input<string | null>(null);
  readonly phoneError = input<string | null>(null);

  onPhoneInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const value = inputEl.value.replace(/\D/g, '').slice(0, 9);
    inputEl.value = value;
    this.phone.set(value);
  }

  onRucInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const value = inputEl.value.replace(/\D/g, '').slice(0, 11);
    inputEl.value = value;
    this.companyRuc.set(value);
  }
}
