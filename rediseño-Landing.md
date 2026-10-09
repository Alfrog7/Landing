# rediseño-Landing.md
# ESPECIFICACIÓN TÉCNICA Y GUÍA DE REDISEÑO: PORTAL MELANIE SEGUROS

## 1. RESUMEN DE NEGOCIO, FILOSOFÍA Y DIRECTRICES SBS
- **Titular Oficial:** Melanie Silva Alarcón · Corredora de Seguros Colegiada SBS (Matrícula J-0941).
- **Cumplimiento SBS Estricto:** La SBS prohíbe taxativamente que corredores registrados como Persona Natural operen bajo nombres de empresas o personas jurídicas ficticias. Toda la identidad visual y legal debe presentarse a título personal (*Melanie Silva / Melanie · Asesoría en Seguros*).
- **Filosofía UX (Anti-Estrés / Cero Fatiga Cognitiva):** Inspirada en la experiencia de *Compare the Market*. Se descarta la estética de web bancaria tradicional densa, fría y cargada de decretos legales intimidantes. La interfaz transmite calma, orden, ligereza y cercanía.
- **Mascota de Marca ("Meipo"):** Un koala asesor carismático con gafas y tableta digital que acompaña al usuario con micro-consejos y tips explicativos en lenguaje sencillo, humanizando el proceso de aseguramiento.

---

## 2. DEPENDENCIAS Y LIBRERÍAS EXTERNAS: JUSTIFICACIÓN Y USO

Para asegurar un desarrollo limpio, accesible y sin recrear componentes complejos desde cero, se utilizan las siguientes dependencias:

