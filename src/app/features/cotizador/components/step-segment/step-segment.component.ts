import { Component, model } from '@angular/core';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { CompanyScale, InsuranceType, SCALE_LABELS, INSURANCE_TYPE_LABELS } from '../../../../core/models/quote.model';

@Component({
  selector: 'app-step-segment',
  imports: [FormFieldComponent],
  template: `
    <app-form-field label="¿Qué tamaño tiene tu empresa?" inputId="scale">
      <select id="scale" [value]="scale()" (change)="onScaleChange($event)">
        <option value="" disabled>Selecciona una opción…</option>
        @for (option of scaleOptions; track option.value) {
          <option [value]="option.value">{{ option.label }}</option>
        }
      </select>
    </app-form-field>

    <legend class="segment-legend">¿Qué póliza necesita?</legend>
    <div class="segment-products" role="radiogroup" aria-label="Tipo de póliza">
      @for (option of productOptions; track option.value) {
        <label
          class="segment-product"
          [class.segment-product--active]="productType() === option.value"
        >
          <input
            type="radio"
            name="productType"
            [value]="option.value"
            [checked]="productType() === option.value"
            (change)="productType.set(option.value)"
          />
          <span class="segment-product__title">{{ option.label }}</span>
          <span class="segment-product__hint">{{ option.hint }}</span>
        </label>
      }
    </div>
  `,
  styles: [
    `
      .segment-legend {
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--color-heading);
        padding: 0;
        margin: 0.4rem 0 0.5rem;
      }
      .segment-products {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.8rem;
      }
      .segment-product {
        border: 1px solid var(--color-border-strong);
        border-radius: var(--radius-lg);
        padding: 0.9rem 1.1rem;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .segment-product:hover {
        border-color: var(--color-primary);
      }
      .segment-product--active {
        border-color: var(--color-primary);
        background: rgba(25, 82, 190, 0.05);
        box-shadow: 0 0 0 3px rgba(25, 82, 190, 0.15);
      }
      .segment-product input {
        position: absolute;
        opacity: 0;
      }
      .segment-product__title {
        font-weight: 700;
        color: var(--color-heading);
        font-size: 0.95rem;
      }
      .segment-product--active .segment-product__title {
        color: var(--color-primary);
      }
      .segment-product__hint {
        font-size: 0.8rem;
        color: var(--color-muted);
      }
      @media (max-width: 560px) {
        .segment-products {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class StepSegmentComponent {
  readonly scale = model<CompanyScale | ''>('');
  readonly productType = model<InsuranceType | ''>('');

  readonly scaleOptions = (Object.keys(SCALE_LABELS) as CompanyScale[]).map((key) => ({
    value: key,
    label: SCALE_LABELS[key],
  }));

  readonly productOptions = [
    { value: 'sctr_salud' as InsuranceType, label: INSURANCE_TYPE_LABELS['sctr_salud'], hint: 'Cobertura médica ante accidentes de trabajo' },
    { value: 'sctr_pension' as InsuranceType, label: INSURANCE_TYPE_LABELS['sctr_pension'], hint: 'Invalidez y sobrevivencia' },
    { value: 'sctr_integral' as InsuranceType, label: INSURANCE_TYPE_LABELS['sctr_integral'], hint: 'Salud y Pensión en un solo contrato' },
    { value: 'vida_ley' as InsuranceType, label: INSURANCE_TYPE_LABELS['vida_ley'], hint: 'Vida obligatoria para planilla' },
  ];

  onScaleChange(event: Event): void {
    this.scale.set((event.target as HTMLSelectElement).value as CompanyScale);
  }
}
