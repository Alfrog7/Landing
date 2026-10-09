export const BRAND_CONFIG = {
  brandName: 'Melanie Silva',
  roleTitle: 'Corredora de Seguros Colegiada SBS',
  licenseId: 'Matrícula J-0941',
  supervisionBadge: 'Supervisado por la SBS',
  contact: {
    phone: '+51 900 000 000',
    whatsappNumber: '51900000000',
    email: 'contacto@melaniesilva.pe',
    schedule: 'Lunes a Viernes: 8:30 AM - 6:30 PM',
    location: 'Perú',
  },
  assets: {
    logoLight: 'assets/images/brand/logo.svg',
    logoDark: 'assets/images/brand/logo-dark.svg',
    advisorPhoto: 'assets/images/advisor/profile.svg',
  },
  insurers: [
    { id: 'rimac', name: 'Rímac Seguros', logo: 'assets/images/insurers/rimac.svg' },
    { id: 'pacifico', name: 'Pacífico Seguros', logo: 'assets/images/insurers/pacifico.svg' },
    { id: 'mapfre', name: 'Mapfre', logo: 'assets/images/insurers/mapfre.svg' },
    { id: 'positiva', name: 'La Positiva', logo: 'assets/images/insurers/positiva.svg' },
  ],
} as const;
