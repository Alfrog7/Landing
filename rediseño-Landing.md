# rediseño de landing.md
# ESPECIFICACIÓN TÉCNICA Y GUÍA DE REDISEÑO: PORTAL MELANIE SEGUROS

## 1. RESUMEN DE NEGOCIO, FILOSOFÍA Y DIRECTRICES SBS
- **Titular Oficial:** Melanie Silva Alarcón · Corredora de Seguros Colegiada SBS (Matrícula J-0941).
- **Cumplimiento SBS Estricto:** La SBS prohíbe taxativamente que corredores registrados como Persona Natural operen bajo nombres de empresas o personas jurídicas ficticias. Toda la identidad visual y legal debe presentarse a título personal (*Melanie Silva / Melanie · Asesoría en Seguros*).
- **Filosofía UX (Anti-Estrés / Cero Fatiga Cognitiva):** Inspirada en la experiencia de *Compare the Market*. Se descarta la estética de web bancaria tradicional densa, fría y cargada de decretos legales intimidantes. La interfaz debe transmitir calma, orden, ligereza y cercanía.
- **Mascota de Marca ("Meipo"):** Un koala asesor carismático con gafas y tableta que acompaña al usuario con micro-consejos y tips explicativos en lenguaje sencillo, humanizando el proceso de aseguramiento.

---

## 2. DEPENDENCIAS Y LIBRERÍAS EXTERNAS: JUSTIFICACIÓN Y USO

Para asegurar un desarrollo limpio, accesible y sin recrear componentes complejos desde cero, se utilizan las siguientes librerías:

