export type AudienceCategory = 'empresas' | 'personas';

export interface InsuranceServiceBadge {
  text: string;
  variant: 'green' | 'sky' | 'orange';
}

export interface InsuranceServiceModalConfig {
  serviceType: string;
  tag: string;
  tipText: string;
  options: string[];
}

export interface InsuranceService {
  id: string;
  category: AudienceCategory;
  icon: string;
  title: string;
  badge: InsuranceServiceBadge;
  description: string;
  insurers: string[];
  ctaLabel: string;
  modalConfig: InsuranceServiceModalConfig;
}

export interface InsurerPill {
  id: string;
  name: string;
}
