import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhatsAppService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-checkpoint-cta',
  imports: [RouterLink],
  template: `
    <section class="checkpoint">
      <div class="container checkpoint__inner">
        <div class="checkpoint__copy">
          <span class="checkpoint__pill">⏱️ Urgencias del día</span>
          <h2>¿Tu ingreso a garita es hoy y falta la constancia?</h2>
          <p>
            Activa el soporte express para la emisión o revalidación de pases de garita en
            obras y operaciones. Atención priorizada por WhatsApp.
          </p>
        </div>
        <div class="checkpoint__actions">
          <a [href]="urgentUrl" target="_blank" rel="noopener noreferrer" class="checkpoint__btn checkpoint__btn--wa">
            Soporte urgente por WhatsApp
          </a>
          <a routerLink="/portal-clientes" class="checkpoint__btn checkpoint__btn--ghost">
            Ir al portal de constancias
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .checkpoint {
        background: #0f3c8a;
        color: #fff;
        padding: clamp(2.6rem, 6vw, 4rem) 0;
      }
      .checkpoint__inner {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 2rem;
        align-items: center;
      }
      .checkpoint__pill {
        display: inline-block;
        background: rgba(255, 255, 255, 0.14);
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 0.35rem 0.9rem;
        border-radius: 999px;
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        margin-bottom: 1rem;
      }
      .checkpoint h2 {
        color: #fff;
        font-size: clamp(1.5rem, 3.4vw, 2.3rem);
        margin-bottom: 0.6rem;
      }
      .checkpoint p {
        color: rgba(255, 255, 255, 0.82);
        max-width: 58ch;
        margin: 0;
      }
      .checkpoint__actions {
        display: grid;
        gap: 0.9rem;
      }
      .checkpoint__btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.85rem 1.5rem;
        border-radius: var(--radius-sm);
        font-weight: 700;
        font-size: 0.95rem;
      }
      .checkpoint__btn--wa {
        background: var(--color-whatsapp);
        color: #fff;
      }
      .checkpoint__btn--wa:hover {
        background: var(--color-whatsapp-dark);
      }
      .checkpoint__btn--ghost {
        border: 1px solid rgba(255, 255, 255, 0.5);
        color: #fff;
      }
      .checkpoint__btn--ghost:hover {
        background: rgba(255, 255, 255, 0.12);
      }
      @media (max-width: 820px) {
        .checkpoint__inner {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class CheckpointCtaComponent {
  readonly urgentUrl = inject(WhatsAppService).buildUrgentCheckpointUrl();
}
