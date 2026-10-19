export type AudienceCategory = 'empresas' | 'personas';

export interface ServiceSpecs {
  coberturas: string[];
  requisitos: string[];
  tiempoEmision: string;
  entidadesNormativas?: string;
}

// Campo del formulario corto de cotización por seguro (feedback §4)
export interface QuoteFormField {
  key: string; // etiqueta i18n: fields.<key> · opciones select: fields.<key>Options
  type?: 'text' | 'select';
}

export interface ServiceDetail {
  id: string;
  category: AudienceCategory;
  title: string;
  tag: string;
  badgeTime: string;
  summary: string;
  image: string;
  specs: ServiceSpecs;
  mepoTip: string;
  // Presencia de Mepo en la ficha: solo ambientes personales/cálidos (feedback §3/§4)
  mepo: boolean;
}

