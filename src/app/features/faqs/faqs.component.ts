import { Component, computed, signal } from '@angular/core';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { QuestionsAccordionComponent } from './components/questions-accordion/questions-accordion.component';
import { ResourcesSidebarComponent } from './components/resources-sidebar/resources-sidebar.component';
import { FAQS, FaqCategory } from './faqs.data';
import { AccordionItem } from '../../shared/components/accordion/accordion.component';

const CATEGORIES: (FaqCategory | 'Todos')[] = ['Todos', 'SCTR', 'Seguro Vida Ley', 'Rol del Broker', 'Pases y Garitas'];

@Component({
  selector: 'app-faqs',
  imports: [SearchFilterComponent, QuestionsAccordionComponent, ResourcesSidebarComponent],
  template: `
    <header class="faqs-hero">
      <div class="container">
        <span class="eyebrow eyebrow--light">Centro de ayuda</span>
        <h1>Preguntas frecuentes</h1>
        <p>
          Resuelve tus dudas sobre SCTR, Seguro Vida Ley, el rol de la corredora y la emisión
          de constancias para garitas de ingreso.
        </p>
      </div>
    </header>

    <section class="section faqs-body">
      <div class="container faqs-grid">
        <div class="faqs-main">
          <app-search-filter
            (queryChange)="onQuery($event)"
            (categoryChange)="onCategory($event)"
          />
          <app-questions-accordion [items]="filteredFaqs()" />
        </div>
        <aside class="faqs-aside">
          <app-resources-sidebar />
        </aside>
      </div>
    </section>
  `,
  styles: [
    `
      .faqs-hero {
        background: var(--color-secondary);
        color: #fff;
        padding: clamp(2.5rem, 6vw, 3.8rem) 0;
      }
      .eyebrow--light {
        color: #7fa9f0;
      }
      .faqs-hero h1 {
        color: #fff;
        font-size: clamp(1.9rem, 4.2vw, 2.8rem);
        margin-bottom: 0.5rem;
      }
      .faqs-hero p {
        color: rgba(255, 255, 255, 0.8);
        max-width: 56ch;
        margin: 0;
      }
      .faqs-grid {
        display: grid;
        grid-template-columns: 1.6fr 0.9fr;
        gap: 2.5rem;
        align-items: start;
      }
      .faqs-main {
        display: grid;
        gap: 1.8rem;
        align-items: start;
      }
      .faqs-aside {
        position: sticky;
        top: 96px;
      }
      @media (max-width: 900px) {
        .faqs-grid {
          grid-template-columns: 1fr;
        }
        .faqs-aside {
          position: static;
        }
      }
    `,
  ],
})
export class FaqsComponent {
  private readonly query = signal('');
  private readonly category = signal<string>('Todos');

  readonly filteredFaqs = computed<AccordionItem[]>(() => {
    const search = this.query().toLowerCase().trim();
    const selected = this.category();
    return FAQS.filter((faq) => {
      const matchCategory = selected === 'Todos' || faq.category === selected;
      const matchSearch = !search || faq.question.toLowerCase().includes(search) || faq.answer.toLowerCase().includes(search);
      return matchCategory && matchSearch;
    }).map((faq) => ({ question: faq.question, answer: faq.answer, category: faq.category }));
  });

  onQuery(value: string): void {
    this.query.set(value);
  }

  onCategory(value: string): void {
    this.category.set(value);
  }
}
