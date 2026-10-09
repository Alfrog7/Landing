import { Component, Input } from '@angular/core';

export interface StepDefinition {
  label: string;
}

@Component({
  selector: 'app-stepper',
  template: `
    <ol class="stepper" aria-label="Progreso del formulario">
      @for (step of steps; track step.label; let i = $index) {
        <li
          class="stepper__step"
          [class.stepper__step--active]="current === i"
          [class.stepper__step--done]="current > i"
          [attr.aria-current]="current === i ? 'step' : null"
        >
          <span class="stepper__index" aria-hidden="true">{{ current > i ? '✓' : i + 1 }}</span>
          <span class="stepper__label">{{ step.label }}</span>
        </li>
      }
    </ol>
  `,
  styles: [
    `
      .stepper {
        display: flex;
        gap: 0.5rem;
        list-style: none;
        margin: 0 0 2rem;
        padding: 0;
        flex-wrap: wrap;
      }
      .stepper__step {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1 1 0;
        min-width: 150px;
        padding: 0.65rem 0.9rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-border);
        background: var(--color-surface);
        color: var(--color-muted);
        font-size: 0.85rem;
        font-weight: 600;
      }
      .stepper__index {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--color-border);
        color: var(--color-heading);
        font-size: 0.75rem;
        flex-shrink: 0;
      }
      .stepper__step--active {
        border-color: var(--color-primary);
        color: var(--color-primary);
        box-shadow: var(--shadow-sm);
      }
      .stepper__step--active .stepper__index {
        background: var(--color-primary);
        color: #fff;
      }
      .stepper__step--done {
        color: var(--color-whatsapp);
      }
      .stepper__step--done .stepper__index {
        background: var(--color-whatsapp);
        color: #fff;
      }
    `,
  ],
})
export class StepperComponent {
  @Input({ required: true }) steps: StepDefinition[] = [];
  @Input() current = 0;
}
