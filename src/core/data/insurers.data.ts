import type { InsurerInfo } from '../../core/models/insurer.model';
import { BRAND_CONFIG } from '../../core/config/brand.config';

const insurerDetails: Record<string, { phone: string }> = {
  rimac: { phone: '(01) 421-7755' },
  pacifico: { phone: '(01) 203-5040' },
  mapfre: { phone: '(01) 616-1616' },
  positiva: { phone: '(01) 619-4700' },
};

export const INSURERS: InsurerInfo[] = BRAND_CONFIG.insurers.map((insurer) => ({
  id: insurer.id,
  name: insurer.name,
  logo: insurer.logo,
  supportPhone: insurerDetails[insurer.id]?.phone ?? BRAND_CONFIG.contact.phone,
}));
