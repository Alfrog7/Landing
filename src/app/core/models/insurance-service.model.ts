export type AudienceCategory = 'empresas' | 'personas';
export type CoverageAvailability = boolean | 'consultar';

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
  insurers: string[];
  specs: ServiceSpecs;
  meipoTip: string;
}

export interface InsurerCoverageRow {
  serviceName: string;
  rimac: CoverageAvailability;
  pacifico: CoverageAvailability;
  mapfre: CoverageAvailability;
  positiva: CoverageAvailability;
  insurAvla: CoverageAvailability;
  chubb: CoverageAvailability;
}
