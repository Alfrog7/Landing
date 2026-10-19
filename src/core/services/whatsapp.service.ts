import { BRAND_CONFIG } from '../config/brand.config';
import type { QuoteDraft } from '../models/quote.model';

const BASE_URL = 'https://wa.me/';

// Firma obligatoria en mensajes automáticos (lineamiento SBS, persona natural)
const SIGNATURE = `\u2014 ${BRAND_CONFIG.ownerName}, corredora de seguros persona natural`;

function buildUrl(message: string): string {
  return `${BASE_URL}${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WhatsAppService = {
  buildQuoteUrl(draft: QuoteDraft): string {
    let message = [
      `Hola ${BRAND_CONFIG.firstName}, solicito cotización express:`,
      `• *RUC:* ${draft.ruc}`,
      `• *Empresa:* ${draft.businessName}`,
      `• *Póliza:* ${draft.productType}`,
      `• *Trabajadores:* ${draft.workersCount}`,
      `• *Contacto:* ${draft.contactName}`,
    ].join('\n');
    message += `\n\n${SIGNATURE}`;

    return buildUrl(message);
  },

  buildServiceUrl(serviceTitle: string, tag: string): string {
    let message = [
      `¡Hola ${BRAND_CONFIG.firstName}! Vengo desde tu web y deseo cotizar *${serviceTitle}* (${tag}).`,
      '',
      '¿Podrías indicarme qué documentos o datos de mi empresa/caso necesitas para presentarme una propuesta comparativa con las aseguradoras?',
      '',
      '¡Muchas gracias!',
    ].join('\n');
    message += `\n\n${SIGNATURE}`;

    return buildUrl(message);
  },

  buildAppointmentUrl(data: {
    date: string;
    time: string;
    fullName: string;
    companyOrRuc?: string;
    serviceTopic: string;
  }): string {
    let message = [
      `¡Hola ${BRAND_CONFIG.firstName}! Acabo de agendar una sesión de 15 minutos.`,
      '',
      `• *Fecha:* ${data.date}`,
      `• *Hora:* ${data.time}`,
      `• *Nombre:* ${data.fullName}`,
      `• *Empresa / RUC:* ${data.companyOrRuc || 'No indicado'}`,
      `• *Tema:* ${data.serviceTopic}`,
      '',
      'Quedo a la espera del enlace de videollamada. ¡Saludos!',
    ].join('\n');
    message += `\n\n${SIGNATURE}`;

    return buildUrl(message);
  },

  buildUrgentCheckpointUrl(): string {
    let message = [
      '*URGENCIA DE EMISIÓN / GARITA:*',
      `Hola ${BRAND_CONFIG.firstName}, requiero emisión o constancia urgente para ingreso inmediato de personal a obra/mina.`,
      'Por favor tu atención prioritaria.',
    ].join('\n');
    message += `\n\n${SIGNATURE}`;
    return buildUrl(message);
  },

  buildGenericUrl(message: string): string {
    return buildUrl(`Hola ${BRAND_CONFIG.firstName}, ${message}\n\n${SIGNATURE}`);
  },
};
