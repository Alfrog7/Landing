import { Component } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RESOURCES } from '../../faqs.data';

@Component({
  selector: 'app-resources-sidebar',
  imports: [CardComponent, ButtonComponent],
  template: `
    <app-card>
      <div class="sidebar">
        <h3>Recursos útiles</h3>
        <p>Formatos de descarga directa para tu gestión de planilla:</p>
        <ul>
          @for (resource of resources; track resource.label) {
            <li>
              <a [href]="resource.href">
                <strong>{{ resource.label }}</strong>
                <span>{{ resource.description }}</span>
              </a>
            </li>
          }
        </ul>
        <hr />
        <h4>¿Sigues con dudas?</h4>
        <p class="sidebar__cta">
          Agenda una asesoría ejecutiva de 15 minutos con la corredora.
        </p>
        <app-button variant="primary" href="/agendar-cita" [block]="true">
          Agendar videollamada
        </app-button>
      </div>
    </app-card>
  `,
  styles: [
    `
      .sidebar h3 {
        font-size: 1.15rem;
        margin-bottom: 0.3rem;
      }
      .sidebar h4 {
        font-size: 1rem;
      }
      .sidebar p {
        font-size: 0.88rem;
        color: var(--color-muted);
        margin: 0 0 0.9rem;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.8rem;
      }
      ul a {
        display: block;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        padding: 0.8rem 1rem;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      ul a:hover {
        border-color: var(--color-primary);
        box-shadow: var(--shadow-sm);
      }
      ul a strong {
        display: block;
        color: var(--color-heading);
        font-size: 0.92rem;
      }
      ul a span {
        font-size: 0.8rem;
        color: var(--color-muted);
      }
      hr {
        border: 0;
        border-top: 1px solid var(--color-border);
        margin: 1.3rem 0;
      }
      .sidebar__cta {
        margin-bottom: 0.8rem;
      }
    `,
  ],
})
export class ResourcesSidebarComponent {
  readonly resources = RESOURCES;
}
