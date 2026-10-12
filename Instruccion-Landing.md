# Especificación de Desarrollo: Melanie Silva — Corredora de Seguros

## 1. Resumen Ejecutivo y Alcance del Negocio
- **Titular y Credenciales (Configurable):** Melanie Silva — Corredora Colegiada SBS (Matrícula J-0941).
- **Core de Negocio:** Consultoría, cotización y emisión express de seguros laborales obligatorios (SCTR Salud, SCTR Pensión, Seguro Vida Ley) y pólizas empresariales multimarca (Rímac, Pacífico, Mapfre, La Positiva).
- **Objetivos de Conversión (CRO):**
  - Generación de prospectos calificados mediante cotizaciones ágiles guiadas por pasos (Wizard).
  - Agendamiento directo de videollamadas de asesoría ejecutiva (15 min).
  - Descarga y gestión express de constancias para garitas de ingreso (obras y operaciones mineras/industriales).

---

## 2. Configuración Centralizada de Marca (`brand.config.ts`)
Toda la interfaz y los componentes deben nutrirse de este archivo centralizado. Cualquier modificación futura de nombre, teléfono, logo, red social o credencial regulatoria debe realizarse únicamente en este archivo sin tocar plantillas HTML ni lógica interna.

```typescript
// src/app/core/config/brand.config.ts
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
    location: 'Perú'
  },
  assets: {
    logoLight: 'assets/images/brand/logo.svg',
    logoDark: 'assets/images/brand/logo-dark.svg',
    advisorPhoto: 'assets/images/advisor/profile.webp'
  },
  insurers: [
    { id: 'rimac', name: 'Rímac Seguros', logo: 'assets/images/insurers/rimac.svg' },
    { id: 'pacifico', name: 'Pacífico Seguros', logo: 'assets/images/insurers/pacifico.svg' },
    { id: 'mapfre', name: 'Mapfre', logo: 'assets/images/insurers/mapfre.svg' },
    { id: 'positiva', name: 'La Positiva', logo: 'assets/images/insurers/positiva.svg' }
  ]
};
```

---

## 3. Sistema de Diseño (Design Tokens)

### 3.1 Paleta de Colores
- **Primary / Brand:** `#1952BE` (Azul corporativo principal, botones primarios, enlaces activos).
- **Primary Hover / Dark:** `#0F3C8A` (Estados interactivos y contrastes altos).
- **Secondary / Contrast:** `#0A1D37` (Banners de urgencia, cabeceras oscuras y footer institucional).
- **Background Principal:** `#FBFAF8` (Tono marfil cálido institucional).
- **Surface / Card Background:** `#FFFFFF` (Tarjetas, modales, contenedores).
- **WhatsApp Accent:** `#00875A` (Botones de contacto directo y badges de soporte activo).
- **Text Headings:** `#0F172A` (Slate oscuro con alto contraste).
- **Text Body / Muted:** `#475569` / `#64748B` (Textos secundarios y descripciones).
- **Borders & Dividers:** `#E2E8F0` / `#CBD5E1`.

### 3.2 Tipografía
- **Títulos (Headings):** Fuente serif con jerarquía editorial (*Playfair Display*, *Lora* o serif estéticamente tipografiada) para proyectar autoridad y respaldo regulatorio.
- **Cuerpo y Elementos de UI:** Sans-serif funcional y legible (*Inter*, *Roboto* o `system-ui`).

### 3.3 UI Tokens
- **Bordes Redondeados:**
  - `rounded-lg` (8px): Inputs, badges y botones secundarios.
  - `rounded-2xl` (16px): Cards de producto, calendarios y contenedores de sección.
  - `rounded-3xl` (24px): Banners flotantes y modales principales.
- **Sombras:**
  - `shadow-sm`: Cards estándar.
  - `shadow-md` / `shadow-lg`: Elementos interactivos al hacer hover y popovers.

---

## 4. Arquitectura Técnica de Software y Estructura de Directorios

Implementación modular basada en **Angular Standalone Components**, gestión de estado reactivo mediante **Signals** y arquitectura orientada a características (**Feature-Driven**):

