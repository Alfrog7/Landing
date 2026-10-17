import { WhatsAppService } from '../../core/services/whatsapp.service';
import { INSURERS } from '../../core/data/insurers.data';

const CHANNEL = 'Línea de la corredora + soporte digital y WhatsApp';

const urgentUrl = (insurerName: string): string =>
  WhatsAppService.buildGenericUrl(
    `solicito soporte urgente de emisión o constancia de garita (aseguradora ${insurerName}).`
  );

export function InsurersMatrix() {
  return (
    <app-insurers-matrix>
      <div class="matrix">
        <table>
          <caption>Canales de asistencia y soporte de emergencia según aseguradora.</caption>
          <thead>
            <tr>
              <th scope="col">Aseguradora</th>
              <th scope="col">Canal de asistencia</th>
              <th scope="col">Soporte urgente</th>
            </tr>
          </thead>
          <tbody>
            {INSURERS.map((insurer) => [
              <tr key={insurer.id}>
                <td>
                  <img src={insurer.logo} alt={insurer.name} />
                </td>
                <td>{CHANNEL}</td>
                <td>
                  <a href={urgentUrl(insurer.name)}>WhatsApp urgente</a>
                </td>
              </tr>,
              <tr key={`${insurer.id}-support`} class="matrix__support-row">
                <td colSpan={3}>
                  Soporte de emergencia: <strong>{insurer.supportPhone}</strong>
                </td>
              </tr>,
            ])}
          </tbody>
        </table>
      </div>
      <ul class="matrix__notes">
        <li>Con la corredora, licitamos tu cartera entre las 4 aseguradoras para el mejor precio.</li>
      </ul>
    </app-insurers-matrix>
  );
}
