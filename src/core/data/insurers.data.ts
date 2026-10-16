import type { InsurerInfo } from '../../core/models/insurer.model';
import { BRAND_CONFIG } from '../../core/config/brand.config';

const insurerDetails: Record<string, { minutes: number; phone: string }> = {
  rimac: { minutes: 35, phone: '(01) 421-7755' },
  pacifico: { minutes: 40, phone: '(01) 203-5040' },
  mapfre: { minutes: 48, phone: '(01) 616-1616' },
  positiva: { minutes: 55, phone: '(01) 619-4700' },
};

export const INSURERS: InsurerInfo[] = BRAND_CONFIG.insurers.map((insurer) => ({
  id: insurer.id,
  name: insurer.name,
  logo: insurer.logo,
  averageEmissionTimeMinutes: insurerDetails[insurer.id]?.minutes ?? 45,
  supportPhone: insurerDetails[insurer.id]?.phone ?? BRAND_CONFIG.contact.phone,
}));
