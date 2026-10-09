import { Component, inject } from '@angular/core';
import { WhatsAppService } from '../../../../core/services/whatsapp.service';
import { INSURERS } from '../../insurers.data';

@Component({
  selector: 'app-insurers-matrix',
  template: `
    <div class="matrix">
      <table>
        <caption>
          Tiempos promedio de emisión de constancias para pases de garita y canales de
          asistencia según aseguradora.
        </caption>
        <thead>
          <tr>
            <th scope="col">Aseguradora</th>
            <th scope="col">Emisión pases de garita</th>
            <th scope="col">Canal de asistencia</th>
            <th scope="col">Soporte urgente</th>
          </tr>
        </thead>
        <tbody>
          @for (insurer of insurers; track insurer.id) {
            <tr>
              <td><img [src]="insurer.logo" [alt]="insurer.name" /></td>
              <td><strong>~{{ insurer.averageEmissionTimeMinutes }} min</strong></td>
              <td>{{ channel }}</td>
              <td>
                <a [href]="urgentUrl(insurer.name)">WhatsApp urgente</a>
              </td>
            </tr>
            <tr class="matrix__support-row">
              <td colspan="4">
                Soporte de emergencia: <strong>{{ insurer.supportPhone }}</strong>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    <ul class="matrix__notes">
      <li>Los tiempos dependen de la validación de planilla y pago de prima.</li>
      <li>Con la corredora, licitamos tu cartera entre las 4 aseguradoras para el mejor precio.</li>
    </ul>
  `,
  styles: [
    `
      .matrix {
        overflow-x: auto;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        background: var(--color-surface);
      }
      table {
        width: 100%;
        border-collapse: collapse;
        min-width: 700px;
      }
      caption {
        text-align: left;
        padding: 1.1rem 1.3rem;
        font-size: 0.85rem;
        color: var(--color-muted);
        border-bottom: 1px solid var(--color-border);
      }
      thead tr {
        background: var(--color-secondary);
        color: #fff;
        text-align: left;
        font-size: 0.85rem;
      }
      th {
        padding: 0.9rem 1.3rem;
        font-weight: 700;
      }
      td {
        padding: 0.85rem 1.3rem;
        border-top: 1px solid var(--color-border);
        vertical-align: middle;
        font-size: 0.92rem;
      }
      td img {
        height: 30px;
        width: auto;
      }
      .matrix__support-row td {
        font-size: 0.8rem;
        color: var(--color-muted);
        background: var(--color-bg);
      }
      td a {
        font-weight: 700;
        color: var(--color-whatsapp);
      }
      .matrix__notes {
        margin: 1.1rem 0 0;
        padding-left: 1.2rem;
        font-size: 0.88rem;
        color: var(--color-muted);
        display: grid;
        gap: 0.35rem;
      }
    `,
  ],
})
export class InsurersMatrixComponent {
  readonly insurers = INSURERS;
  readonly channel = 'Línea de la corredora + soporte digital y WhatsApp';
  private readonly whatsapp = inject(WhatsAppService);

  urgentUrl(insurerName: string): string {
    return this.whatsapp.buildGenericUrl(
      `solicito soporte urgente de emisión o constancia de garita (aseguradora ${insurerName}).`
    );
  }
}