### 2.1. Iconografía: `lucide-react`
* **Por qué se usa:** Proporciona un set completo de iconos vectoriales consistentes, ligeros y con trazos configurables (`stroke-width`), evitando cargar fuentes pesadas o imágenes estáticas.
* **Instalación:**
  ```bash
  npm install lucide-react


  Cómo se usa: Se importan los iconos específicos (ShieldCheck, Calendar, ArrowRight, FileText, CheckCircle2, Clock, Phone, User) con tamaños y colores dinámicos vía clases de Tailwind CSS:

  import { ShieldCheck, MessageCircle } from 'lucide-react';
<ShieldCheck className="w-6 h-6 text-emerald-500"/>

### 2.2. Carrusel Horizontal ("Efecto Gusanito"): embla-carousel-react
Por qué se usa: Melanie requiere que las tarjetas de soluciones se deslicen de manera fluida y táctil horizontalmente, sin romper la retícula ni saturar la pantalla. Embla Carousel es una librería ultraligera (menos de 7 KB), sin dependencias CSS pesadas, que ofrece arrastre nativo con mouse/touch, soporte de snap points y renderizado óptimo.
npm install embla-carousel-react

Cómo se usa: Se inicializa el hook useEmblaCarousel con opciones de alineación y scroll arrastrable:
import useEmblaCarousel from 'embla-carousel-react';
const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: false });
// El contenedor debe tener la directiva `ref={emblaRef}` y la clase `overflow-hidden`.


### 2.3. Primitivos Accesibles de UI: @radix-ui/react-dialog
Por qué se usa: El modal de cotización rápida y el drawer deben cumplir con accesibilidad web (WCAG): bloqueo de scroll de fondo, gestión del foco (focus trapping), cierre con tecla Escape y accesibilidad para lectores de pantalla. Radix UI maneja toda la lógica sin imponer estilos predeterminados.
npm install @radix-ui/react-dialog


### 2.4. Microinteracciones Fluidas: framer-motion
Por qué se usa: Permite alternar suavemente entre las pestañas [Empresas] y [Personas], desplegar el modal sin saltos visuales y brindar animaciones sutiles a la mascota Meipo.
npm install framer-motion

Instalación:
npm install framer-motion

Cómo se usa: Para componentes que cambian condicionalmente o modales flotantes:
import { motion, AnimatePresence } from 'framer-motion';
<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} />


## 3. SISTEMA DE DISEÑO Y DESIGN TOKENS (TAILWIND CSS)
## 3.1. Justificación de la Paleta Cromática
Blanco puro (#FFFFFF) y Gris Neutro Claro (#F8FAFC): Base dominante (85% de la interfaz). Elimina la sensación de pesadez corporativa y le da respiración al contenido.

Verde Esmeralda / WhatsApp (#10B981 y #059669): Color primario de acción y CTA. Transmite tranquilidad, aprobación financiera y conexión inmediata con soporte directo.

Azul Cielo Suave (#0EA5E9): Reemplaza a los azules marinos densos. Aporta serenidad en chips, badges informativos e iconos técnicos.

Gris Grafito Oscuro (#0F172A): Garantiza contraste tipográfico sin la agresividad del negro puro (#000000).

## 3.2. Configuración en tailwind.config.js
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
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 18px 36px -8px rgba(15, 23, 42, 0.08)',
        'modal': '0 25px 50px -12px rgba(15, 23, 42, 0.18)',
      }
    }
  },
  plugins: []
};

4. ESTRUCTURA DE ARCHIVOS MODULAR
src/
├── assets/
│   ├── images/
│   │   ├── melanie-profile.webp
│   │   └── meipo-koala.webp
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
│   │   ├── InsurersLogowall.tsx
│   │   ├── WhyMelanieSection.tsx
│   │   ├── FastContactCta.tsx
│   │   └── FaqAccordion.tsx
│   ├── modals/
│   │   └── FastQuoteModal.tsx
│   └── scheduler/
│       ├── AppointmentScheduler.tsx
│       └── DayTimePicker.tsx
├── data/
│   ├── insuranceServices.ts
│   ├── insurersData.ts
│   └── faqsData.ts
├── types/
│   └── index.ts
└── utils/
    └── whatsapp.ts

    

5. MODELOS DE DATOS Y CONTRATOS TYPESCRIPT (src/types/index.ts)
export type AudienceCategory = 'empresas' | 'personas';

export interface InsuranceService {
  id: string;
  category: AudienceCategory;
  title: string;
  badge: {
    text: string;
    variant: 'green' | 'sky' | 'orange';
  };
  description: string;
  insurers: string[];
  ctaLabel: string;
  modalConfig: {
    serviceType: string;
    tag: string;
    tipText: string;
    options: string[];
  };
}

export interface Insurer {
  id: string;
  name: string;
  category: 'empresas' | 'personas' | 'ambas';
}

export interface BookingFormData {
  date: string;
  timeSlot: string;
  fullName: string;
  companyOrRuc?: string;
  whatsapp: string;
  serviceTopic: string;
}

export interface FastQuoteFormData {
  ruc: string;
  businessName?: string;
  selectedOption: string;
  phone: string;
}


6. DATA MOCK Y CONFIGURACIÓN DEL NEGOCIO
import { InsuranceService } from '../types';

export const insuranceServicesData: InsuranceService[] = [
  // SEGUROS PARA EMPRESAS
  {
    id: 'cartas-fianza',
    category: 'empresas',
    title: 'Cartas Fianza Express',
    badge: { text: 'Emisión 48h', variant: 'green' },
    description: 'Fiel Cumplimiento, Adelanto Directo y de Materiales para contratos públicos (OSCE / SEACE) y privados.',
    insurers: ['AVLA', 'Insur', 'Secrex', 'Mapfre'],
    ctaLabel: 'Cotizar Fianza',
    modalConfig: {
      serviceType: 'GARANTÍAS CONTRACTUALES',
      tag: 'SEACE 3.0',
      tipText: 'Evaluamos tu línea afianzadora con AVLA, Insur y Secrex en menos de 48 horas sin costo alguno.',
      options: ['Fiel Cumplimiento (10%)', 'Adelanto Directo', 'Adelanto Materiales', 'Seriedad Oferta']
    }
  },
  {
    id: 'seguro-credito',
    category: 'empresas',
    title: 'Seguro de Crédito',
    badge: { text: 'Blindaje Financiero', variant: 'sky' },
    description: 'Protege tus facturas comerciales contra clientes morosos. Recupera hasta el 90% del valor facturado sin riesgo.',
    insurers: ['Insur', 'Solunion / Allianz'],
    ctaLabel: 'Blindar Cartera',
    modalConfig: {
      serviceType: 'PROTECCIÓN DE FACTURAS',
      tag: 'CRÉDITO COMERCIAL',
      tipText: 'Vende a crédito con la certeza de que tu factura está respaldada ante insolvencia de tus compradores.',
      options: ['Facturas Locales', 'Crédito de Exportación', 'Cartera Global']
    }
  },
  {
    id: 'planilla-obligatoria',
    category: 'empresas',
    title: 'Planilla Obligatoria',
    badge: { text: 'SUNAFIL Express', variant: 'orange' },
    description: 'SCTR Salud, SCTR Pensión (Ley 26790) y Seguro Vida Ley con constancias inmediatas para garitas mineras y de obra.',
    insurers: ['Rímac', 'Pacífico', 'Mapfre', 'Protecta', 'La Positiva'],
    ctaLabel: 'Activar SCTR',
    modalConfig: {
      serviceType: 'CUMPLIMIENTO LABORAL',
      tag: 'PASES DE GARITA',
      tipText: 'Emisión en menos de 2 horas con código de barras digital para ingreso express de tus colaboradores.',
      options: ['SCTR Salud y Pensión', 'Seguro Vida Ley', 'Pack Integral SCTR + Vida Ley']
    }
  },
  {
    id: 'polizas-tecnicas',
    category: 'empresas',
    title: 'Pólizas Técnicas e Ingeniería',
    badge: { text: 'Obras & Maquinaria', variant: 'sky' },
    description: 'Pólizas Todo Riesgo Construcción (CAR), Montaje (EAR), Maquinaria (TREC) y Responsabilidad Civil para directores (D&O).',
    insurers: ['Chubb', 'AVLA', 'Pacífico', 'Mapfre'],
    ctaLabel: 'Evaluar Obra',
    modalConfig: {
      serviceType: 'INGENIERÍA Y RIESGOS',
      tag: 'CAR / EAR / TREC',
      tipText: 'Estructuración técnica rápida para bases de licitación y auditorías de contratistas.',
      options: ['Póliza CAR (Construcción)', 'Póliza EAR (Montaje)', 'Póliza TREC (Equipos)', 'Responsabilidad Civil D&O']
    }
  },

  // SEGUROS PARA PERSONAS & FAMILIAS
  {
    id: 'vida-devolucion',
    category: 'personas',
    title: 'Vida con Devolución',
    badge: { text: 'Ahorro Rentable', variant: 'green' },
    description: 'Sustituto inteligente del desgravamen bancario: traslada el costo del seguro de tu crédito a una póliza con retorno garantizado.',
    insurers: ['Allwest / Ohio National', 'Mapfre', 'Pacífico', 'Rímac'],
    ctaLabel: 'Simular Ahorro',
    modalConfig: {
      serviceType: 'ENDOSO DE DESGRAVAMEN',
      tag: 'AHORRO INTELIGENTE',
      tipText: 'En vez de perder el dinero del desgravamen con el banco, endosa tu póliza y recupéralo al término del préstamo.',
      options: ['Reemplazo Hipotecario', 'Ahorro a 10 años', 'Protección Familiar Integral']
    }
  },
  {
    id: 'salud-eps',
    category: 'personas',
    title: 'Salud Privada y EPS',
    badge: { text: 'Clínicas Top', variant: 'sky' },
    description: 'Atención médica ambulatoria y hospitalaria en clínicas de primer nivel, consultas preventivas y medicinas continuas.',
    insurers: ['Sanitas', 'Pacífico', 'Rímac', 'Mapfre'],
    ctaLabel: 'Cotizar Salud',
    modalConfig: {
      serviceType: 'SALUD PRIVADA',
      tag: 'COBERTURA 100%',
      tipText: 'Encontramos el plan de salud familiar o EPS que mejor cubra tu red de clínicas preferida.',
      options: ['Plan Individual', 'Plan Familiar', 'Plan EPS Autónomo']
    }
  },
  {
    id: 'vehicular-soat',
    category: 'personas',
    title: 'Vehicular y SOAT Express',
    badge: { text: 'Auxilio 24/7', variant: 'orange' },
    description: 'Protección vehicular con auxilio mecánico rápido, chofer de reemplazo y gestión ágil de peritajes y siniestros.',
    insurers: ['Pacífico', 'Mapfre', 'La Positiva', 'Quálitas'],
    ctaLabel: 'Cotizar Auto',
    modalConfig: {
      serviceType: 'PROTECCIÓN VEHICULAR',
      tag: 'SINIESTROS EXPRESS',
      tipText: 'Asistencia y defensa inmediata ante el procurador de la aseguradora en caso de choque o robo.',
      options: ['Todo Riesgo Particular', 'Pérdida Total Express', 'SOAT Digital']
    }
  },
  {
    id: 'hogar-viajes',
    category: 'personas',
    title: 'Hogar Seguro y Asistencia en Viajes',
    badge: { text: 'Cobertura Global', variant: 'sky' },
    description: 'Protección para tu hogar frente a lluvias e incendios, y asistencia médica internacional válida en todo el mundo.',
    insurers: ['Global Assistant', 'TravelApp', 'Pacífico'],
    ctaLabel: 'Ver Coberturas',
    modalConfig: {
      serviceType: 'ASISTENCIA Y BIENES',
      tag: 'MUNDIAL',
      tipText: 'Planes de asistencia médica para viajes internacionales sin restricciones consulares ni deducibles.',
      options: ['Seguro de Hogar / Inundación', 'Asistencia Viaje Internacional', 'Seguro Escolar']
    }
  }
];


7. ESPECIFICACIÓN DETALLADA DE COMPONENTES DE UI
7.1. Navbar Global (Navbar.tsx)
Estilo: fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-brand-border h-20 flex items-center justify-between px-4 lg:px-12.

Identidad de Marca:

Logo textual: "Melanie" en semibold con subtítulo "Asesoría en Seguros".

Chip regulatorio SBS: bg-brand-surface border border-brand-border rounded-full px-3 py-1 text-xs text-brand-dark flex items-center gap-1.5. Texto: "SBS: Persona Natural Colegiada".

Enlaces Centrales: "Soluciones", "Sobre Melanie", "Preguntas Frecuentes" con scroll suave.

Acciones Derecha:

Enlace secundario: "Agendar Cita" (scroll hacia la sección del calendario).

Botón primario verde: bg-brand-green hover:bg-brand-green-dark text-white font-medium rounded-full px-5 py-2.5 flex items-center gap-2 transition-colors shadow-soft. Icono de WhatsApp + texto "Conversar por WhatsApp".

Icono de usuario a la derecha para portal de clientes.

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

Ilustración destacada de Meipo (koala 3D con chaleco, anteojos y tableta).

Globo de diálogo emergente: "¡Hola! Soy Meipo. Te ayudo a encontrar tu póliza perfecta en minutos 🐨".

Badges flotantes interactivos:

"Respuesta inmediata < 24h garantizada"

"Ahorro hasta el 25% en comparativa neutral"

7.3. Carrusel Deslizable de Soluciones (SolutionsCarousel.tsx)
Estructura y Comportamiento "Tipo Gusanito":

Montado con embla-carousel-react.

Contenedor externo con flechas de navegación < y > en los extremos.

Carril interno (flex gap-6 select-none): Cada tarjeta tiene un ancho fijo (min-w-[290px] md:min-w-[320px] max-w-[320px]).

Efecto Peek: En pantallas de escritorio y móviles, la siguiente tarjeta asoma en el borde derecho para indicar visualmente que el contenido continúa.

Indicadores inferiores: 3 puntos animados (dots) que reflejan el índice activo del carrusel.

Detalle de la Tarjeta (SolutionCard.tsx):

Fondo blanco (bg-white), borde suave (border border-brand-border), sombra (shadow-soft hover:shadow-card-hover transition-all duration-300 rounded-3xl p-6 flex flex-col justify-between).

Cabecera de la card: Icono en caja redondeada suave + badge de color según estado (ej. Verde para "Emisión 48h", Naranja para "SUNAFIL Express").

Título H3: font-bold text-xl text-brand-dark mb-2.

Descripción: text-brand-muted text-sm leading-relaxed mb-4.

Bloque de aseguradoras: Píldoras con nombres de aseguradoras con las que se cotiza esa póliza específica.

Botón de acción: w-full py-2.5 bg-brand-surface hover:bg-brand-sky-light text-brand-dark hover:text-brand-sky border border-brand-border rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2. Texto: "Cotizar [Servicio] →". Al hacer clic, abre FastQuoteModal pasando el objeto del servicio.

7.4. Logowall de Aseguradoras (InsurersLogowall.tsx)
Texto superior centrado: text-xs font-bold uppercase tracking-wider text-brand-muted. "COTIZAMOS EN SIMULTÁNEO CON TODAS LAS ENTIDADES REGULADAS POR LA SBS".

Badge de neutralidad: text-xs text-brand-dark bg-brand-surface border border-brand-border rounded-full px-4 py-1.5 inline-flex items-center gap-2 mb-6. Texto: "🛡️ 100% independiente: asesoría personalizada y gratuita para el asegurado".

Grilla de píldoras en gris neutro con texto en negrita:
[ RÍMAC ] [ PACÍFICO ] [ MAPFRE ] [ LA POSITIVA ] [ SANITAS ] [ PROTECTA ] [ CHUBB ] [ AVLA ] [ INSUR ] [ SOLUNION ]

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

7.6. Modal de Cotización Rápida (FastQuoteModal.tsx)
Desplegable mediante @radix-ui/react-dialog activado al presionar cualquier botón de cotizar en el carrusel:

Cabecera: Icono + Título del servicio seleccionado + Tag de contexto + Botón de cierre (X).

Caja de tip Meipo: Miniatura de Meipo con recuadro bg-brand-sky-light border border-sky-200 rounded-2xl p-4 flex gap-3. Texto dinámico tomado de modalConfig.tipText.

Input de RUC:

Label: "RUC de la Empresa * (11 dígitos)".

Input numérico con límite estricto de 11 caracteres.

Botón embebido "Validar SUNAT" (simula validación de RUC y autocompleta la razón social).

Leyenda de ayuda: "ⓘ Consulta referencial en centrales sin afectar tu score de riesgo."

Chips de Requerimiento: Botones tipo toggle para elegir la opción específica (ej. Fiel Cumplimiento, Adelanto Directo, etc.).

Botón de Envío: bg-brand-green hover:bg-brand-green-dark text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2. Texto: "Solicitar Evaluación Inmediata por WhatsApp". Dispara la función utilitaria generateQuoteWhatsAppUrl.

7.7. Agendador de Cita de 15 Minutos (AppointmentScheduler.tsx)
Bloque contenedor centrado con diseño de panel dual:

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


8. UTILIDADES DE INTEGRACIÓN EXTERNA (src/utils/whatsapp.ts)
const MELANIE_PHONE_NUMBER = '51987654321'; // Reemplazar con el número oficial de Melanie

export function generateQuoteWhatsAppUrl(
  serviceTitle: string,
  ruc: string,
  selectedOption: string
): string {
  const message = [
    `¡Hola Melanie! 👋 Deseo cotizar el servicio de *${serviceTitle}*.`,
    '',
    `• *RUC / Empresa:* ${ruc ? ruc : 'A coordinar'}`,
    `• *Tipo / Requerimiento:* ${selectedOption || 'Evaluación inicial'}`,
    '',
    '¿Podrías indicarme qué documentos necesitas para cotizar con las aseguradoras? ¡Gracias!'
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

9. CHECKLIST DE CONTROL DE CALIDAD PRE-ENTREGA
Antes de dar por finalizada la implementación en OpenCode, verificar el cumplimiento de cada punto:

[ ] Cumplimiento Regulatorio SBS: En ningún lugar de la interfaz se hace mención a "Empresa Corredora" ni nombres de personas jurídicas. Figura como Melanie Silva Alarcón · Persona Natural Colegiada SBS Nº J-0941.

[ ] Predominio del Espacio en Blanco: No existen fondos azul marino oscuros pesados. El fondo principal es blanco puro (#FFFFFF) y gris hielo (#F8FAFC).

[ ] Mascota Meipo Presente: El koala Meipo aparece en el Hero (con diálogo), en el modal de cotización rápida y en la tarjeta del agendador.

[ ] Carrusel Horizontal Operativo: Las tarjetas de seguros se desplazan suavemente con mouse drag y touch swipe mediante embla-carousel-react, con indicadores (dots) sincronizados.

[ ] Conmutación Instantánea de Pestañas: Al alternar entre [Empresas] y [Personas], el carrusel actualiza dinámicamente sus tarjetas sin recargar la página.

[ ] Validación Numérica de RUC: El campo RUC en el modal restringe la entrada a exactamente 11 dígitos numéricos antes de habilitar el botón de WhatsApp.

[ ] Agendador de Citas Funcional: La selección de días y bloques de horario es mutuamente excluyente y genera el mensaje de WhatsApp pre-llenado con fecha y hora.

[ ] Diseño 100% Responsivo: La interfaz no presenta desbordamientos horizontales no deseados (overflow-x: hidden en el layout raíz) y el menú móvil colapsa adecuadamente.