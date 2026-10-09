import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../../../shared/components/card/card.component';

interface Solution {
  icon: string;
  title: string;
  description: string;
  points: string[];
}

@Component({
  selector: 'app-solutions-grid',
  imports: [RouterLink, CardComponent],
  template: `
    <section class="section">
      <div class="container">
        <div class="text-center intro">
          <span class="eyebrow">Soluciones esenciales</span>
          <h2 class="section-title">Coberturas obligatorias y complementarias para tu operación</h2>
        </div>
        <div class="solutions">
          @for (solution of solutions; track solution.title) {
            <app-card class="solution">
              <article>
                <span class="solution__icon" aria-hidden="true">{{ solution.icon }}</span>
                <h3>{{ solution.title }}</h3>
                <p>{{ solution.description }}</p>
                <ul>
                  @for (point of solution.points; track point) {
                    <li>{{ point }}</li>
                  }
                </ul>
              </article>
            </app-card>
          }
        </div>
        <div class="solution-cta">
          <a routerLink="/cotizador">Cotizar mi planilla ahora</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .intro {
        max-width: 640px;
        margin: 0 auto 2.8rem;
      }
      .solutions {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
      }
      .solution:first-child {
        --accent: #1952be;
      }
      .solution__icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 0.8rem;
      }
      .solution h3 {
        font-size: 1.25rem;
        margin-bottom: 0.6rem;
      }
      .solution p {
        margin: 0 0 0.9rem;
      }
      .solution ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.35rem;
        font-size: 0.9rem;
      }
      .solution ul li::before {
        content: '›';
        color: var(--color-primary);
        font-weight: 800;
        margin-right: 0.45rem;
      }
      .solution-cta {
        text-align: center;
        margin-top: 2.4rem;
      }
      .solution-cta a {
        font-weight: 700;
        color: var(--color-primary);
        border-bottom: 2px solid var(--color-primary);
        padding-bottom: 2px;
      }
      @media (max-width: 900px) {
        .solutions {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class SolutionsGridComponent {
  readonly solutions: Solution[] = [
    {
      icon: '⚕️',
      title: 'SCTR Salud y Pensión',
      description:
        'Cobertura obligatoria para trabajos de alto riesgo en minería, construcción, energía e industria; pensada para obras y operaciones.',
      points: [
        'Atención médica y rehabilitación ante accidentes',
        'Invalidez y sobrevivencia para el trabajador',
        'Emisión express de constancias para garitas',
      ],
    },
    {
      icon: '🛡️',
      title: 'Seguro Vida Ley',
      description:
        'Amparo obligatorio para todo el personal en planilla, aplicable desde el primer día de ingreso según el D.Leg. 817.',
      points: [
        'Muerte natural y accidental',
        'Invalidez total y permanente',
        'Movimientos de planilla incluidos',
      ],
    },
    {
      icon: '📋',
      title: 'Responsabilidad Civil y Accidentes Personales',
      description:
        'Políticas complementarias para contratistas y subcontratistas que exigen respaldo adicional en sus contratos.',
      points: [
        'Cobertura para obras y servicios subcontratados',
        'Accidentes personales del equipo',
        'Multimarca: Rímac, Pacífico, Mapfre y La Positiva',
      ],
    },
  ];
}
