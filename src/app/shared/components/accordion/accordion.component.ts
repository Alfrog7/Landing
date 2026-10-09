import { Component, Input, signal } from '@angular/core';

export interface AccordionItem {
  question: string;
  answer: string;
  category?: string;
}

@Component({
  selector: 'app-accordion',
  template: `
    <div class="accordion" role="presentation">
      @for (item of items; track item.question; let i = $index) {
        <div class="accordion__item" [class.accordion__item--open]="openIndex() === i">
          <button
            type="button"
            class="accordion__trigger"
            [attr.aria-expanded]="openIndex() === i"
            [attr.aria-controls]="'accordion-panel-' + i"
            (click)="toggle(i)"
          >
            <span class="accordion__question">{{ item.question }}</span>
            <span class="accordion__icon" aria-hidden="true">▾</span>
          </button>
          <div
            class="accordion__panel"
            [id]="'accordion-panel-' + i"
            [hidden]="openIndex() !== i"
          >
            <p>{{ item.answer }}</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .accordion {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        background: var(--color-surface);
        overflow: hidden;
      }
      .accordion__item + .accordion__item {
        border-top: 1px solid var(--color-border);
      }
      .accordion__trigger {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        background: transparent;
        border: 0;
        padding: 1.1rem 1.4rem;
        font-family: var(--font-body);
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-heading);
        cursor: pointer;
        text-align: left;
      }
      .accordion__trigger:hover {
        background: rgba(25, 82, 190, 0.04);
      }
      .accordion__icon {
        transition: transform 0.2s ease;
        color: var(--color-primary);
        flex-shrink: 0;
      }
      .accordion__item--open .accordion__icon {
        transform: rotate(180deg);
      }
      .accordion__panel {
        padding: 0 1.4rem 1.2rem;
        color: var(--color-body);
        margin: 0;
      }
      .accordion__panel p {
        margin: 0;
      }
    `,
  ],
})
export class AccordionComponent {
  @Input({ required: true }) items: AccordionItem[] = [];
  readonly openIndex = signal<number>(0);

  toggle(index: number): void {
    this.openIndex.set(this.openIndex() === index ? -1 : index);
  }
}
