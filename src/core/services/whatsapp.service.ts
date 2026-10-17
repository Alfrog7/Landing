import { BRAND_CONFIG } from '../config/brand.config';
import type { QuoteDraft } from '../models/quote.model';

const BASE_URL = 'https://wa.me/';

function buildUrl(message: string): string {
  return `${BASE_URL}${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WhatsAppService = {
  buildQuoteUrl(draft: QuoteDraft): string {
    const message = [
      `Hola ${BRAND_CONFIG.brandName}, solicito cotización express:`,
      `• *RUC:* ${draft.ruc}`,
      `• *Empresa:* ${draft.businessName}`,
      `• *Póliza:* ${draft.productType}`,
      `• *Trabajadores:* ${draft.workersCount}`,
      `• *Contacto:* ${draft.contactName}`,
    ].join('\n');

    return buildUrl(message);
  },

  buildServiceUrl(serviceTitle: string, tag: string): string {
    const message = [
      `¡Hola ${BRAND_CONFIG.brandName}! Vengo desde tu web y deseo cotizar *${serviceTitle}* (${tag}).`,
      '',
      '¿Podrías indicarme qué documentos o datos de mi empresa/caso necesitas para presentarme una propuesta comparativa con las aseguradoras?',
      '',
      '¡Muchas gracias!',
    ].join('\n');

    return buildUrl(message);
  },

  buildAppointmentUrl(data: {
    date: string;
    time: string;
    fullName: string;
    companyOrRuc?: string;
    serviceTopic: string;
  }): string {
    const message = [
      `¡Hola ${BRAND_CONFIG.brandName}! Acabo de agendar una sesión de 15 minutos.`,
      '',
      `• *Fecha:* ${data.date}`,
      `• *Hora:* ${data.time}`,
      `• *Nombre:* ${data.fullName}`,
      `• *Empresa / RUC:* ${data.companyOrRuc || 'No indicado'}`,
      `• *Tema:* ${data.serviceTopic}`,
      '',
      'Quedo a la espera del enlace de videollamada. ¡Saludos!',
    ].join('\n');

    return buildUrl(message);
  },

  buildUrgentCheckpointUrl(): string {
    const message = [
      '*URGENCIA DE EMISIÓN / GARITA:*',
      `Hola ${BRAND_CONFIG.brandName}, requiero emisión o constancia urgente para ingreso inmediato de personal a obra/mina.`,
      'Por favor tu atención prioritaria.',
    ].join('\n');
    return buildUrl(message);
  },

  buildGenericUrl(message: string): string {
    return buildUrl(`Hola ${BRAND_CONFIG.brandName}, ${message}`);
  },
};
