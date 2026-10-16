import { useState } from 'preact/hooks';
import { Accordion, type AccordionItem } from '../ui/Accordion';
import { FormField } from '../ui/FormField';
import { FAQS, FAQ_CATEGORIES } from '../../core/data/faqs.data';

export default function FaqExplorer() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('Todos');

  const search = query.toLowerCase().trim();
  const filteredFaqs: AccordionItem[] = FAQS.filter((faq) => {
    const matchCategory = category === 'Todos' || faq.category === category;
    const matchSearch =
      !search || faq.question.toLowerCase().includes(search) || faq.answer.toLowerCase().includes(search);
    return matchCategory && matchSearch;
  }).map((faq) => ({ question: faq.question, answer: faq.answer, category: faq.category }));

  return (
    <>
      <app-search-filter>
        <div class="search">
          <FormField label="Busca tu pregunta" inputId="faq-search">
            <input
              id="faq-search"
              type="search"
              placeholder="Ej.: ¿Cuánto tarda una constancia de garita?"
              value={query}
              onInput={(e) => setQuery(e.currentTarget.value)}
            />
          </FormField>
          <div class="search__chips" role="tablist" aria-label="Filtrar por categoría">
            {FAQ_CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                class={`chip${item === category ? ' chip--active' : ''}`}
                aria-selected={item === category}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </app-search-filter>
      <app-questions-accordion>
        {filteredFaqs.length === 0 ? (
          <div class="empty">
            <p>Sin resultados para tu búsqueda.</p>
            <span>Prueba con otra palabra o cambia la categoría.</span>
          </div>
        ) : (
          <Accordion items={filteredFaqs} />
        )}
      </app-questions-accordion>
    </>
  );
}
