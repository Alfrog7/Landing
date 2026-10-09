import { Injectable, signal } from '@angular/core';
import { QuoteDraft } from '../models/quote.model';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private readonly _lastQuote = signal<QuoteDraft | null>(null);

  readonly lastQuote = this._lastQuote.asReadonly();

  submitQuote(draft: QuoteDraft): void {
    // Persistencia de la cotización en memoria (listo para conectar a un backend
    // o CRM mediante una llamada HTTP sin cambiar las pantallas).
    this._lastQuote.set(draft);
  }
}
