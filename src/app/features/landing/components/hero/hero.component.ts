import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND_CONFIG } from '../../../../core/config/brand.config';
import { WhatsAppService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="container hero__grid">
        <div class="hero__copy">
          <span class="hero__badge">
            {{ brand.supervisionBadge }} · {{ brand.roleTitle }} · {{ brand.licenseId }}
          </span>
          <h1 class="hero__title">
            Protege tu empresa y a tu equipo con <em>seguros laborales</em> al día
          </h1>
          <p class="hero__lead">
            Cotizamos tu SCTR Salud y Pensión, Seguro Vida Ley y pólizas empresariales
            multimarca. Emisión express para pases de garita y acompañamiento directo
            en cada siniestro.
          </p>
          <div class="hero__ctas">
            <a routerLink="/cotizador" class="hero__cta-primary">Cotizar ahora</a>
            <a
              class="hero__cta-whatsapp"
              [href]="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </a>
          </div>
          <ul class="hero__trust">
            <li>Emitimos en minutos pases para garitas</li>
            <li>Licitamos tu prima entre 4 aseguradoras</li>
            <li>Soporte directo con la corredora, sin call Center</li>
          </ul>
        </div>
        <div class="hero__media">
          <img [src]="brand.assets.advisorPhoto" [alt]="brand.brandName + ', ' + brand.roleTitle" />
          <div class="hero__card">
            <strong>{{ brand.brandName }}</strong>
            <span>{{ brand.licenseId }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        background: linear-gradient(180deg, #f2f5fb 0%, var(--color-bg) 100%);
        padding: clamp(3rem, 8vw, 6rem) 0;
      }
      .hero__grid {
        display: grid;
        grid-template-columns: 1.15fr 0.85fr;
        gap: 3rem;
        align-items: center;
      }
      .hero__badge {
        display: inline-block;
        background: rgba(25, 82, 190, 0.1);
        color: var(--color-primary);
        font-size: 0.78rem;
        font-weight: 700;
        padding: 0.4rem 0.9rem;
        border-radius: 999px;
        margin-bottom: 1.2rem;
      }
      .hero__title {
        font-size: clamp(2.1rem, 5vw, 3.4rem);
        font-weight: 800;
        margin-bottom: 1rem;
      }
      .hero__title em {
        color: var(--color-primary);
        font-style: italic;
      }
      .hero__lead {
        font-size: 1.08rem;
        max-width: 55ch;
        margin-bottom: 2rem;
      }
      .hero__ctas {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-bottom: 1.8rem;
      }
      .hero__cta-primary,
      .hero__cta-whatsapp {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.85rem 1.7rem;
        border-radius: var(--radius-sm);
        font-weight: 700;
        font-size: 1rem;
      }
      .hero__cta-primary {
        background: var(--color-primary);
        color: #fff;
      }
      .hero__cta-primary:hover {
        background: var(--color-primary-dark);
      }
      .hero__cta-whatsapp {
        background: var(--color-whatsapp);
        color: #fff;
      }
      .hero__cta-whatsapp:hover {
        background: var(--color-whatsapp-dark);
      }
      .hero__trust {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.4rem;
      }
      .hero__trust li::before {
        content: '✓';
        color: var(--color-whatsapp);
        font-weight: 800;
        margin-right: 0.5rem;
      }
      .hero__media {
        position: relative;
        max-width: 340px;
        justify-self: center;
      }
      .hero__media img {
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-lg);
        width: 100%;
      }
      .hero__card {
        position: absolute;
        left: -1.5rem;
        bottom: -1.25rem;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
        padding: 0.8rem 1.2rem;
        display: flex;
        flex-direction: column;
      }
      .hero__card strong {
        color: var(--color-heading);
        font-family: var(--font-heading);
      }
      .hero__card span {
        font-size: 0.78rem;
        color: var(--color-primary);
        font-weight: 700;
      }
      @media (max-width: 900px) {
        .hero__grid {
          grid-template-columns: 1fr;
        }
        .hero__media {
          max-width: 280px;
        }
      }
    `,
  ],
})
export class HeroComponent {
  readonly brand = BRAND_CONFIG;
  readonly whatsappUrl: string;

  constructor(whatsapp: WhatsAppService) {
    this.whatsappUrl = whatsapp.buildGenericUrl(
      'quisiera asesoria para cotizar los seguros obligatorios de mi empresa.'
    );
  }
}
