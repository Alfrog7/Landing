import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AccordionComponent } from '../../shared/components/accordion/accordion.component';
import { BrokerComparisonComponent } from './components/broker-comparison/broker-comparison.component';
import { CheckpointCtaComponent } from './components/checkpoint-cta/checkpoint-cta.component';
import { HeroComponent } from './components/hero/hero.component';
import { SolutionsGridComponent } from './components/solutions-grid/solutions-grid.component';
import { FAQS } from '../faqs/faqs.data';

@Component({
  selector: 'app-landing',
  imports: [
    ButtonComponent,
    AccordionComponent,
    HeroComponent,
    SolutionsGridComponent,
    BrokerComparisonComponent,
    CheckpointCtaComponent,
  ],
  template: `
    <app-hero />

    <app-solutions-grid />

    <app-broker-comparison />

    <!-- Social Proof & Métricas -->
    <section class="section metrics">
      <div class="container">
        <div class="metrics__grid">
          @for (metric of metrics; track metric.label) {
            <div class="metrics__item">
              <span class="metrics__value">{{ metric.value }}</span>
              <span class="metrics__label">{{ metric.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- FAQ Sintético -->
    <section class="section">
      <div class="container landing-faq">
        <span class="eyebrow">Preguntas frecuentes</span>
        <h2 class="section-title">Respuestas rápidas antes de cotizar</h2>
        <app-accordion [items]="landingFaqs" />
        <app-button variant="outline" href="/preguntas-frecuentes" [block]="true">
          Ver el centro de ayuda completo
        </app-button>
      </div>
    </section>

    <app-checkpoint-cta />
  `,
  styles: [
    `
      .metrics {
        background: var(--color-surface);
        border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
      }
      .metrics__grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        text-align: center;
      }
      .metrics__value {
        display: block;
        font-family: var(--font-heading);
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 800;
        color: var(--color-primary);
      }
      .metrics__label {
        font-size: 0.95rem;
        color: var(--color-muted);
        font-weight: 600;
      }
      .landing-faq {
        max-width: 820px;
      }
      .landing-faq app-accordion {
        display: block;
        margin-bottom: 1.5rem;
      }
      @media (max-width: 700px) {
        .metrics__grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class LandingComponent {
  // Métricas de respaldo (social proof).
  readonly metrics = [
    { value: '+10 años', label: 'experiencia en seguros laborales' },
    { value: '+150 empresas', label: 'protegidas en todo el Perú' },
    { value: '99.8%', label: 'emisiones entregadas a tiempo' },
  ];

  // Síntesis de 4 preguntas clave para el home (fuente única: faqs.data.ts).
  readonly landingFaqs = FAQS.slice(0, 4).map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));
}
