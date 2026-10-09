import { InsuranceService } from '../models/insurance-service.model';

export const INSURANCE_SERVICES_DATA: InsuranceService[] = [
  // SEGUROS PARA EMPRESAS
  {
    id: 'cartas-fianza',
    category: 'empresas',
    icon: 'file-text',
    title: 'Cartas Fianza Express',
    badge: { text: 'Emisión 48h', variant: 'green' },
    description:
      'Fiel Cumplimiento, Adelanto Directo y de Materiales para contratos públicos (OSCE / SEACE) y privados.',
    insurers: ['AVLA', 'Insur', 'Secrex', 'Mapfre'],
    ctaLabel: 'Cotizar Fianza',
    modalConfig: {
      serviceType: 'GARANTÍAS CONTRACTUALES',
      tag: 'SEACE 3.0',
      tipText:
        'Evaluamos tu línea afianzadora con AVLA, Insur y Secrex en menos de 48 horas sin costo alguno.',
      options: [
        'Fiel Cumplimiento (10%)',
        'Adelanto Directo',
        'Adelanto Materiales',
        'Seriedad Oferta',
      ],
    },
  },
  {
    id: 'seguro-credito',
    category: 'empresas',
    icon: 'shield-check',
    title: 'Seguro de Crédito',
    badge: { text: 'Blindaje Financiero', variant: 'sky' },
    description:
      'Protege tus facturas comerciales contra clientes morosos. Recupera hasta el 90% del valor facturado sin riesgo.',
    insurers: ['Insur', 'Solunion / Allianz'],
    ctaLabel: 'Blindar Cartera',
    modalConfig: {
      serviceType: 'PROTECCIÓN DE FACTURAS',
      tag: 'CRÉDITO COMERCIAL',
      tipText:
        'Vende a crédito con la certeza de que tu factura está respaldada ante insolvencia de tus compradores.',
      options: ['Facturas Locales', 'Crédito de Exportación', 'Cartera Global'],
    },
  },
  {
    id: 'planilla-obligatoria',
    category: 'empresas',
    icon: 'users',
    title: 'Planilla Obligatoria',
    badge: { text: 'SUNAFIL Express', variant: 'orange' },
    description:
      'SCTR Salud, SCTR Pensión (Ley 26790) y Seguro Vida Ley con constancias inmediatas para garitas mineras y de obra.',
    insurers: ['Rímac', 'Pacífico', 'Mapfre', 'Protecta', 'La Positiva'],
    ctaLabel: 'Activar SCTR',
    modalConfig: {
      serviceType: 'CUMPLIMIENTO LABORAL',
      tag: 'PASES DE GARITA',
      tipText:
        'Emisión en menos de 2 horas con código de barras digital para ingreso express de tus colaboradores.',
      options: [
        'SCTR Salud y Pensión',
        'Seguro Vida Ley',
        'Pack Integral SCTR + Vida Ley',
      ],
    },
  },
  {
    id: 'polizas-tecnicas',
    category: 'empresas',
    icon: 'hammer',
    title: 'Pólizas Técnicas e Ingeniería',
    badge: { text: 'Obras & Maquinaria', variant: 'sky' },
    description:
      'Pólizas Todo Riesgo Construcción (CAR), Montaje (EAR), Maquinaria (TREC) y Responsabilidad Civil para directores (D&O).',
    insurers: ['Chubb', 'AVLA', 'Pacífico', 'Mapfre'],
    ctaLabel: 'Evaluar Obra',
    modalConfig: {
      serviceType: 'INGENIERÍA Y RIESGOS',
      tag: 'CAR / EAR / TREC',
      tipText:
        'Estructuración técnica rápida para bases de licitación y auditorías de contratistas.',
      options: [
        'Póliza CAR (Construcción)',
        'Póliza EAR (Montaje)',
        'Póliza TREC (Equipos)',
        'Responsabilidad Civil D&O',
      ],
    },
  },

  // SEGUROS PARA PERSONAS & FAMILIAS
  {
    id: 'vida-devolucion',
    category: 'personas',
    icon: 'piggy-bank',
    title: 'Vida con Devolución',
    badge: { text: 'Ahorro Rentable', variant: 'green' },
    description:
      'Sustituto inteligente del desgravamen bancario: traslada el costo del seguro de tu crédito a una póliza con retorno garantizado.',
    insurers: ['Allwest / Ohio National', 'Mapfre', 'Pacífico', 'Rímac'],
    ctaLabel: 'Simular Ahorro',
    modalConfig: {
      serviceType: 'ENDOSO DE DESGRAVAMEN',
      tag: 'AHORRO INTELIGENTE',
      tipText:
        'En vez de perder el dinero del desgravamen con el banco, endosa tu póliza y recupéralo al término del préstamo.',
      options: [
        'Reemplazo Hipotecario',
        'Ahorro a 10 años',
        'Protección Familiar Integral',
      ],
    },
  },
  {
    id: 'salud-eps',
    category: 'personas',
    icon: 'heart-pulse',
    title: 'Salud Privada y EPS',
    badge: { text: 'Clínicas Top', variant: 'sky' },
    description:
      'Atención médica ambulatoria y hospitalaria en clínicas de primer nivel, consultas preventivas y medicinas continuas.',
    insurers: ['Sanitas', 'Pacífico', 'Rímac', 'Mapfre'],
    ctaLabel: 'Cotizar Salud',
    modalConfig: {
      serviceType: 'SALUD PRIVADA',
      tag: 'COBERTURA 100%',
      tipText:
        'Encontramos el plan de salud familiar o EPS que mejor cubra tu red de clínicas preferida.',
      options: ['Plan Individual', 'Plan Familiar', 'Plan EPS Autónomo'],
    },
  },
  {
    id: 'vehicular-soat',
    category: 'personas',
    icon: 'car',
    title: 'Vehicular y SOAT Express',
    badge: { text: 'Auxilio 24/7', variant: 'orange' },
    description:
      'Protección vehicular con auxilio mecánico rápido, chofer de reemplazo y gestión ágil de peritajes y siniestros.',
    insurers: ['Pacífico', 'Mapfre', 'La Positiva', 'Quálitas'],
    ctaLabel: 'Cotizar Auto',
    modalConfig: {
      serviceType: 'PROTECCIÓN VEHICULAR',
      tag: 'SINIESTROS EXPRESS',
      tipText:
        'Asistencia y defensa inmediata ante el procurador de la aseguradora en caso de choque o robo.',
      options: ['Todo Riesgo Particular', 'Pérdida Total Express', 'SOAT Digital'],
    },
  },
  {
    id: 'hogar-viajes',
    category: 'personas',
    icon: 'plane',
    title: 'Hogar Seguro y Asistencia en Viajes',
    badge: { text: 'Cobertura Global', variant: 'sky' },
    description:
      'Protección para tu hogar frente a lluvias e incendios, y asistencia médica internacional válida en todo el mundo.',
    insurers: ['Global Assistant', 'TravelApp', 'Pacífico'],
    ctaLabel: 'Ver Coberturas',
    modalConfig: {
      serviceType: 'ASISTENCIA Y BIENES',
      tag: 'MUNDIAL',
      tipText:
        'Planes de asistencia médica para viajes internacionales sin restricciones consulares ni deducibles.',
      options: [
        'Seguro de Hogar / Inundación',
        'Asistencia Viaje Internacional',
        'Seguro Escolar',
      ],
    },
  },
];

