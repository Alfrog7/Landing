import { Component } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-sctr-breakdown',
  imports: [CardComponent],
  template: `
    <div class="breakdown__cards">
      <app-card>
        <article>
          <span class="breakdown__tag breakdown__tag--salud">SCTR Salud</span>
          <h3>Atención médica y rehabilitación</h3>
          <p>
            Ampara la asistencia sanitaria esencial tras accidentes de trabajo o enfermedades
            profesionales, incluyendo hospitalización, cirugías, medicamentos y fisioterapia
            hasta la recuperación.
          </p>
          @for (item of salud; track item) {
            <p class="breakdown__item">✓ {{ item }}</p>
          }
        </article>
      </app-card>
      <app-card>
        <article>
          <span class="breakdown__tag breakdown__tag--pension">SCTR Pensión</span>
          <h3>Invalidez y sobrevivencia</h3>
          <p>
            Brinda rentas para el trabajador y su familia ante invalidez parcial o total y
            fallecimiento derivados de un accidente laboral o enfermedad profesional.
          </p>
          @for (item of pension; track item) {
            <p class="breakdown__item">✓ {{ item }}</p>
          }
        </article>
      </app-card>
    </div>
  `,
  styles: [
    `
      .breakdown__cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
      }
      .breakdown__tag {
        display: inline-block;
        padding: 0.3rem 0.8rem;
        border-radius: 999px;
        font-size: 0.78rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      .breakdown__tag--salud {
        background: rgba(25, 82, 190, 0.12);
        color: var(--color-primary);
      }
      .breakdown__tag--pension {
        background: rgba(10, 29, 55, 0.1);
        color: var(--color-secondary);
      }
      .breakdown h3 {
        font-size: 1.2rem;
      }
      .breakdown__item {
        margin: 0.3rem 0 0;
        font-weight: 600;
        color: var(--color-heading);
        font-size: 0.92rem;
      }
      @media (max-width: 800px) {
        .breakdown__cards {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class SctrBreakdownComponent {
  readonly salud = [
    'Cobertura inmediata ante siniestros en garitas y frentes de obra',
    'Red de clínicas y centros médicos conveniados',
    'Traslados y atención de urgencias 24/7 según aseguradora',
  ];
  readonly pension = [
    'Pensión de invalidez total y parcial',
    'Pensión de viudez y orfandad (sobrevivencia)',
    'Gastos de sepelio según condición de póliza',
  ];
}
