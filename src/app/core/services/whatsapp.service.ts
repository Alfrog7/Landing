import { Injectable } from '@angular/core';
import { BRAND_CONFIG } from '../config/brand.config';
import { QuoteDraft } from '../models/quote.model';

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  private readonly baseUrl = 'https://wa.me/';

  private buildUrl(message: string): string {
    return `${this.baseUrl}${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  buildQuoteUrl(draft: QuoteDraft): string {
    const message = [
      `Hola ${BRAND_CONFIG.brandName}, solicito cotización express:`,
      `• *RUC:* ${draft.ruc}`,
      `• *Empresa:* ${draft.businessName}`,
      `• *Póliza:* ${draft.productType}`,
      `• *Trabajadores:* ${draft.workersCount}`,
      `• *Contacto:* ${draft.contactName}`,
    ].join('\n');

    return this.buildUrl(message);
  }

  buildServiceQuoteUrl(
    serviceTitle: string,
    ruc: string,
    selectedOption: string
  ): string {
    const message = [
      `¡Hola ${BRAND_CONFIG.brandName}! 👋 Deseo cotizar el servicio de *${serviceTitle}*.`,
      '',
      `• *RUC / Empresa:* ${ruc ? ruc : 'A coordinar'}`,
      `• *Tipo / Requerimiento:* ${selectedOption || 'Evaluación inicial'}`,
      '',
      '¿Podrías indicarme qué documentos necesitas para cotizar con las aseguradoras? ¡Gracias!',
    ].join('\n');

    return this.buildUrl(message);
  }

  buildAppointmentUrl(data: {
    date: string;
    time: string;
    fullName: string;
    companyOrRuc?: string;
    serviceTopic: string;
  }): string {
    const message = [
      `¡Hola ${BRAND_CONFIG.brandName}! 👋 Acabo de agendar una sesión de 15 minutos.`,
      '',
      `• *Fecha:* ${data.date}`,
      `• *Hora:* ${data.time}`,
      `• *Nombre:* ${data.fullName}`,
      `• *Empresa / RUC:* ${data.companyOrRuc || 'No indicado'}`,
      `• *Tema:* ${data.serviceTopic}`,
      '',
      'Quedo a la espera del enlace de videollamada. ¡Saludos!',
    ].join('\n');

    return this.buildUrl(message);
  }

  buildUrgentCheckpointUrl(ruc = ''): string {
    const text = `🚨 *URGENCIA GARITA:* Hola ${BRAND_CONFIG.brandName}, requiero soporte inmediato para emisión/constancia de pase de garita${ruc ? ` para el RUC ${ruc}` : ''}.`;
    return this.buildUrl(text);
  }

  buildGenericUrl(message: string): string {
    return this.buildUrl(`Hola ${BRAND_CONFIG.brandName}, ${message}`);
  }
}
