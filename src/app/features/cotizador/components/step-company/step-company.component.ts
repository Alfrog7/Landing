import { Component, model, input } from '@angular/core';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-step-company',
  imports: [FormFieldComponent],
  template: `
    <app-form-field label="RUC (11 dígitos, inicia con 10 o 20)" inputId="ruc" [error]="rucError()">
      <input
        id="ruc"
        name="ruc"
        inputmode="numeric"
        maxlength="11"
        placeholder="20123456789"
        [value]="ruc()"
        (input)="onRucInput($event)"
      />
    </app-form-field>
    <app-form-field label="Razón social" inputId="businessName" [error]="nameError()">
      <input
        id="businessName"
        name="businessName"
        type="text"
        placeholder="Constructora Andina S.A.C."
        [value]="businessName()"
        (input)="businessName.set($any($event.target).value)"
      />
    </app-form-field>
    <app-form-field label="Trabajadores en riesgo (estimado)" inputId="workersCount" [error]="workersError()">
      <input
        id="workersCount"
        name="workersCount"
        type="number"
        min="1"
        placeholder="12"
        [value]="workersCount()"
        (input)="onWorkersInput($event)"
      />
    </app-form-field>
    <label class="urgency">
      <input type="checkbox" [checked]="urgency()" (change)="urgency.set($any($event.target).checked)" />
      <span>Necesito emitir pases de garita para hoy (emisión express).</span>
    </label>
  `,
  styles: [
    `
      .urgency {
        display: flex;
        gap: 0.6rem;
        align-items: flex-start;
        border: 1px dashed var(--color-border-strong);
        border-radius: var(--radius-sm);
        padding: 0.8rem 1rem;
        font-size: 0.88rem;
        color: var(--color-body);
        cursor: pointer;
      }
      .urgency input {
        margin-top: 0.15rem;
      }
    `,
  ],
})
export class StepCompanyComponent {
  readonly ruc = model('');
  readonly businessName = model('');
  readonly workersCount = model('');
  readonly urgency = model(false);

  readonly rucError = input<string | null>(null);
  readonly nameError = input<string | null>(null);
  readonly workersError = input<string | null>(null);

  onRucInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 11);
    input.value = value;
    this.ruc.set(value);
  }

  onWorkersInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    input.value = value;
    this.workersCount.set(value);
  }
}
