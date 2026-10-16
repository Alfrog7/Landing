import type { QuoteDraft } from '../models/quote.model';

let lastQuote: QuoteDraft | null = null;

export const QuoteService = {
  submitQuote(draft: QuoteDraft): void {
    // Persistencia de la cotización en memoria (listo para conectar a un backend
    // o CRM mediante una llamada HTTP sin cambiar las pantallas).
    lastQuote = draft;
  },

  getLastQuote(): QuoteDraft | null {
    return lastQuote;
  },
};
