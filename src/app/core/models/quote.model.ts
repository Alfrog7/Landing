export type CompanyScale = 'micro' | 'pyme' | 'corporativo';
export type InsuranceType = 'sctr_salud' | 'sctr_pension' | 'sctr_integral' | 'vida_ley';

export const SCALE_LABELS: Record<CompanyScale, string> = {
  micro: 'Microempresa (1-10)',
  pyme: 'PYME (11-50)',
  corporativo: 'Corporativo (50+)',
};

export const INSURANCE_TYPE_LABELS: Record<InsuranceType, string> = {
  sctr_salud: 'SCTR Salud',
  sctr_pension: 'SCTR Pensión',
  sctr_integral: 'SCTR Integral (Salud + Pensión)',
  vida_ley: 'Seguro Vida Ley',
};

export interface QuoteDraft {
  scale: CompanyScale;
  productType: InsuranceType;
  ruc: string;
  businessName: string;
  workersCount: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  urgencyForCheckpoint: boolean;
}
