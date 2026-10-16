export interface StepDefinition {
  label: string;
}

export function Stepper({ steps, current = 0 }: { steps: StepDefinition[]; current?: number }) {
  return (
    <app-stepper>
      <ol class="stepper" aria-label="Progreso del formulario">
        {steps.map((step, i) => (
          <li
            key={step.label}
            class={`stepper__step${current === i ? ' stepper__step--active' : ''}${current > i ? ' stepper__step--done' : ''}`}
            aria-current={current === i ? 'step' : undefined}
          >
            <span class="stepper__index" aria-hidden="true">
              {current > i ? '✓' : i + 1}
            </span>
            <span class="stepper__label">{step.label}</span>
          </li>
        ))}
      </ol>
    </app-stepper>
  );
}
