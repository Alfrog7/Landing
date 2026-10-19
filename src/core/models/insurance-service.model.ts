export type AudienceCategory = 'empresas' | 'personas';

export interface ServiceSpecs {
  coberturas: string[];
  requisitos: string[];
  tiempoEmision: string;
  entidadesNormativas?: string;
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
}

