import { InsurerCoverageRow, ServiceDetail } from '../models/insurance-service.model';

export const SERVICES_CATALOG_DATA: ServiceDetail[] = [
  // SEGUROS PARA EMPRESAS
  {
    id: 'cartas-fianza',
    category: 'empresas',
    title: 'Cartas Fianza Express',
    tag: 'Garantías Contractuales',
    badgeTime: 'Emisión 48h',
    summary:
      'Fiel Cumplimiento, Adelanto Directo y Materiales para licitaciones públicas y obras privadas.',
    image: 'assets/images/services/fianzas-obras.svg',
    insurers: ['AVLA', 'Insur', 'Secrex', 'Mapfre'],
    specs: {
      coberturas: [
        'Fiel Cumplimiento de Contrato (10% del monto adjudicado)',
        'Adelanto Directo de Efectivo para inicio de obra',
        'Adelanto para Adquisición de Materiales e Insumos',
        'Garantía de Seriedad de Oferta',
      ],
      requisitos: [
        'RUC de la empresa adjudicada',
        'Bases integradas o contrato firmado',
        'Estados financieros de los dos últimos ejercicios contables',
      ],
      tiempoEmision: 'Máximo 48 horas tras aprobación de línea afianzadora',
      entidadesNormativas: 'Válidas para OSCE, SEACE y Contratos Privados',
    },
    meipoTip:
      'Evaluamos tu línea de fianza con AVLA, Insur y Secrex en simultáneo para conseguirte la tasa de prima más baja sin costo de gestión.',
  },
  {
    id: 'seguro-credito',
    category: 'empresas',
    title: 'Seguro de Crédito',
    tag: 'Protección Financiera',
    badgeTime: 'Recupero 90%',
    summary:
      'Asegura tus cuentas por cobrar comerciales contra morosidad prolongada o quiebra de clientes.',
    image: 'assets/images/services/seguro-credito.svg',
    insurers: ['Insur', 'Solunion / Allianz'],
    specs: {
      coberturas: [
        'Indemnización de hasta el 90% del valor de la factura impaga',
        'Monitoreo y calificación continua de la solvencia de tus compradores',
        'Gestión de cobranza judicial y extrajudicial internacional',
      ],
      requisitos: [
        'Facturación comercial anual mínima requerida',
        'Relación de principales clientes con líneas de crédito abiertas',
      ],
      tiempoEmision: 'Evaluación de cartera en 3 a 5 días hábiles',
    },
    meipoTip:
      'Vende al crédito a 30, 60 o 90 días con total tranquilidad: si tu comprador quiebra o no paga, recuperas tu capital asegurado.',
  },
  {
    id: 'sctr-vida-ley',
    category: 'empresas',
    title: 'Planilla Obligatoria (SCTR & Vida Ley)',
    tag: 'Cumplimiento SUNAFIL',
    badgeTime: 'Pase < 2h',
    summary:
      'SCTR Salud, SCTR Pensión y Seguro Vida Ley con constancias inmediatas para acceso a garita.',
    image: 'assets/images/services/sctr-mineria.svg',
    insurers: ['Rímac', 'Pacífico', 'Mapfre', 'Protecta', 'La Positiva'],
    specs: {
      coberturas: [
        'SCTR Salud: Cobertura médica y hospitalaria integral al 100%',
        'SCTR Pensión: Pensiones de invalidez y sobrevivencia por accidentes de trabajo',
        'Vida Ley: Indemnización por muerte natural (16 rem.) e invalidez permanente (32 rem.)',
      ],
      requisitos: [
        'T-Registro de colaboradores en nómina',
        'Planilla mensual en formato Excel con actividades declaradas',
      ],
      tiempoEmision: 'Emisión express en menos de 2 horas con código digital',
    },
    meipoTip:
      '¿Tienes una emergencia de ingreso a mina u obra? Emitimos la constancia provisional validada para que tu personal entre a tiempo.',
  },
  {
    id: 'polizas-ingenieria',
    category: 'empresas',
    title: 'Pólizas de Ingeniería & RC',
    tag: 'Obras & Infraestructura',
    badgeTime: 'Todo Riesgo',
    summary:
      'Seguros CAR, EAR, TREC y Responsabilidad Civil para directores (D&O) y obras civiles.',
    image: 'assets/images/services/ingenieria-car.svg',
    insurers: ['Chubb', 'AVLA', 'Pacífico', 'Mapfre'],
    specs: {
      coberturas: [
        'Póliza CAR: Daños materiales a la obra civil durante la construcción',
        'Póliza EAR: Montaje y prueba de maquinaria pesada o industrial',
        'Póliza TREC: Daños accidentales o volcadura de maquinaria en campo',
        'Responsabilidad Civil extracontractual frente a terceros y predios colindantes',
      ],
      requisitos: ['Memoria descriptiva y presupuesto de obra', 'Cronograma de ejecución valorizado'],
      tiempoEmision: 'Estructuración técnica en 48 a 72 horas',
    },
    meipoTip:
      'Revisamos las cláusulas exigidas en el contrato de tu mandante para blindar exactamente lo que piden, sin sobrecostos innecesarios.',
  },

  // SEGUROS PARA PERSONAS & FAMILIAS
  {
    id: 'vida-devolucion',
    category: 'personas',
    title: 'Vida con Devolución',
    tag: 'Ahorro Inteligente',
    badgeTime: 'Retorno 100%+',
    summary:
      'Reemplaza el seguro de desgravamen bancario por una póliza que te devuelve el dinero con rentabilidad.',
    image: 'assets/images/services/vida-ahorro.svg',
    insurers: ['Allwest / Ohio National', 'Mapfre', 'Pacífico', 'Rímac'],
    specs: {
      coberturas: [
        'Fondo de ahorro acumulado con rentabilidad garantizada',
        'Indemnización a beneficiarios ante fallecimiento',
        'Póliza totalmente endosable ante entidades bancarias para hipotecas',
      ],
      requisitos: [
        'DNI del asegurado titular',
        'Cronograma o saldo actual del crédito hipotecario/vehicular',
      ],
      tiempoEmision: 'Emisión e informe de endoso bancario en 5 días',
    },
    meipoTip:
      'No regales el desgravamen al banco. Al endosar esta póliza, todo el monto mensual se acumula a tu favor y lo cobras al vencer el plazo.',
  },
  {
    id: 'salud-eps',
    category: 'personas',
    title: 'Salud Integral & EPS',
    tag: 'Medicina Privada',
    badgeTime: 'Clínicas Top',
    summary:
      'Atención ambulatoria, cirugías y hospitalización en clínicas privadas de primer nivel nacional.',
    image: 'assets/images/services/salud-clinica.svg',
    insurers: ['Sanitas', 'Pacífico', 'Rímac', 'Mapfre'],
    specs: {
      coberturas: [
        'Atención médica ambulatoria al 85% - 100% en red clínica',
        'Emergencias médicas accidentales cubiertas al 100%',
        'Cobertura de maternidad, odontología y chequeos preventivos anuales',
      ],
      requisitos: [
        'DNI de titulares y dependientes',
        'Declaración jurada de salud sin preexistencias no declaradas',
      ],
      tiempoEmision: 'Activación en 24 a 48 horas',
    },
    meipoTip:
      'Te ayudamos a comparar copagos y deducibles entre Sanitas, Pacífico y Rímac para elegir la red de clínicas más conveniente.',
  },
];

