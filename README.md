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

## Idiomas

El sitio está en español, inglés, francés e italiano. El idioma se elige desde la barra de navegación y se guarda en `localStorage`; los textos viven en `src/core/i18n/dictionaries/`.

## Flujo de ramas

Se trabaja desde `develop` y se integra a `main` cuando está estable. Ver la sección 11 de [Instruccion-Landing.md](Instruccion-Landing.md).
