import { Component } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-vida-ley-card',
  imports: [CardComponent],
  template: `
    <app-card>
      <article class="vida">
        <div class="vida__head">
          <span class="vida__icon" aria-hidden="true">🛡️</span>
          <div>
            <h3>Seguro Vida Ley</h3>
            <p>D.Leg. 817 — obligatorio para todo el personal en planilla, desde el primer día de ingreso.</p>
          </div>
        </div>
        <ul class="vida__list">
          @for (cover of coberturas; track cover.title) {
            <li>
              <strong>{{ cover.title }}</strong>
              <span>{{ cover.detail }}</span>
            </li>
          }
        </ul>
        <p class="vida__note">
          Gestión mensual de altas y bajas por planilla y certificados individuales incluidos
          con la corredora.
        </p>
      </article>
    </app-card>
  `,
  styles: [
    `
      .vida__head {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        margin-bottom: 1.2rem;
      }
      .vida__head h3 {
        margin: 0 0 0.3rem;
        font-size: 1.3rem;
      }
      .vida__head p {
        margin: 0;
        font-size: 0.92rem;
      }
      .vida__icon {
        font-size: 2.2rem;
      }
      .vida__list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.75rem;
      }
      .vida__list li {
        border-left: 3px solid var(--color-primary);
        padding: 0.4rem 0 0.4rem 0.9rem;
        background: rgba(25, 82, 190, 0.04);
        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      }
      .vida__list strong {
        display: block;
        color: var(--color-heading);
        font-size: 0.95rem;
      }
      .vida__list span {
        font-size: 0.87rem;
        color: var(--color-body);
      }
      .vida__note {
        margin: 1.2rem 0 0;
        font-size: 0.85rem;
        color: var(--color-muted);
      }
    `,
  ],
})
export class VidaLeyCardComponent {
  readonly coberturas = [
    { title: 'Muerte por cualquier causa', detail: 'Beneficio pagado al grupo de sobrevivencia del trabajador.' },
    { title: 'Muerte accidental', detail: 'Doble indemnización en caso de fallecimiento en accidente.' },
    { title: 'Invalidez total y permanente', detail: 'Capital asegurado ante pérdida total de capacidad laboral.' },
  ];
}
