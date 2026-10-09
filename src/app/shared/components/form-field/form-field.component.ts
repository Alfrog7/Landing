import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  template: `
    <div class="form-field" [class.form-field--error]="!!error">
      @if (label) {
        <label class="form-field__label" [for]="inputId">{{ label }}</label>
      }
      <div class="form-field__control">
        <ng-content />
      </div>
      @if (error) {
        <p class="form-field__error" role="alert">{{ error }}</p>
      }
    </div>
  `,
  styles: [
    `
      .form-field {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }
      .form-field__label {
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--color-heading);
      }
      .form-field__control :is(input, select, textarea) {
        width: 100%;
        padding: 0.7rem 0.9rem;
        border: 1px solid var(--color-border-strong);
        border-radius: var(--radius-sm);
        font-family: var(--font-body);
        font-size: 0.95rem;
        color: var(--color-heading);
        background: var(--color-surface);
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .form-field__control :is(input, select, textarea):focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(25, 82, 190, 0.18);
      }
      .form-field--error .form-field__control :is(input, select, textarea) {
        border-color: #dc2626;
      }
      .form-field__error {
        margin: 0;
        font-size: 0.78rem;
        color: #dc2626;
        font-weight: 600;
      }
    `,
  ],
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() inputId = '';
  @Input() error: string | null = null;
}
