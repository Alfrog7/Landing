import { Component, input, output, signal } from '@angular/core';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { FAQ_CATEGORIES } from '../../faqs.data';

@Component({
  selector: 'app-search-filter',
  imports: [FormFieldComponent],
  template: `
    <div class="search">
      <app-form-field label="Busca tu pregunta" inputId="faq-search">
        <input
          id="faq-search"
          type="search"
          placeholder="Ej.: ¿Cuánto tarda una constancia de garita?"
          [value]="query()"
          (input)="onSearch($event)"
        />
      </app-form-field>
      <div class="search__chips" role="tablist" aria-label="Filtrar por categoría">
        @for (category of categories; track category) {
          <button
            type="button"
            role="tab"
            class="chip"
            [class.chip--active]="category === activeCategory()"
            [attr.aria-selected]="category === activeCategory()"
            (click)="select(category)"
          >
            {{ category }}
          </button>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .search {
        display: grid;
        gap: 1.1rem;
        max-width: 600px;
      }
      .search__chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .chip {
        border: 1px solid var(--color-border-strong);
        background: var(--color-surface);
        color: var(--color-body);
        font-family: var(--font-body);
        font-size: 0.82rem;
        font-weight: 600;
        padding: 0.45rem 1rem;
        border-radius: 999px;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .chip:hover {
        border-color: var(--color-primary);
        color: var(--color-primary);
      }
      .chip--active,
      .chip--active:hover {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: #fff;
      }
    `,
  ],
})
export class SearchFilterComponent {
  readonly categories = FAQ_CATEGORIES;
  readonly query = signal('');
  readonly activeCategory = signal<string>('Todos');

  readonly queryChange = output<string>();
  readonly categoryChange = output<string>();

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.queryChange.emit(value);
  }

  select(category: string): void {
    this.activeCategory.set(category);
    this.categoryChange.emit(category);
  }
}
