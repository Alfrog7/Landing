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
          <caption>
            Tiempos promedio de emisión de constancias para pases de garita y canales de asistencia según aseguradora.
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
            {INSURERS.map((insurer) => [
              <tr key={insurer.id}>
                <td>
                  <img src={insurer.logo} alt={insurer.name} />
                </td>
                <td>
                  <strong>~{insurer.averageEmissionTimeMinutes} min</strong>
                </td>
                <td>{CHANNEL}</td>
                <td>
                  <a href={urgentUrl(insurer.name)}>WhatsApp urgente</a>
                </td>
              </tr>,
              <tr key={`${insurer.id}-support`} class="matrix__support-row">
                <td colSpan={4}>
                  Soporte de emergencia: <strong>{insurer.supportPhone}</strong>
                </td>
              </tr>,
            ])}
          </tbody>
        </table>
      </div>
      <ul class="matrix__notes">
        <li>Los tiempos dependen de la validación de planilla y pago de prima.</li>
        <li>Con la corredora, licitamos tu cartera entre las 4 aseguradoras para el mejor precio.</li>
      </ul>
    </app-insurers-matrix>
  );
}
