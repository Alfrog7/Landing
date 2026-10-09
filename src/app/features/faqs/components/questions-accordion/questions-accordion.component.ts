import { Component, input } from '@angular/core';
import { AccordionComponent, AccordionItem } from '../../../../shared/components/accordion/accordion.component';

@Component({
  selector: 'app-questions-accordion',
  imports: [AccordionComponent],
  template: `
    @if (items().length === 0) {
      <div class="empty">
        <p>Sin resultados para tu búsqueda.</p>
        <span>Prueba con otra palabra o cambia la categoría.</span>
      </div>
    } @else {
      <app-accordion [items]="items()" />
    }
  `,
  styles: [
    `
      .empty {
        border: 1px dashed var(--color-border-strong);
        border-radius: var(--radius-lg);
        padding: 2rem;
        text-align: center;
      }
      .empty p {
        margin: 0 0 0.3rem;
        font-weight: 700;
        color: var(--color-heading);
      }
      .empty span {
        color: var(--color-muted);
        font-size: 0.9rem;
      }
    `,
  ],
})
export class QuestionsAccordionComponent {
  readonly items = input.required<AccordionItem[]>();
}
