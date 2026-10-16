import { useState } from 'preact/hooks';

export interface AccordionItem {
  question: string;
  answer: string;
  category?: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <app-accordion>
      <div class="accordion" role="presentation">
        {items.map((item, i) => (
          <div key={item.question} class={`accordion__item${openIndex === i ? ' accordion__item--open' : ''}`}>
            <button
              type="button"
              class="accordion__trigger"
              aria-expanded={openIndex === i}
              aria-controls={`accordion-panel-${i}`}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            >
              <span class="accordion__question">{item.question}</span>
              <span class="accordion__icon" aria-hidden="true">
                ▾
              </span>
            </button>
            <div class="accordion__panel" id={`accordion-panel-${i}`} hidden={openIndex !== i}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </app-accordion>
  );
}