```text
src/app/
├── core/                           # Servicios singleton, modelos globales y configuraciones
│   ├── config/
│   │   ├── brand.config.ts         # Datos de marca, contacto y aseguradoras
│   │   └── navigation.config.ts    # Enlaces de navegación y rutas globales
│   ├── models/                     # Contratos de interfaz e interfaces de datos
│   │   ├── quote.model.ts
│   │   ├── booking.model.ts
│   │   └── insurer.model.ts
│   └── services/                   # Lógica externa y llamadas HTTP
│       ├── quote.service.ts
│       ├── booking.service.ts
│       └── whatsapp.service.ts
├── shared/                         # Componentes agnósticos y reutilizables
│   ├── components/
│   │   ├── button/                 # Botón base (primary, outline, whatsapp)
│   │   ├── card/                   # Contenedor estándar con sombras y padding
│   │   ├── accordion/              # Acordeón accesible con aria-expanded
│   │   ├── stepper/                # Indicador visual de pasos para wizards
│   │   ├── badge/                  # Chips de estado y matrículas SBS
│   │   └── form-field/             # Wrapper para inputs con feedback de error
│   └── ui/                         # Layouts y contenedores estructurales
│       ├── top-navbar/             # Menú de cabecera con navegación pública
│       ├── footer/                 # Pie de página institucional y normativo
│       └── blank-layout/           # Layout minimalista sin menú para login/portal
├── features/                       # Módulos y pantallas de la aplicación
│   ├── landing/                    # Pantalla 1: Home Principal
│   │   ├── components/
│   │   │   ├── hero/
│   │   │   ├── solutions-grid/
│   │   │   ├── broker-comparison/
│   │   │   └── checkpoint-cta/
│   │   └── landing.component.ts
│   ├── coberturas/                 # Pantalla 2: Detalle Coberturas & SCTR
│   │   ├── components/
│   │   │   ├── sctr-breakdown/
│   │   │   ├── insurers-matrix/
│   │   │   └── vida-ley-card/
│   │   └── coberturas.component.ts
│   ├── asesoria/                   # Pantalla 3: Perfil Asesor & Metodología
│   │   ├── components/
│   │   │   ├── advisor-hero/
│   │   │   ├── methodology-steps/
│   │   │   └── testimonials/
│   │   └── asesoria.component.ts
│   ├── faqs/                       # Pantalla 4: Centro de Ayuda & FAQs
│   │   ├── components/
│   │   │   ├── search-filter/
│   │   │   ├── questions-accordion/
│   │   │   └── resources-sidebar/
│   │   └── faqs.component.ts
│   ├── cotizador/                  # Pantalla 5: Wizard de Cotización Interactivo
│   │   ├── components/
│   │   │   ├── step-segment/
│   │   │   ├── step-company/
│   │   │   └── step-contact/
│   │   └── cotizador.component.ts
│   ├── agendar-cita/               # Pantalla 6: Agendador de Citas 15 Min
│   │   ├── components/
│   │   │   ├── calendar-selector/
│   │   │   └── booking-form/
│   │   └── agendar-cita.component.ts
│   └── portal-clientes/            # Pantalla 7: Login & Autogestión Garita
│       ├── components/
│       │   ├── login-card/
│       │   └── express-download/
│       └── portal-clientes.component.ts
├── app.routes.ts                   # Configuración central de rutas
└── app.component.ts                # Componente raíz
```

---

## 5. Modelos de Dominio y Contratos de Datos (TypeScript)

```typescript
// src/app/core/models/quote.model.ts
export type CompanyScale = 'micro' | 'pyme' | 'corporativo';
export type InsuranceType = 'sctr_salud' | 'sctr_pension' | 'sctr_integral' | 'vida_ley';

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

// src/app/core/models/booking.model.ts
export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

export interface BookingRequest {
  date: string; // Formato YYYY-MM-DD
  timeSlot: string;
  fullName: string;
  corporateEmail: string;
  phone: string;
  companyRuc?: string;
  notes?: string;
}

// src/app/core/models/insurer.model.ts
export interface InsurerInfo {
  id: string;
  name: string;
  logo: string;
  averageEmissionTimeMinutes: number;
  supportPhone: string;
}
```

