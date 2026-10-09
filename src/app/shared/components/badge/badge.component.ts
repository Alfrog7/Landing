import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-badge',
  template: `<span class="app-badge" [class]="'app-badge--' + variant"><ng-content /></span>`,
  styles: [
    `
      :host {
        display: inline-block;
      }
      .app-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        padding: 0.3rem 0.7rem;
        border-radius: 999px;
        line-height: 1.2;
      }
      .app-badge--primary {
        background: rgba(25, 82, 190, 0.12);
        color: var(--color-primary);
      }
      .app-badge--secondary {
        background: rgba(10, 29, 55, 0.1);
        color: var(--color-secondary);
      }
      .app-badge--whatsapp {
        background: rgba(0, 135, 90, 0.12);
        color: var(--color-whatsapp);
      }
      .app-badge--warn {
        background: rgba(234, 88, 12, 0.12);
        color: #c2410c;
      }
    `,
  ],
})
export class BadgeComponent {
  @Input() variant: 'primary' | 'secondary' | 'whatsapp' | 'warn' = 'primary';
}
