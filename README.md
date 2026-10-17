# Landing · Melanie Silva · Asesoría en Seguros

Sitio web de Melanie Silva Alarcón, Corredora de Seguros Colegiada SBS (Matrícula J-0941).

Construido con [Astro](https://astro.build) y [Preact](https://preactjs.com) (islas interactivas), estilos en SCSS, carrusel con [Embla](https://www.embla-carousel.com) e iconos de [Lucide](https://lucide.dev). Los detalles de diseño y arquitectura están en [Instruccion-Landing.md](Instruccion-Landing.md).

## Requisitos

- Node.js 20.19 o superior (se probó con Node 24)
- npm 11

## Desarrollo

```bash
npm install
npm start        # o: npm run dev
```

Abre http://localhost:4321/. La página se recarga sola al guardar cambios.

## Comandos

| Comando | Acción |
| --- | --- |
| `npm start` / `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` localmente para revisar la versión de producción |
| `npm run check` | Verifica tipos de los archivos `.astro` y `.tsx` |

## Estructura

```text
src/
├── pages/        # Rutas (un archivo .astro por página)
├── layouts/      # BaseLayout (head, estilos globales) y MainLayout (navbar + footer)
├── components/   # Componentes Preact e islas interactivas
├── core/         # Configuración de marca, datos, i18n, modelos y servicios
└── styles/       # global.scss y un .scss por componente
public/           # Logos, imágenes, favicon y manifest
```

## Agendar citas con Google Calendar

Las citas se pueden reservar directo en el Google Calendar de Melanie, con disponibilidad en tiempo real, sin dobles reservas e invitación por correo:

1. En [Google Calendar](https://calendar.google.com) (desde una computadora): **Crear → Programación de citas**. Define duración de **15 minutos**, horarios disponibles y que se cree un enlace de Google Meet.
2. Abre la programación creada → **Compartir** → **Añadir a tu sitio web** (o "Insertar") y copia el valor de `src` del iframe: `https://calendar.google.com/calendar/appointments/schedules/XXXX`.
3. Copia `.env.example` a `.env` y pega esa URL en `PUBLIC_GOOGLE_CALENDAR_URL`. Reinicia `npm start` o vuelve a construir.

Con la variable definida, la sección "Agendar" de la Home (`/#agendar`) muestra la página de reservas de Google dentro del sitio. Mientras no se defina, el sitio usa una **programación de prueba** (`src/core/config/booking.config.ts`); con `PUBLIC_GOOGLE_CALENDAR_URL=""` se desactiva Google Calendar y se usa el agendador propio, con confirmación por WhatsApp. Si solo tienes el enlace corto (`calendar.app.google/…`), ábrelo en el navegador: te lleva a la URL `calendar.google.com/calendar/appointments/schedules/…`, que es la que se usa para incrustar. El enlace corto tal cual no admite iframe y se muestra como un botón que abre una pestaña nueva.

La variable se integra al compilar: si cambia, hay que volver a ejecutar `npm run build`.

## Idiomas

El sitio está en español, inglés, francés e italiano. El idioma se elige desde la barra de navegación y se guarda en `localStorage`; los textos viven en `src/core/i18n/dictionaries/`.

## Flujo de ramas

Se trabaja desde `develop` y se integra a `main` cuando está estable. Ver la sección 11 de [Instruccion-Landing.md](Instruccion-Landing.md).
