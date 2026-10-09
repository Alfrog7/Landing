import { Component } from '@angular/core';
import { LucideShield } from '@lucide/angular';
import { INSURERS_PILLS_DATA } from '../../../../core/data/landing.data';

@Component({
  selector: 'app-insurers-logowall',
  imports: [LucideShield],
  template: `
    <section class="logowall">
      <div class="container logowall__inner">
        <p class="logowall__caption">
          Cotizamos en simultáneo con todas las entidades reguladas por la SBS
        </p>
        <span class="logowall__neutral">
          <svg lucideShield [size]="14" />
          100% independiente: asesoría personalizada y gratuita para el asegurado
        </span>
        <div class="logowall__grid">
          @for (insurer of insurers; track insurer.id) {
            <span class="logowall__pill">{{ insurer.name }}</span>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .logowall {
        padding: clamp(2.5rem, 5vw, 4rem) 0;
        background: var(--color-surface);
        border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
      }
      .logowall__inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.1rem;
        text-align: center;
      }
      .logowall__caption {
        margin: 0;
        font-size: 0.74rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--color-muted);
      }
      .logowall__neutral {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        font-size: 0.8rem;
        color: var(--color-heading);
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 999px;
        padding: 0.4rem 1rem;
      }
      .logowall__neutral svg {
        color: var(--color-primary);
      }
      .logowall__grid {
        display: flex;
        flex-wrap: nowrap;
        gap: 0.7rem;
        width: 100%;
        margin-top: 0.4rem;
      }
      .logowall__pill {
        flex: 1;
        text-align: center;
        font-size: 0.8rem;
        font-weight: 800;
        letter-spacing: 0.04em;
        color: var(--color-muted);
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 999px;
        padding: 0.6rem 0.4rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all 0.25s ease;
      }
      .logowall__pill:hover {
        color: var(--color-heading);
        border-color: var(--color-border-strong);
      }
      @media (max-width: 900px) {
        .logowall__grid {
          flex-wrap: wrap;
          justify-content: center;
        }
        .logowall__pill {
          flex: 0 1 auto;
          padding: 0.5rem 0.9rem;
        }
      }
    `,
  ],
})
export class InsurersLogowallComponent {
  readonly insurers = INSURERS_PILLS_DATA;
}