export const INSURERS_MATRIX_DATA: InsurerCoverageRow[] = [
  {
    serviceName: 'Cartas Fianza (Licitaciones OSCE)',
    rimac: 'consultar',
    pacifico: false,
    mapfre: true,
    positiva: false,
    insurAvla: true,
    chubb: false,
  },
  {
    serviceName: 'Seguro de Crédito (Facturas B2B)',
    rimac: false,
    pacifico: false,
    mapfre: false,
    positiva: false,
    insurAvla: true,
    chubb: false,
  },
  {
    serviceName: 'SCTR Salud y Pensión',
    rimac: true,
    pacifico: true,
    mapfre: true,
    positiva: true,
    insurAvla: false,
    chubb: false,
  },
  {
    serviceName: 'Seguro Vida Ley',
    rimac: true,
    pacifico: true,
    mapfre: true,
    positiva: true,
    insurAvla: false,
    chubb: false,
  },
  {
    serviceName: 'Pólizas de Ingeniería (CAR / EAR)',
    rimac: true,
    pacifico: true,
    mapfre: true,
    positiva: 'consultar',
    insurAvla: true,
    chubb: true,
  },
  {
    serviceName: 'Responsabilidad Civil D&O',
    rimac: true,
    pacifico: true,
    mapfre: true,
    positiva: false,
    insurAvla: false,
    chubb: true,
  },
  {
    serviceName: 'Vida con Devolución (Desgravamen)',
    rimac: true,
    pacifico: true,
    mapfre: true,
    positiva: true,
    insurAvla: false,
    chubb: false,
  },
  {
    serviceName: 'Salud Individual y EPS',
    rimac: true,
    pacifico: true,
    mapfre: true,
    positiva: true,
    insurAvla: false,
    chubb: false,
  },
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
