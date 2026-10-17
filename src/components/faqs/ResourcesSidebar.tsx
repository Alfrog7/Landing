import { Button } from '../ui/Button';
import { RESOURCES } from '../../core/data/faqs.data';

export function ResourcesSidebar() {
  return (
    <app-resources-sidebar>
      <div class="sidebar">
        <h3>Recursos útiles</h3>
        <p>Formatos de descarga directa para tu gestión de planilla:</p>
        <ul>
          {RESOURCES.map((resource) => (
            <li key={resource.label}>
              <a href={resource.href}>
                <strong>{resource.label}</strong>
                <span>{resource.description}</span>
              </a>
            </li>
          ))}
        </ul>
        <hr />
        <h4>¿Sigues con dudas?</h4>
        <p class="sidebar__cta">Agenda una asesoría ejecutiva de 15 minutos con la corredora.</p>
        <Button variant="primary" href="/agendar-cita" block>
          Agendar videollamada
        </Button>
      </div>
    </app-resources-sidebar>
  );
}
