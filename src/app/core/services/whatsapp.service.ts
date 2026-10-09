import { Injectable } from '@angular/core';
import { BRAND_CONFIG } from '../config/brand.config';
import { QuoteDraft } from '../models/quote.model';

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  private readonly baseUrl = 'https://wa.me/';

  buildQuoteUrl(draft: QuoteDraft): string {
    const message = [
      `Hola ${BRAND_CONFIG.brandName}, solicito cotización express:`,
      `• *RUC:* ${draft.ruc}`,
      `• *Empresa:* ${draft.businessName}`,
      `• *Póliza:* ${draft.productType}`,
      `• *Trabajadores:* ${draft.workersCount}`,
      `• *Contacto:* ${draft.contactName}`,
    ].join('\n');

    return `${this.baseUrl}${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  buildUrgentCheckpointUrl(ruc = ''): string {
    const text = `🚨 *URGENCIA GARITA:* Hola ${BRAND_CONFIG.brandName}, requiero soporte inmediato para emisión/constancia de pase de garita${ruc ? ` para el RUC ${ruc}` : ''}.`;
    return `${this.baseUrl}${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }

  buildGenericUrl(message: string): string {
    const text = `Hola ${BRAND_CONFIG.brandName}, ${message}`;
    return `${this.baseUrl}${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }
}
