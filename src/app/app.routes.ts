import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/ui/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent),
      },
      {
        path: 'coberturas-sctr',
        loadComponent: () => import('./features/coberturas/coberturas.component').then(m => m.CoberturasComponent),
      },
      {
        path: 'asesoria',
        loadComponent: () => import('./features/asesoria/asesoria.component').then(m => m.AsesoriaComponent),
      },
      {
        path: 'preguntas-frecuentes',
        loadComponent: () => import('./features/faqs/faqs.component').then(m => m.FaqsComponent),
      },
      {
        path: 'cotizador',
        loadComponent: () => import('./features/cotizador/cotizador.component').then(m => m.CotizadorComponent),
      },
      {
        path: 'agendar-cita',
        loadComponent: () => import('./features/agendar-cita/agendar-cita.component').then(m => m.AgendarCitaComponent),
      },
    ],
  },
  {
    path: 'portal-clientes',
    loadComponent: () => import('./features/portal-clientes/portal-clientes.component').then(m => m.PortalClientesComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
