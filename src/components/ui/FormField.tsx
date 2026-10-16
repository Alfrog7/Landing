import type { ComponentChildren } from 'preact';

interface FormFieldProps {
  label?: string;
  inputId?: string;
  error?: string | null;
  children?: ComponentChildren;
}

export function FormField({ label = '', inputId = '', error = null, children }: FormFieldProps) {
  return (
    <app-form-field>
      <div class={`form-field${error ? ' form-field--error' : ''}`}>
        {label && (
          <label class="form-field__label" for={inputId}>
            {label}
          </label>
        )}
        <div class="form-field__control">{children}</div>
        {error && (
          <p class="form-field__error" role="alert">
            {error}
          </p>
        )}
      </div>
    </app-form-field>
  );
}
