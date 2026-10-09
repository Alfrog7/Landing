import { Component } from '@angular/core';

interface ComparisonRow {
  feature: string;
  broker: string;
  traditional: string;
}

@Component({
  selector: 'app-broker-comparison',
  template: `
    <section class="section comparison">
      <div class="container">
        <div class="text-center comparison__intro">
          <span class="eyebrow">Valor diferencial</span>
          <h2 class="section-title">Corredora colegiada vs. canal telefónico tradicional</h2>
          <p>
            Con una corredora tienen un agente propio que licita, emite y responde ante
            siniestros; con el canal tradicional, una empresa espera turnos.
          </p>
        </div>
        <div class="comparison__table" role="table" aria-label="Comparación de canales de trabajo">
          <div class="comparison__head" role="row">
            <span role="columnheader">Concepto</span>
            <span role="columnheader" class="comparison__us">Con la corredora</span>
            <span role="columnheader">Canal telefónico tradicional</span>
          </div>
          @for (row of rows; track row.feature) {
            <div class="comparison__row" role="row">
              <span role="cell" class="comparison__feature">{{ row.feature }}</span>
              <span role="cell" class="comparison__us" [innerHTML]="row.broker"></span>
              <span role="cell" class="comparison__them">{{ row.traditional }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .comparison {
        background: var(--color-surface);
        border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
      }
      .comparison__intro {
        max-width: 680px;
        margin: 0 auto 2.8rem;
      }
      .comparison__table {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        overflow: hidden;
        background: var(--color-bg);
      }
      .comparison__head,
      .comparison__row {
        display: grid;
        grid-template-columns: 1.2fr 1fr 1fr;
        gap: 1rem;
        padding: 0.95rem 1.3rem;
        align-items: center;
      }
      .comparison__head {
        background: var(--color-secondary);
        color: #fff;
        font-weight: 700;
        font-size: 0.9rem;
      }
      .comparison__row {
        border-top: 1px solid var(--color-border);
        font-size: 0.92rem;
      }
      .comparison__us {
        color: var(--color-heading);
        font-weight: 700;
      }
      .comparison__head .comparison__us {
        color: #7fa9f0;
      }
      .comparison__feature {
        color: var(--color-heading);
        font-weight: 600;
      }
      .comparison__them {
        color: var(--color-muted);
      }
      @media (max-width: 720px) {
        .comparison__head {
          display: none;
        }
        .comparison__row {
          grid-template-columns: 1fr;
          gap: 0.25rem;
        }
        .comparison__feature::before {
          content: 'Criterio: ';
          font-weight: 700;
          color: var(--color-primary);
        }
        .comparison__us::before {
          content: 'Con la corredora: ';
          font-weight: 700;
          color: var(--color-whatsapp);
        }
        .comparison__them::before {
          content: 'Canal tradicional: ';
          font-weight: 700;
          color: var(--color-muted);
        }
      }
    `,
  ],
})
export class BrokerComparisonComponent {
  readonly rows: ComparisonRow[] = [
    {
      feature: 'Asignación personalizada',
      broker: 'Una corredora ejecutiva con contacto directo y seguimiento de su cuenta.',
      traditional: 'Colas de espera y asesores rotativos en cada llamada.',
    },
    {
      feature: 'Emisión para garitas',
      broker: 'Emisión en minutos del mismo día una vez cerrada la validación.',
      traditional: 'Publicados plazos de 24 a 72 horas hábiles.',
    },
    {
      feature: 'Respuesta ante siniestros',
      broker: 'Acompañamiento del caso ante la aseguradora como agente del contratante.',
      traditional: 'El ejecutivo informa y deja la gestión a su propia empresa.',
    },
    {
      feature: 'Licitud de primas',
      broker: 'Licitación anual multimarca de SCTR, Vida Ley y pólizas complementarias.',
      traditional: 'Tarifa fija de una sola aseguradora sin benchmark.',
    },
    {
      feature: 'Costo del servicio',
      broker: 'Sin sobrecosto: la comisión la paga la aseguradora al cierre.',
      traditional: 'Canales de telefonía con costos ocultos en la prima final.',
    },
  ];
}
