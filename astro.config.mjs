// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [preact()],
  server: { port: 4321 },
  // Páginas que pasaron a ser secciones de la Home: las URLs antiguas siguen funcionando
  redirects: {
    '/agendar-cita': '/#agendar',
    '/asesoria': '/#sobre-melanie',
    '/coberturas-sctr': '/#aseguradoras',
  },
});