export const INSURERS_PILLS_DATA = [
  { id: 'rimac', name: 'Rímac' },
  { id: 'pacifico', name: 'Pacífico' },
  { id: 'mapfre', name: 'Mapfre' },
  { id: 'la-positiva', name: 'La Positiva' },
  { id: 'sanitas', name: 'Sanitas' },
  { id: 'protecta', name: 'Protecta' },
  { id: 'chubb', name: 'Chubb' },
  { id: 'avla', name: 'AVLA' },
  { id: 'insur', name: 'Insur' },
  { id: 'solunion', name: 'Solunion' },
];

export const LANDING_FAQS_DATA = [
  {
    question:
      '¿Tiene algún costo adicional contratar mis seguros a través de una corredora colegiada?',
    answer:
      'No. La asesoría, comparativa y gestión son 100% gratuitas para el asegurado: la aseguradora reconoce la comisión según ley, sin afectar tu prima. Además, al ser independiente, cotizamos en simultáneo con todas las entidades reguladas por la SBS para darte la mejor alternativa.',
  },
  {
    question:
      '¿En cuánto tiempo obtengo una Carta Fianza o una constancia SCTR urgente?',
    answer:
      'Cartas Fianza en menos de 48 horas y constancias SCTR con código de barras digital en menos de 2 horas, listas para pases de garita mineros, de obra y firmas con el Estado.',
  },
  {
    question:
      '¿Cómo funciona el reemplazo del seguro de desgravamen con una póliza de vida?',
    answer:
      'En lugar de pagar el desgravamen al banco, trasladamos ese costo a una póliza de Vida con Devolución endosada a tu crédito: mantienes la cobertura exigida y al término del préstamo recuperas las primas aportadas como ahorro.',
  },
];
