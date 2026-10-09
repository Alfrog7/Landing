import { Component } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';

interface MethodStep {
  number: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-methodology-steps',
  imports: [CardComponent],
  template: `
    <section class="section methodology">
      <div class="container">
        <div class="text-center methodology__intro">
          <span class="eyebrow">Metodología de trabajo</span>
          <h2 class="section-title">Cuatro pasos hasta tu póliza gestionada</h2>
        </div>
        <ol class="methodology__steps">
          @for (step of steps; track step.number) {
            <app-card class="methodology__step">
              <li>
                <span class="methodology__number">{{ step.number }}</span>
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
              </li>
            </app-card>
          }
        </ol>
      </div>
    </section>
  `,
  styles: [
    `
      .methodology {
        background: var(--color-surface);
        border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
      }
      .methodology__intro {
        max-width: 620px;
        margin: 0 auto 2.8rem;
      }
      .methodology__steps {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.3rem;
      }
      .methodology__number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--color-primary);
        color: #fff;
        font-family: var(--font-heading);
        font-weight: 800;
        font-size: 1.1rem;
        margin-bottom: 0.9rem;
      }
      .methodology h3 {
        font-size: 1.08rem;
        margin-bottom: 0.5rem;
      }
      .methodology p {
        margin: 0;
        font-size: 0.9rem;
      }
      @media (max-width: 960px) {
        .methodology__steps {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 560px) {
        .methodology__steps {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class MethodologyStepsComponent {
  readonly steps: MethodStep[] = [
    {
      number: 1,
      title: 'Diagnóstico de Riesgo y Planilla',
      description:
        'Mapeamos las actividades de alto riesgo, censo de trabajadores en planilla (T-Registro) y exigencias contractuales del principal.',
    },
    {
      number: 2,
      title: 'Licitación Multimarca',
      description:
        'Solicitamos cotizaciones a Rímac, Pacífico, Mapfre y La Positiva para comparar primas, endosos y condiciones.',
    },
    {
      number: 3,
      title: 'Emisión y Validación de Póliza',
      description:
        'Revisamos pólizas y constancias, verificamos la cobertura exacta de garitas y coordinamos el pago de la prima.',
    },
    {
      number: 4,
      title: 'Acompañamiento Continuo',
      description:
        'Movimientos mensuales de planilla, soporte en siniestros, renovación anual y mejoras de cobertura cuando el mercado lo permite.',
    },
  ];
}
