import { BRAND_CONFIG } from './brand.config';

export interface NavLink {
  label: string;
  path: string;
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: 'Coberturas & SCTR', path: '/coberturas-sctr' },
  { label: 'Asesoría', path: '/asesoria' },
  { label: 'Preguntas Frecuentes', path: '/preguntas-frecuentes' },
  { label: 'Contacto', path: '/#contacto' },
];

export const QUICK_ACTIONS = {
  portal: '/portal-clientes',
  quote: '/cotizador',
  booking: '/agendar-cita',
} as const;

export const BRAND = BRAND_CONFIG;
