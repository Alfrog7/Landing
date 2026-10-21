// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [preact()],
  server: { port: 4321 },
  // Toolbar de desarrollo desactivada: su panel inyecta overhead y retrasa
  // cada visita en dev (no aporta al flujo de trabajo de este proyecto)
  devToolbar: { enabled: false },
  // Precalienta la transformacion de los modulos de cliente apenas arranca el
  // servidor: la primera visita ya no espera la compilacion on-demand
  vite: {
    server: {
      warmup: {
        clientFiles: ['./src/**/*.{ts,tsx,scss,astro}'],
      },
    },
  },
  // Pǭginas que pasaron a ser secciones de la Home: las URLs antiguas siguen funcionando
  redirects: {
    '/agendar-cita': '/#agendar',
    '/asesoria': '/#sobre-melanie',
    '/coberturas-sctr': '/#aseguradoras',
  },
});