---

## 6. Enrutamiento Modular (`app.routes.ts`)

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
      },
      {
        path: 'coberturas-sctr',
        loadComponent: () => import('./features/coberturas/coberturas.component').then(m => m.CoberturasComponent)
      },
      {
        path: 'asesoria',
        loadComponent: () => import('./features/asesoria/asesoria.component').then(m => m.AsesoriaComponent)
      },
      {
        path: 'preguntas-frecuentes',
        loadComponent: () => import('./features/faqs/faqs.component').then(m => m.FaqsComponent)
      },
      {
        path: 'cotizador',
        loadComponent: () => import('./features/cotizador/cotizador.component').then(m => m.CotizadorComponent)
      },
      {
        path: 'agendar-cita',
        loadComponent: () => import('./features/agendar-cita/agendar-cita.component').then(m => m.AgendarCitaComponent)
      }
    ]
  },
  {
    path: 'portal-clientes',
    loadComponent: () => import('./features/portal-clientes/portal-clientes.component').then(m => m.PortalClientesComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
```

---

## 7. Componentes Globales Compartidos (Shell)

### 7.1 Top Navbar
- **Izquierda:** Logotipo Melanie Silva + badge "Reg. SBS J-0941" (vinculados dinámicamente a `BRAND_CONFIG`).
- **Centro (Navegación Desktop):**
  - Coberturas & SCTR (`/coberturas-sctr`)
  - Asesoría (`/asesoria`)
  - Preguntas Frecuentes (`/preguntas-frecuentes`)
  - Contacto (`#contacto`)
- **Derecha (Acciones Rápidas):**
  - Botón secundario: *Portal Clientes* (`/portal-clientes`)
  - Botón primario: *+ Cotizar* (`/cotizador`)
  - Botón destacado: *Agendar Cita* (`/agendar-cita`)
- **Móvil:** Menú hamburguesa colapsable con accesos directos y llamada directa a WhatsApp.

### 7.2 Footer Institucional
- Resumen de acreditación SBS y datos de contacto oficial.
- Matriz de enlaces a aseguradoras respaldadas (Rímac, Pacífico, Mapfre, La Positiva).
- Enlaces regulatorios: Canal de denuncias SBS, Política de Privacidad, Términos y Condiciones.
- Acceso directo a soporte de emergencia para garitas.

---

## 8. Especificación Detallada Pantalla por Pantalla (7 Vistas)

### Pantalla 1: Landing Page Principal (`/`)
- **Hero Section:**
  - Credencial visible de Melanie Silva (Corredora Colegiada SBS J-0941).
  - Título de impacto orientado a la protección legal de empresas y colaboradores.
  - Fotografía profesional y botón CTA dual: *"Cotizar ahora"* y *"Hablar por WhatsApp"*.
- **Grid de Soluciones Esenciales (3 Cards):**
  - SCTR Salud y Pensión (trabajos de alto riesgo).
  - Seguro Vida Ley (desde el primer día de ingreso a planilla).
  - Responsabilidad Civil y Accidentes Personales para contratistas.
- **Bloque Comparativo: Broker Colegiada vs. Canal Telefónico Tradicional:**
  - Tabla de valor agregado: Asignación personalizada, respuesta ante siniestros, emisión en minutos para garitas.
- **Social Proof & Métricas:**
  - Contadores: +10 años de experiencia, +150 empresas protegidas, 99.8% de emisiones a tiempo.
- **FAQ Sintético:** 4 preguntas clave con botón a la sección extendida.
- **Banner de Conversión Dual:** Fondo `#0F3C8A` con llamado urgente para pases de garita del día.

---

### Pantalla 2: Coberturas y SCTR (`/coberturas-sctr`)
- **Explicativo Normativo:**
  - Diferenciación clara entre SCTR Salud (atención médica/rehabilitación) y SCTR Pensión (invalidez/sobrevivencia).
  - Clasificación de actividades de alto riesgo según el Decreto Supremo correspondiente.
- **Matriz Comparativa de Aseguradoras:**
  - Tabla con logos de aseguradoras, tiempos promedio de emisión para pases de garita y canales de asistencia.
- **Bloque Seguro Vida Ley:**
  - Resumen de coberturas obligatorias (Muerte natural, muerte accidental, invalidez total y permanente).
- **Formulario Inline:** Formulario rápido para solicitar comparativo de tasas según planilla.

---

### Pantalla 3: Asesoría Melanie Silva (`/asesoria`)
- **Perfil de Autoridad:**
  - Trayectoria, certificaciones SBS y enfoque consultivo sin sobrecosto para la empresa contratante.
- **Metodología en 4 Pasos:**
  1. *Diagnóstico de Riesgo y Planilla*.
  2. *Licitación Multimarca (comparativa de primas)*.
  3. *Emisión y Validación de Póliza*.
  4. *Acompañamiento Continuo en Siniestros y Renovaciones*.
- **Testimonios Sectoriales:**
  - Casos de éxito y validaciones de clientes en sectores de construcción, ingeniería y minería.

---

### Pantalla 4: Preguntas Frecuentes (`/preguntas-frecuentes`)
- **Buscador Dinámico:** Input con filtrado en tiempo real sobre las preguntas cargadas en memoria.
- **Filtros por Categoría (Chips/Tabs):**
  - Todos, SCTR, Seguro Vida Ley, Rol del Broker, Pases y Garitas.
- **Acordeón Accesible:**
  - Preguntas desplegables con marcado semántico `aria-expanded` y navegación por teclado.
- **Sidebar de Recursos Útiles:**
  - Enlaces de descarga directa de formatos modelo (T-Registro, plantilla de declaración de planilla mensual).

---

### Pantalla 5: Cotizador Interactivo Wizard (`/cotizador`)
- **Stepper Visual de 3 Pasos (Gestión con Signals):**
  - **Paso 1: Selección de Escala y Rubro:**
    - Segmentación por tamaño: Microempresa (1-10), PYME (11-50) o Corporativo (50+).
    - Selección de producto requerido (SCTR Salud, Pensión, Vida Ley o Combo Integral).
  - **Paso 2: Datos de la Empresa:**
    - RUC (validación de 11 dígitos), Razón Social, número estimado de trabajadores en riesgo.
  - **Paso 3: Datos de Contacto y Envío:**
    - Nombre del responsable de RRHH / Administración, correo corporativo, teléfono celular.
- **Confirmación:** Pantalla de confirmación con redirección opcional directa a WhatsApp con el resumen de datos cargado.

---

### Pantalla 6: Agendamiento de Cita Rápida (`/agendar-cita`)
- **Ficha de la Sesión:**
  - Título: *"Asesoría Ejecutiva de 15 Minutos"*.
  - Modalidad: Videollamada (Google Meet / Microsoft Teams).
- **Componente de Calendario Interactivo:**
  - Selector de fecha (bloqueo de fines de semana y feriados).
  - Grilla de selección de horarios disponibles en intervalos de 15 a 30 minutos.
- **Formulario de Registro:**
  - Datos de contacto y campo breve de contexto: *"¿Cuál es la necesidad principal de tu empresa?"*.
  - Botón de confirmación con generación de evento de calendario.

---

### Pantalla 7: Portal de Clientes / Autogestión (`/portal-clientes`)
- **Layout Minimalista (`blank-layout`):**
  - Vista limpia enfocada exclusivamente en el acceso sin distracciones del navbar principal.
- **Módulo de Autenticación:**
  - Acceso mediante RUC + DNI del contacto registrado o contraseña corporativa.
- **Accesos Rápidos Post-Login / Enlaces Directos:**
  - Descarga de última constancia de SCTR vigente para garita.
  - Solicitud de inclusión/exclusión de trabajadores en planilla mensual.
  - Botón de contacto prioritario por incidencias en garita.

---

## 9. Lógica de Integración Externa (`whatsapp.service.ts`)

```typescript
// src/app/core/services/whatsapp.service.ts
import { Injectable } from '@angular/core';
import { BRAND_CONFIG } from '../config/brand.config';
import { QuoteDraft } from '../models/quote.model';

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  private readonly baseUrl = '[https://wa.me/](https://wa.me/)';

  buildQuoteUrl(draft: QuoteDraft): string {
    const message = [
      `Hola ${BRAND_CONFIG.brandName}, solicito cotización express:`,
      `• *RUC:* ${draft.ruc}`,
      `• *Empresa:* ${draft.businessName}`,
      `• *Póliza:* ${draft.productType}`,
      `• *Trabajadores:* ${draft.workersCount}`,
      `• *Contacto:* ${draft.contactName}`
    ].join('\n');

    return `${this.baseUrl}${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  buildUrgentCheckpointUrl(ruc: string = ''): string {
    const text = `🚨 *URGENCIA GARITA:* Hola ${BRAND_CONFIG.brandName}, requiero soporte inmediato para emisión/constancia de pase de garita${ruc ? ` para el RUC ${ruc}` : ''}.`;
    return `${this.baseUrl}${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }
}
```

---

## 10. Validaciones y Criterios de Aceptación Técnicos
1. **Validación Estricta de Formularios:**
   - **RUC:** Exactamente 11 dígitos numéricos que comiencen con `10` o `20`.
   - **DNI:** Exactamente 8 dígitos numéricos.
   - **Teléfono:** Exactamente 9 dígitos numéricos (formato celular peruano).
   - **Email:** Validación de formato estándar corporativo.
2. **Accesibilidad (a11y):** Contraste mínimo WCAG AA en botones y fondos, etiquetas `<label>` vinculadas a todos los inputs y atributos `aria-expanded` para componentes desplegables.
3. **Desacoplamiento Estricto:** Prohibido escribir nombres o credenciales quemadas ("hardcoded") en las plantillas HTML; deben inyectarse mediante `BRAND_CONFIG`.

---

## 11. Flujo de Ramas y Versionado (Git Workflow)

El repositorio maneja dos ramas permanentes: `main` y `develop`. Nunca se trabaja directamente sobre `main`.

| Rama | Rol | Estado |
| --- | --- | --- |
| `main` | Producción. Solo recibe código probado y estable vía merge desde `develop`. | Permanente |
| `develop` | Integración continua. Aquí se envían todos los cambios nuevos. | Permanente |

### 11.1 Reglas de trabajo

1. **Toda nueva funcionalidad o corrección** se desarrolla en una rama de trabajo creada desde `develop`:
   ```bash
   git checkout develop && git pull origin develop
   git checkout -b feature/nombre-del-cambio   # o fix/nombre-del-bug
   ```
2. **Los commits se envían a `develop`** (directamente para cambios pequeños, o vía Pull Request hacia `develop` para funcionalidades grandes):
   ```bash
   git push origin feature/nombre-del-cambio
   git checkout develop && git merge feature/nombre-del-cambio && git push origin develop
   ```
3. **Determina a producción:** cuando `develop` esté estable y verificado, se hace merge hacia `main`:
   ```bash
   git checkout main && git merge develop && git push origin main
   ```
4. **Sincronización:** después de un merge hacia `main`, se recomienda mantener `develop` alineada (si se corrigió algo caliente directamente en `main`, hacer cherry-pick o merge inverso a `develop`).

### 11.2 Convención de nombres de rama

- `feature/…` — funcionalidades nuevas (ej. `feature/cotizador-pasos`).
- `fix/…` — correcciones de bugs (ej. `fix/overflow-agendador-movil`).
- `release/…` (opcional) — estabilización previa a fusionar `develop` → `main`.

### 11.3 Convención de commits

Mensajes breves en minúsculas, usando prefijo por tipo:
- `feature: …` nueva funcionalidad · `fix: …` corrección · `refactor: …` · `docs: …` · `chore: …` · `responsive: …` ajustes de maquetado responsivo.

Ejemplo de historial existente:

```text
2a54968 responsive mobile-first: drawer navbar animado, hero apilado, carrusel 82vw…  ← main
```
