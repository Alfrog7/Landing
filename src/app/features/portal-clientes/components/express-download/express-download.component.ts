import { Component, inject, input, output } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { WhatsAppService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-express-download',
  imports: [CardComponent, ButtonComponent],
  template: `
    <div class="express">
      <header class="express__head">
        <div>
          <h1>Autogestión</h1>
          <p>Empresa RUC {{ ruc() }} · Acceso activo con la corredora.</p>
        </div>
        <app-button variant="outline" type="button" (pressed)="logout.emit()">Cerrar sesión</app-button>
      </header>

      <div class="express__grid">
        <app-card>
          <article class="access">
            <span class="access__icon" aria-hidden="true">🎫</span>
            <h2>Constancia SCTR vigente</h2>
            <p>Descarga la última constancia emitida para presentación en garitas de ingreso.</p>
            <app-button variant="primary" [href]="constancyUrl" [target]="'_blank'" [block]="true">
              Descargar express
            </app-button>
          </article>
        </app-card>
        <app-card>
          <article class="access">
            <span class="access__icon" aria-hidden="true">📥</span>
            <h2>Movimientos de planilla</h2>
            <p>Solicitud de inclusión o exclusión de trabajadores en la nómina mensual del seguro.</p>
            <app-button variant="outline" [href]="payrollUrl" [target]="'_blank'" [block]="true">
              Solicitar movimiento
            </app-button>
          </article>
        </app-card>
        <app-card>
          <article class="access access--urgent">
            <span class="access__icon" aria-hidden="true">🚨</span>
            <h2>Incidencias en garita</h2>
            <p>Canal prioritario cuando hay un problema con el pase de ingreso de tu personal en obra.</p>
            <app-button variant="whatsapp" [href]="urgentUrl" [target]="'_blank'" [block]="true">
              Atención prioritaria
            </app-button>
          </article>
        </app-card>
      </div>
    </div>
  `,
  styles: [
    `
      .express__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.6rem;
        flex-wrap: wrap;
      }
      .express__head h1 {
        margin: 0;
        font-size: 1.6rem;
      }
      .express__head p {
        margin: 0;
        color: var(--color-muted);
        font-size: 0.9rem;
      }
      .express__grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.3rem;
      }
      .access {
        display: grid;
        gap: 0.6rem;
        height: 100%;
        align-content: start;
      }
      .access__icon {
        font-size: 1.9rem;
      }
      .access h2 {
        font-size: 1.15rem;
        margin: 0;
      }
      .access p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-body);
        flex: 1;
      }
      .access--urgent {
        border-top: 3px solid var(--color-whatsapp);
        border-radius: 0 0 var(--radius-lg) var(--radius-lg);
      }
      @media (max-width: 900px) {
        .express__grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class ExpressDownloadComponent {
  readonly ruc = input.required<string>();
  readonly logout = output<void>();

  private readonly whatsapp = inject(WhatsAppService);

  readonly constancyUrl = this.whatsapp.buildGenericUrl(
    'solicito la constancia SCTR vigente para garita de mi empresa.'
  );
  readonly payrollUrl = this.whatsapp.buildGenericUrl(
    'solicito un movimiento (inclusión/exclusión) en la planilla mensual de mi póliza.'
  );
  readonly urgentUrl = this.whatsapp.buildUrgentCheckpointUrl();
}
