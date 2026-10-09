export const BRAND_CONFIG = {
  brandName: 'Melanie',
  brandSubtitle: 'Asesoría en Seguros',
  ownerName: 'Melanie Silva Alarcón',
  roleTitle: 'Corredora de Seguros Colegiada SBS',
  licenseId: 'Matrícula J-0941',
  sbsChip: 'SBS: Persona Natural Colegiada',
  supervisionBadge: 'Matrícula SBS J-0941 · Asesora Persona Natural Colegiada',
  quote: 'Mi compromiso no es venderte una póliza, sino defender tus intereses y agilizar tus constancias para que nunca pares operaciones.',
  contact: {
    phone: '+51 987 654 321',
    whatsappNumber: '51987654321', // Placeholder editable: reemplazar con el número oficial de Melanie
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
