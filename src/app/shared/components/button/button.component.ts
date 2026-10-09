import { Component, Input, output } from '@angular/core';

export type AppButtonVariant = 'primary' | 'outline' | 'whatsapp' | 'ghost';

@Component({
  selector: 'app-button',
  template: `
    @if (href) {
      <a [attr.href]="href" [attr.target]="target" [attr.rel]="target ? '_blank noopener noreferrer' : null"
         [class.app-btn]="true" [class]="'app-btn--' + variant" [class.app-btn--block]="block">
        <ng-content />
      </a>
    } @else {
      <button [type]="type" [attr.disabled]="disabled === true ? '' : null"
              (click)="onButtonPress()"
              [class.app-btn]="true" [class]="'app-btn--' + variant" [class.app-btn--block]="block">
        <ng-content />
      </button>
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .app-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-family: var(--font-body);
        font-size: 0.95rem;
        font-weight: 600;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-sm);
        border: 1px solid transparent;
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        text-decoration: none;
      }
      .app-btn--block {
        width: 100%;
      }
      .app-btn--primary {
        background: var(--color-primary);
        color: #fff;
      }
      .app-btn--primary:hover {
        background: var(--color-primary-dark);
      }
      .app-btn--outline {
        background: transparent;
        color: var(--color-primary);
        border-color: var(--color-primary);
      }
      .app-btn--outline:hover {
        background: var(--color-primary);
        color: #fff;
      }
      .app-btn--whatsapp {
        background: var(--color-whatsapp);
        color: #fff;
      }
      .app-btn--whatsapp:hover {
        background: var(--color-whatsapp-dark);
      }
      .app-btn--ghost {
        background: transparent;
        color: #fff;
        border-color: rgba(255, 255, 255, 0.5);
      }
      .app-btn--ghost:hover {
        background: rgba(255, 255, 255, 0.12);
      }
      button:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
    `,
  ],
})
export class ButtonComponent {
  @Input() variant: AppButtonVariant = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() href: string | null = null;
  @Input() target: string | null = null;
  @Input() disabled: boolean | undefined;
  @Input() block = false;

  readonly pressed = output<void>();

  onButtonPress(): void {
    this.pressed.emit();
  }
}