### 2.1. Iconografía: `lucide-react`
* **Por qué se usa:** Proporciona un set completo de iconos vectoriales consistentes, ligeros y con trazos configurables (`stroke-width`), evitando cargar fuentes pesadas o imágenes estáticas.
* **Instalación:**
  ```bash
  npm install lucide-react
Cómo se usa: Se importan los iconos específicos (ShieldCheck, Plus, Check, CheckCircle2, Clock, FileText, Calendar, ArrowRight, Phone, User) con tamaños y colores dinámicos vía clases de Tailwind CSS:

TypeScript
import { ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';
<ShieldCheck className="w-6 h-6 text-emerald-500"/>
2.2. Carrusel Horizontal ("Efecto Gusanito"): embla-carousel-react
Por qué se usa: Melanie requiere que las tarjetas de soluciones se deslicen de manera fluida y táctil horizontalmente, sin romper la retícula ni saturar la pantalla. Embla Carousel es una librería ultraligera (menos de 7 KB), sin dependencias CSS pesadas, que ofrece arrastre nativo con mouse/touch, soporte de snap points y paginación por puntos (dots).

Instalación:

Bash
npm install embla-carousel-react

Cómo se usa: Se inicializa el hook useEmblaCarousel con opciones de alineación y scroll arrastrable:

TypeScript
import useEmblaCarousel from 'embla-carousel-react';
const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: false });
// El contenedor debe tener la directiva `ref={emblaRef}` y la clase `overflow-hidden`.
2.3. Primitivos Accesibles de UI: @radix-ui/react-dialog
Por qué se usa: El modal interactivo de ficha técnica y cotización debe cumplir con accesibilidad web (WCAG): bloqueo de scroll de fondo, gestión del foco (focus trapping), cierre con tecla Escape y compatibilidad con lectores de pantalla sin imponer estilos visuales rígidos.

Instalación:

Bash
npm install @radix-ui/react-dialog
Cómo se usa: Envuelve el modal con Dialog.Root, Dialog.Trigger, Dialog.Portal, Dialog.Overlay y Dialog.Content, aplicando estilos directos mediante Tailwind.

2.4. Microinteracciones Fluidas: framer-motion
Por qué se usa: Permite alternar suavemente entre las pestañas [Empresas] y [Personas], desplegar el modal sin saltos visuales y brindar animaciones sutiles a la mascota Meipo y a los acordeones.

Instalación:

Bash
npm install framer-motion

Cómo se usa: Para componentes que cambian condicionalmente o modales flotantes:

TypeScript
import { motion, AnimatePresence } from 'framer-motion';
<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} />
3. SISTEMA DE DISEÑO Y DESIGN TOKENS (TAILWIND CSS)
3.1. Justificación de la Paleta Cromática
Blanco puro (#FFFFFF) y Gris Neutro Claro (#F8FAFC): Base dominante (85% de la interfaz). Elimina la sensación de pesadez corporativa y le da respiración al contenido.

Verde Esmeralda / WhatsApp (#10B981 y #059669): Color primario de acción y CTA. Transmite tranquilidad, aprobación financiera y conexión inmediata con soporte directo.

Azul Cielo Suave (#0EA5E9): Reemplaza a los azules marinos densos. Aporta serenidad en chips, badges informativos e iconos técnicos.

Gris Grafito Oscuro (#0F172A): Garantiza contraste tipográfico sin la agresividad del negro puro.

Azul Noche Institucional (#0B132B): Exclusivo para el bloque de cierre y pie de página (Footer), generando balance y formalidad legal.

3.2. Configuración en tailwind.config.js
JavaScript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#10B981',
          'green-dark': '#059669',
          'green-light': '#ECFDF5',
          sky: '#0EA5E9',
          'sky-light': '#F0F9FF',
          dark: '#0F172A',
          muted: '#64748B',
          surface: '#F8FAFC',
          border: '#E2E8F0',
          footer: '#0B132B'
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full-pill': '9999px'
      },
      boxShadow: {
        'floating-nav': '0 12px 30px -10px rgba(0, 0, 0, 0.08)',
        'card-catalog': '0 8px 24px -4px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 18px 36px -8px rgba(15, 23, 42, 0.12)',
        'modal-split': '0 25px 60px -15px rgba(15, 23, 42, 0.25)',
        'soft': '0 10px 30px -5px rgba(15, 23, 42, 0.04)'
      }
    }
  },
  plugins: []
};

4. ESTRUCTURA DE ARCHIVOS MODULAR
Plaintext
src/
├── assets/
│   ├── images/
│   │   ├── melanie-profile.webp
│   │   ├── meipo-koala.webp
│   │   └── services/
│   │       ├── fianzas-obras.webp
│   │       ├── seguro-credito.webp
│   │       ├── sctr-mineria.webp
│   │       ├── ingenieria-car.webp
│   │       ├── vida-ahorro.webp
│   │       └── salud-clinica.webp
│   └── icons/
├── components/
│   ├── common/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppFloat.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── AudienceTabs.tsx
│   │   ├── SolutionsCarousel.tsx
│   │   ├── SolutionCard.tsx
│   │   ├── InsurersCoverageTable.tsx
│   │   ├── WhyMelanieSection.tsx
│   │   ├── FastContactCta.tsx
│   │   └── FaqAccordion.tsx
│   ├── modals/
│   │   └── ServiceDetailModal.tsx
│   └── scheduler/
│       ├── AppointmentScheduler.tsx
│       └── DayTimePicker.tsx
├── data/
│   ├── servicesData.ts
│   └── faqsData.ts
├── types/
│   └── index.ts
└── utils/
    └── whatsapp.ts
5. MODELOS DE DATOS TYPESCRIPT (src/types/index.ts)
TypeScript
export type AudienceCategory = 'empresas' | 'personas';

export interface ServiceDetail {
  id: string;
  category: AudienceCategory;
  title: string;
  tag: string;
  badgeTime: string;
  summary: string;
  image: string;
  insurers: string[];
  specs: {
    coberturas: string[];
    requisitos: string[];
    tiempoEmision: string;
    entidadesNormativas?: string;
  };
  meipoTip: string;
}

export interface InsurerCoverageRow {
  serviceName: string;
  rimac: boolean | 'consultar';
  pacifico: boolean | 'consultar';
  mapfre: boolean | 'consultar';
  positiva: boolean | 'consultar';
  insurAvla: boolean | 'consultar';
  chubb: boolean | 'consultar';
}

export interface BookingFormData {
  date: string;
  timeSlot: string;
  fullName: string;
  companyOrRuc?: string;
  whatsapp: string;
  serviceTopic: string;
}
6. DATA DE SERVICIOS Y MATRIZ MULTIASEGURADORA (src/data/servicesData.ts)
TypeScript
import { ServiceDetail, InsurerCoverageRow } from '../types';

export const servicesCatalog: ServiceDetail[] = [
  // SEGUROS PARA EMPRESAS
  {
    id: 'cartas-fianza',
    category: 'empresas',
    title: 'Cartas Fianza Express',
    tag: 'Garantías Contractuales',
    badgeTime: 'Emisión 48h',
    summary: 'Fiel Cumplimiento, Adelanto Directo y Materiales para licitaciones públicas y obras privadas.',
    image: '/assets/images/services/fianzas-obras.webp',
    insurers: ['AVLA', 'Insur', 'Secrex', 'Mapfre'],
    specs: {
      coberturas: [
        'Fiel Cumplimiento de Contrato (10% del monto adjudicado)',
        'Adelanto Directo de Efectivo para inicio de obra',
        'Adelanto para Adquisición de Materiales e Insumos',
        'Garantía de Seriedad de Oferta'
      ],
      requisitos: [
        'RUC de la empresa adjudicada',
        'Bases integradas o contrato firmado',
        'Estados financieros de los dos últimos ejercicios contables'
      ],
      tiempoEmision: 'Máximo 48 horas tras aprobación de línea afianzadora',
      entidadesNormativas: 'Válidas para OSCE, SEACE y Contratos Privados'
    },
    meipoTip: 'Evaluamos tu línea de fianza con AVLA, Insur y Secrex en simultáneo para conseguirte la tasa de prima más baja sin costo de gestión.'
  },
  {
    id: 'seguro-credito',
    category: 'empresas',
    title: 'Seguro de Crédito',
    tag: 'Protección Financiera',
    badgeTime: 'Recupero 90%',
    summary: 'Asegura tus cuentas por cobrar comerciales contra morosidad prolongada o quiebra de clientes.',
    image: '/assets/images/services/seguro-credito.webp',
    insurers: ['Insur', 'Solunion / Allianz'],
    specs: {
      coberturas: [
        'Indemnización de hasta el 90% del valor de la factura impaga',
        'Monitoreo y calificación continua de la solvencia de tus compradores',
        'Gestión de cobranza judicial y extrajudicial internacional'
      ],
      requisitos: [
        'Facturación comercial anual mínima requerida',
        'Relación de principales clientes con líneas de crédito abiertas'
      ],
      tiempoEmision: 'Evaluación de cartera en 3 a 5 días hábiles'
    },
    meipoTip: 'Vende al crédito a 30, 60 o 90 días con total tranquilidad: si tu comprador quiebra o no paga, recuperas tu capital asegurado.'
  },
  {
    id: 'sctr-vida-ley',
    category: 'empresas',
    title: 'Planilla Obligatoria (SCTR & Vida Ley)',
    tag: 'Cumplimiento SUNAFIL',
    badgeTime: 'Pase < 2h',
    summary: 'SCTR Salud, SCTR Pensión y Seguro Vida Ley con constancias inmediatas para acceso a garita.',
    image: '/assets/images/services/sctr-mineria.webp',
    insurers: ['Rímac', 'Pacífico', 'Mapfre', 'Protecta', 'La Positiva'],
    specs: {
      coberturas: [
        'SCTR Salud: Cobertura médica y hospitalaria integral al 100%',
        'SCTR Pensión: Pensiones de invalidez y sobrevivencia por accidentes de trabajo',
        'Vida Ley: Indemnización por muerte natural (16 rem.) e invalidez permanente (32 rem.)'
      ],
      requisitos: [
        'T-Registro de colaboradores en nómina',
        'Planilla mensual en formato Excel con actividades declaradas'
      ],
      tiempoEmision: 'Emisión express en menos de 2 horas con código digital'
    },
    meipoTip: '¿Tienes una emergencia de ingreso a mina u obra? Emitimos la constancia provisional validada para que tu personal entre a tiempo.'
  },
  {
    id: 'polizas-ingenieria',
    category: 'empresas',
    title: 'Pólizas de Ingeniería & RC',
    tag: 'Obras & Infraestructura',
    badgeTime: 'Todo Riesgo',
    summary: 'Seguros CAR, EAR, TREC y Responsabilidad Civil para directores (D&O) y obras civiles.',
    image: '/assets/images/services/ingenieria-car.webp',
    insurers: ['Chubb', 'AVLA', 'Pacífico', 'Mapfre'],
    specs: {
      coberturas: [
        'Póliza CAR: Daños materiales a la obra civil durante la construcción',
        'Póliza EAR: Montaje y prueba de maquinaria pesada o industrial',
        'Póliza TREC: Daños accidentales o volcadura de maquinaria en campo',
        'Responsabilidad Civil extracontractual frente a terceros y predios colindantes'
      ],
      requisitos: [
        'Memoria descriptiva y presupuesto de obra',
        'Cronograma de ejecución valorizado'
      ],
      tiempoEmision: 'Estructuración técnica en 48 a 72 horas'
    },
    meipoTip: 'Revisamos las cláusulas exigidas en el contrato de tu mandante para blindar exactamente lo que piden, sin sobrecostos innecesarios.'
  },

  // SEGUROS PARA PERSONAS & FAMILIAS
  {
    id: 'vida-devolucion',
    category: 'personas',
    title: 'Vida con Devolución',
    tag: 'Ahorro Inteligente',
    badgeTime: 'Retorno 100%+',
    summary: 'Reemplaza el seguro de desgravamen bancario por una póliza que te devuelve el dinero con rentabilidad.',
    image: '/assets/images/services/vida-ahorro.webp',
    insurers: ['Allwest / Ohio National', 'Mapfre', 'Pacífico', 'Rímac'],
    specs: {
      coberturas: [
        'Fondo de ahorro acumulado con rentabilidad garantizada',
        'Indemnización a beneficiarios ante fallecimiento',
        'Póliza totalmente endosable ante entidades bancarias para hipotecas'
      ],
      requisitos: [
        'DNI del asegurado titular',
        'Cronograma o saldo actual del crédito hipotecario/vehicular'
      ],
      tiempoEmision: 'Emisión e informe de endoso bancario en 5 días'
    },
    meipoTip: 'No regales el desgravamen al banco. Al endosar esta póliza, todo el monto mensual se acumula a tu favor y lo cobras al vencer el plazo.'
  },
  {
    id: 'salud-eps',
    category: 'personas',
    title: 'Salud Integral & EPS',
    tag: 'Medicina Privada',
    badgeTime: 'Clínicas Top',
    summary: 'Atención ambulatoria, cirugías y hospitalización en clínicas privadas de primer nivel nacional.',
    image: '/assets/images/services/salud-clinica.webp',
    insurers: ['Sanitas', 'Pacífico', 'Rímac', 'Mapfre'],
    specs: {
      coberturas: [
        'Atención médica ambulatoria al 85% - 100% en red clínica',
        'Emergencias médicas accidentales cubiertas al 100%',
        'Cobertura de maternidad, odontología y chequeos preventivos anuales'
      ],
      requisitos: [
        'DNI de titulares y dependientes',
        'Declaración jurada de salud sin preexistencias no declaradas'
      ],
      tiempoEmision: 'Activación en 24 a 48 horas'
    },
    meipoTip: 'Te ayudamos a comparar copagos y deducibles entre Sanitas, Pacífico y Rímac para elegir la red de clínicas más conveniente.'
  }
];

export const insurersMatrixData: InsurerCoverageRow[] = [
  { serviceName: 'Cartas Fianza (Licitaciones OSCE)', rimac: 'consultar', pacifico: false, mapfre: true, positiva: false, insurAvla: true, chubb: false },
  { serviceName: 'Seguro de Crédito (Facturas B2B)', rimac: false, pacifico: false, mapfre: false, positiva: false, insurAvla: true, chubb: false },
  { serviceName: 'SCTR Salud y Pensión', rimac: true, pacifico: true, mapfre: true, positiva: true, insurAvla: false, chubb: false },
  { serviceName: 'Seguro Vida Ley', rimac: true, pacifico: true, mapfre: true, positiva: true, insurAvla: false, chubb: false },
  { serviceName: 'Pólizas de Ingeniería (CAR / EAR)', rimac: true, pacifico: true, mapfre: true, positiva: 'consultar', insurAvla: true, chubb: true },
  { serviceName: 'Responsabilidad Civil D&O', rimac: true, pacifico: true, mapfre: true, positiva: false, insurAvla: false, chubb: true },
  { serviceName: 'Vida con Devolución (Desgravamen)', rimac: true, pacifico: true, mapfre: true, positiva: true, insurAvla: false, chubb: false },
  { serviceName: 'Salud Individual y EPS', rimac: true, pacifico: true, mapfre: true, positiva: true, insurAvla: false, chubb: false }

];

7. ESPECIFICACIÓN DETALLADA DE COMPONENTES DE UI
7.1. Navbar Flotante Tipo Cápsula (Navbar.tsx)
Comportamiento: Barra flotante tipo cápsula (floating pill glassmorphism), anclada de forma fija en la parte superior:
fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50.

Estilos: bg-white/90 backdrop-blur-md border border-brand-border/80 shadow-floating-nav rounded-full px-6 py-3 flex items-center justify-between.

Identidad Izquierda:

Logo textual: "Melanie" (text-lg font-bold text-brand-dark) + subtítulo tipográfico "Asesoría en Seguros".

Chip regulatorio SBS: bg-brand-surface border border-brand-border px-3 py-1 rounded-full text-xs text-brand-muted hidden md:flex items-center gap-1.5. Texto: "SBS: Matrícula J-0941".

Enlaces Centrales: "Soluciones", "¿Por qué Melanie?", "Aseguradoras", "Preguntas" con scroll suave.

Acciones Derecha:

Enlace secundario: "Agendar Cita (15 min)" (scroll hacia la sección del calendario).

Botón primario verde: bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-all. Icono de WhatsApp + texto "Conversar por WhatsApp".

7.2. Hero Section (HeroSection.tsx)
Disposición: Layout en 2 columnas con amplio espaciado vertical (pt-28 pb-16).

Columna Izquierda:

Badge superior: bg-brand-green-light text-brand-green-dark font-medium text-xs px-3.5 py-1.5 rounded-full inline-block mb-4. Texto: "Matrícula SBS J-0941 · Asesora Persona Natural Colegiada".

H1: "Cuidar de tu empresa y de los tuyos puede ser así de simple."

Párrafo de apoyo: "Compara y gestiona tus coberturas con más de 15 años de experiencia técnica colegiada, sin burocracia y con trato directo."

Audience Switcher (Tabs Pestaña): Selector horizontal estilo cápsula:
[ 🏢 Seguros para Empresas ] | [ 👥 Seguros para Personas & Familias ]
Controla el estado activeTab para cambiar el conjunto de tarjetas del carrusel.

Botones CTA:

Botón primario: "Cotizar con Melanie" (verde con flecha).

Botón secundario suave: "Ver cómo funciona ↓".

Micro-beneficios con check: "✓ Sin costos ocultos" · "✓ Emisión express" · "✓ Respaldo SBS Oficial".

Columna Derecha:

Ilustración destacada de Meipo (koala 3D con chaleco verde, anteojos y tableta).

Globo de diálogo interactivo: "¡Hola! Soy Meipo. Te ayudo a encontrar tu póliza perfecta en minutos 🐨".

Badges flotantes interactivos:

"Respuesta inmediata < 24h garantizada"

"Ahorro hasta el 25% en comparativa neutral"

7.3. Cards de Servicios Estilo Catálogo Visual (SolutionCard.tsx y SolutionsCarousel.tsx)
Estructura del Carrusel ("Tipo Gusanito"):

Montado con embla-carousel-react.

Contenedor externo con flechas laterales < y > y tres puntos animados (dots) de paginación.

Carril interno (flex gap-6 select-none): Cada tarjeta tiene un ancho fijo (min-w-[290px] md:min-w-[320px] max-w-[320px]).

Efecto Peek: La siguiente tarjeta asoma en el borde derecho para indicar scroll horizontal continuo.

Detalle de la Tarjeta:

Contenedor: relative h-[380px] w-[300px] md:w-[320px] rounded-3xl overflow-hidden shadow-card-catalog flex flex-col justify-end p-5 select-none transition-all duration-300 hover:-translate-y-1.

Imagen de fondo inmersiva: absolute inset-0 w-full h-full object-cover.

Capa de gradiente oscuro: absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/50 to-transparent.

Botón de Inspección Rápida (+):

Esquina superior derecha: absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-brand-dark backdrop-blur-md flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer.

Icono Plus de lucide-react. Al hacer clic abre el modal ServiceDetailModal con los datos del servicio.

Información Inferior sobre la Tarjeta:

Badge superior: bg-brand-green/90 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 self-start backdrop-blur-sm.

Título H3 en blanco: text-xl font-bold text-white mb-1.

Resumen breve: text-slate-200 text-xs line-clamp-2 mb-3.

Píldoras de aseguradoras asociadas: bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-md.

Botón de acción: w-full py-2.5 bg-white/95 hover:bg-white text-brand-dark rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5. Texto: "Ver Ficha y Cotizar →".

7.4. Matriz Multiaseguradora: Comparativa por Entidad (InsurersCoverageTable.tsx)
Reemplaza las píldoras aisladas por una tabla estructurada de disponibilidad:

Cabecera:

Título: "Matriz Multiaseguradora: Cobertura por Entidad".

Subtítulo: "Melanie cotiza en simultáneo para encontrar la tasa más competitiva del mercado según el tipo de riesgo."

Badge de neutralidad: text-xs text-brand-dark bg-brand-surface border border-brand-border rounded-full px-4 py-1.5 inline-flex items-center gap-2 mb-6. Texto: "🛡️ 100% independiente: asesoría personalizada y gratuita para el asegurado".

Tabla Responsiva:

Columnas: [ Servicio / Póliza ] | [ Rímac ] | [ Pacífico ] | [ Mapfre ] | [ La Positiva ] | [ AVLA / Insur ] | [ Chubb ].

Filas: Recorre insurersMatrixData mostrando un icono CheckCircle2 verde para cobertura disponible, un guión gris para cobertura no aplicable y un chip "Consultar" para coberturas sujetas a evaluación especial.

7.5. Sección "¿Por qué asesorarte con Melanie Silva?" (WhyMelanieSection.tsx)
Disposición en 2 columnas:

Columna Izquierda (Tarjeta de Perfil Oficial):

Fotografía profesional y cercana de Melanie Silva.

Nombre: "Melanie Silva Alarcón".

Cargo: "Corredora de Seguros Colegiada SBS · Matrícula J-0941".

Trayectoria: "15+ Años de Experiencia Colegiada".

Cita textual entrecomillada: "Mi compromiso no es venderte una póliza, sino defender tus intereses y agilizar tus constancias para que nunca pares operaciones."

Columna Derecha (3 Bloques de Valor):

Trato 100% directo y humano: Hablas directamente con Melanie por WhatsApp o llamada, sin bots impersonales ni conmutadores telefónicos ante urgencias.

Emisión express de constancias y cartas fianza: Entrega en menos de 2 horas para garitas mineras, pases de contratistas y firmas con el Estado.

Respaldo colegiado regulado ante la SBS: Asesoría técnica sin costo para el cliente; las aseguradoras reconocen la comisión según ley, garantizando imparcialidad.

7.6. Modal Split-View: Ficha Técnica y Cotización (ServiceDetailModal.tsx)
Implementado con @radix-ui/react-dialog. Despliega una ventana dividida en dos columnas:

Contenedor Principal: w-[94%] max-w-4xl bg-white rounded-3xl overflow-hidden shadow-modal-split grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto.

Columna Izquierda (45% - Visual e Identidad): md:col-span-5 relative bg-brand-dark p-6 flex flex-col justify-between text-white.

Foto contextual temática del servicio con opacidad suave.

Tag de categoría + tiempo de emisión en píldora brillante.

Tip de Meipo: Tarjeta inferior con borde translúcido (bg-brand-dark/80 backdrop-blur-md border border-white/20 p-4 rounded-2xl). Contiene avatar de Meipo y recomendación técnica del servicio.

Columna Derecha (55% - Ficha Técnica y Acción): md:col-span-7 p-6 md:p-8 flex flex-col justify-between bg-white.

Botón de cierre (X) en la esquina superior.

Título H2 del servicio + detalle regulatorio.

Bloque 1 (Coberturas): Lista con viñetas de icono verde CheckCircle2.

Bloque 2 (Requisitos de Emisión): Documentos mínimos con icono Clock o FileText.

Bloque 3 (Aseguradoras Aliadas): Píldoras con nombres de las aseguradoras asociadas.

Botón de Acción Directa: Botón verde grande w-full py-3.5 bg-brand-green hover:bg-brand-green-dark text-white rounded-2xl font-bold flex items-center justify-center gap-2.

Texto: "Cotizar [Nombre del Servicio] por WhatsApp".

Genera la URL codificada con el nombre exacto de la póliza para iniciar la conversación directa con Melanie.

7.7. Agendador de Cita de 15 Minutos (AppointmentScheduler.tsx)
Panel dual centrado:

Panel Izquierdo:

Miniatura de Melanie + matrícula SBS.

Píldoras de valor: "Duración: 15 minutos (GRATIS)", "Modalidad: Google Meet o Llamada", "Enfoque: Evaluación técnica sin tecnicismos".

Tip de Meipo: "Te llegará una confirmación instantánea a tu WhatsApp y Google Calendar con el enlace directo."

Nota de privacidad: "Tus datos están protegidos bajo secreto profesional (Ley Nº 29733)."

Panel Derecho:

Paso 1: Selecciona Día y Hora:

Selector horizontal de días hábiles: [ Lun 18 ] [ Mar 19 ] [ Mié 20 (Seleccionado) ] [ Jue 21 ] [ Vie 22 ].

Bloques horarios disponibles: [ 09:30 AM ] [ 11:00 AM (Seleccionado) ] [ 03:30 PM ] [ 04:45 PM ] [ 05:30 PM ].

Paso 2: Datos del Responsable:

Inputs para: Nombre Completo, Empresa o RUC (opcional), WhatsApp (+51) y Selector de tema principal.

Botón de Confirmación: "Confirmar mi Cita Gratuita".

Banner de Urgencia Inferior:

Fondo bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mt-6 flex flex-col md:flex-row items-center justify-between gap-4.

Texto: "¿Necesitas tu constancia o cotización urgente para hoy mismo? Escríbele directo a Melanie para emisión prioritaria."

Botón verde: "Contactar por WhatsApp Ahora (+51 987 654 321)".

7.8. Preguntas Frecuentes (FaqAccordion.tsx)
Acordeón compacto con 3 preguntas clave desplegables:

¿Tiene algún costo adicional contratar mis seguros a través de una corredora colegiada?

¿En cuánto tiempo obtengo una Carta Fianza o una constancia SCTR urgente?

¿Cómo funciona el reemplazo del seguro de desgravamen con una póliza de vida?

7.9. Footer Institucional Oscuro (Footer.tsx)
Estilo: Fondo azul noche institucional (bg-brand-footer text-white pt-14 pb-8).

Columna 1: Logotipo formal de Melanie Silva + credencial SBS + botón de "Soporte urgente para garitas".

Columna 2 (Navegación): Enlaces directos a Coberturas, Asesoría, FAQs, Cotizador y Agendar Cita.

Columna 3 (Contacto): Teléfono corporativo, correo electrónico, horario de atención y ubicación.

Columna 4 (Aseguradoras y Transparencia): Logos en escala de grises / blancos, Canal de denuncias SBS, Política de Privacidad y Términos y Condiciones.

Línea de cierre: © 2026 Melanie Silva. Corredora de Seguros Colegiada SBS — Matrícula J-0941. Todos los derechos reservados.

8. UTILIDADES DE INTEGRACIÓN EXTERNA (src/utils/whatsapp.ts)
TypeScript
const MELANIE_PHONE_NUMBER = '51987654321'; // Configurar número corporativo oficial

export function generateServiceWhatsAppUrl(serviceTitle: string, tag: string): string {
  const message = [
    `¡Hola Melanie! 👋 Vengo desde tu web y deseo cotizar *${serviceTitle}* (${tag}).`,
    '',
    '¿Podrías indicarme qué documentos o datos de mi empresa/caso necesitas para presentarme una propuesta comparativa con las aseguradoras?',
    '',
    '¡Muchas gracias!'
  ].join('\n');

  return `[https://wa.me/$](https://wa.me/$){MELANIE_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generateAppointmentWhatsAppUrl(data: {
  date: string;
  time: string;
  fullName: string;
  companyOrRuc?: string;
  serviceTopic: string;
}): string {
  const message = [
    `¡Hola Melanie! 👋 Acabo de agendar una sesión de 15 minutos.`,
    '',
    `• *Fecha:* ${data.date}`,
    `• *Hora:* ${data.time}`,
    `• *Nombre:* ${data.fullName}`,
    `• *Empresa / RUC:* ${data.companyOrRuc || 'No indicado'}`,
    `• *Tema:* ${data.serviceTopic}`,
    '',
    'Quedo a la espera del enlace de videollamada. ¡Saludos!'
  ].join('\n');

  return `[https://wa.me/$](https://wa.me/$){MELANIE_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generateUrgentCheckpointWhatsAppUrl(): string {
  const message = [
    '🚨 *URGENCIA DE EMISIÓN / GARITA:*',
    'Hola Melanie, requiero emisión o constancia urgente para ingreso inmediato de personal a obra/mina.',
    'Por favor tu atención prioritaria.'
  ].join('\n');

  return `[https://wa.me/$](https://wa.me/$){MELANIE_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
9. CHECKLIST DE CONTROL DE CALIDAD PRE-ENTREGA
Antes de dar por finalizada la implementación en OpenCode, verificar el cumplimiento de cada punto:

[ ] Cumplimiento Regulatorio SBS: En ningún lugar de la interfaz se hace mención a "Empresa Corredora" ni nombres de personas jurídicas. Figura como Melanie Silva Alarcón · Persona Natural Colegiada SBS Nº J-0941.

[ ] Navbar Flotante Tipo Cápsula: La barra superior flota con bordes redondeados completos (rounded-full), efecto backdrop-blur y centrado responsivo sin bordes rígidos.

[ ] Cards con Fondo Fotográfico y Botón (+): Las tarjetas del carrusel tienen fondo visual inmersivo, degradado oscuro legible y el botón circular flotante (+) en la esquina superior derecha.

[ ] Modal Split-View Funcional: Al presionar (+) o "Ver Ficha y Cotizar", se abre la ventana dividida con imagen y tip de Meipo a la izquierda, y ficha técnica detallada a la derecha.

[ ] Tabla Comparativa Multiaseguradora: Se visualiza la matriz de disponibilidad por aseguradora con checks claros en vez de simples píldoras aisladas.

[ ] Mascota Meipo Presente: El koala Meipo aparece en el Hero (con diálogo interactivo), en el modal Split-View y en la tarjeta del agendador de 15 minutos.

[ ] Agendador de Citas Funcional: La selección de días y bloques de horario es mutuamente excluyente y genera el mensaje de WhatsApp pre-llenado con fecha y hora.

[ ] Footer Institucional Oscuro: Se mantiene el pie de página formal en #0B132B con todos los datos de contacto y acreditación legal.