# Landing · Mel — Corredora de Seguros

Sitio web de **Melanie O. Calderón Vega**, Corredora de Seguros persona natural · Registro SBS N-4050.

Landing en 4 idiomas (es/en/fr/it) con fichas por seguro, cotización por WhatsApp, agendamiento con Google Calendar y el asistente Mepo. Construida con:

- [Astro 7](https://astro.build) + islas [Preact](https://preactjs.com)
- Estilos en SCSS (tokens en `src/styles/global.scss`)
- Carrusel con [Embla](https://www.embla-carousel.com) · Iconos de [Lucide](https://lucide.dev)
- Diseño según el feedback oficial de Melanie: `.opencode/skills/landing-design/Mejoras para la página web — Melanie Calderón, Asesora de Seguros.md`

## Estado del proyecto

| Hitos | Contenido |
| --- | --- |
| Issues #4–#6 (M1) | Datos maestros SBS, sin promesas exactas, primera persona singular |
| Issues #7–#9 (M2) | Franja de aseguradoras, tarjetas simplificadas, Mepo + bienvenida |
| Issues #10–#13 (M3) | Ambiente de color, nueva ficha, carrusel de tipos, narrativas |
| Issues #14–#18 (M4) | Dos perfiles, Área de Riesgos Virtual, ¿Emergencia?, presentación, footer legal |

- **Bitácora técnica completa:** `docs/bitacora-issues.md` (leer primero en cada sesión)
- **Pendientes externos** (entregables de Melanie: logo MEL/SBS, teléfonos, videos, imágenes): issue [#19](https://github.com/Alfrog7/Landing/issues/19)
- Rama de pruebas con demos provisionales: PR [#35](https://github.com/Alfrog7/Landing/pull/35)

## Requisitos

- Node.js ≥ 22 (probado con Node 24)
- npm ≥ 11

## Desarrollo

```bash
npm install
npm run dev      # o: npm start
```

Abre http://localhost:4321/. La página se recarga sola al guardar cambios.

## Comandos

| Comando | Acción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` para revisar la versión de producción |
| `npm run check` | Verifica tipos de los archivos `.astro` y `.tsx` |

## Estructura

```text
src/
├── pages/        # Rutas (un archivo .astro por página)
├── layouts/      # BaseLayout (head, estilos globales) y MainLayout (navbar + footer)
├── components/
│   ├── landing/  # Hero, carrusel, fichas, Mepo, Área de Riesgos…
│   ├── layout/   # Navbar, Footer, EmergencyButton, WhatsAppFloat
│   └── ui/       # Accordion, iconos
├── core/
│   ├── config/   # brand.config, booking.config, emergency.config (fuentes únicas)
│   ├── data/     # landing.data (FAQ, campos de cotización, videos)
│   ├── i18n/     # diccionarios es/en/fr/it
│   ├── models/   # tipos
│   └── services/ # whatsapp.service (builders de mensajes + firma legal)
└── styles/       # global.scss + un .scss por componente
docs/             # Bitácora de issues y documentos de trabajo
public/           # Logos, imágenes, favicon y manifest
```

**Fuentes únicas de datos:** `brand.config.ts` (marca, contacto legal), `landing.data.ts` (FAQ, formularios, videos), `emergency.config.ts` (teléfonos de siniestros), `booking.config.ts` (Google Calendar). Los textos visibles viven en los diccionarios i18n.

## Agendar citas con Google Calendar

Las citas se pueden reservar directo en el Google Calendar de Melanie, con disponibilidad en tiempo real, sin dobles reservas e invitación por correo:

1. En [Google Calendar](https://calendar.google.com) (desde una computadora): **Crear → Programación de citas**. Define duración de **15 minutos**, horarios disponibles y que se cree un enlace de Google Meet.
2. Abre la programación creada → **Compartir** → **Añadir a tu sitio web** (o "Insertar") y copia el valor de `src` del iframe: `https://calendar.google.com/calendar/appointments/schedules/XXXX`.
3. Copia `.env.example` a `.env` y pega esa URL en `PUBLIC_GOOGLE_CALENDAR_URL`. Reinicia `npm run dev` o vuelve a construir.

Mientras se use la programación de prueba, el encabezado con el nombre de la cuenta queda recortado visualmente (`--gcal-crop-top` en `app-google-calendar.scss`). Con `PUBLIC_GOOGLE_CALENDAR_URL=""` se desactiva Google Calendar y se usa el agendador propio con confirmación por WhatsApp. Si solo tienes el enlace corto (`calendar.app.google/…`), ábrelo en el navegador: te lleva a la URL `calendar.google.com/calendar/appointments/schedules/…`, que es la que se usa para incrustar.

La variable se integra al compilar: si cambia, hay que volver a ejecutar `npm run build`.

## Idiomas

El sitio está en español, inglés, francés e italiano. El idioma se elige desde la barra de navegación y se guarda en `localStorage`; los textos viven en `src/core/i18n/dictionaries/`.

## Flujo de trabajo

1. Una issue → una rama `feat/issue-N-*` → PR hacia `develop` con `Closes #N` + etiqueta del milestone.
2. Tras el merge, **cerrar la issue manualmente** (la rama default es `main`; GitHub no auto-cierra contra `develop`).
3. Actualizar la tabla canónica de `docs/bitacora-issues.md`.
4. `develop` se integra a `main` cuando está estable.

Lecciones técnicas y cuidados (UTF-8, PowerShell, CRLF) en la bitácora.
