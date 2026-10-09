import { Component, inject } from '@angular/core';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BRAND_CONFIG } from '../../../../core/config/brand.config';
import { WhatsAppService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-advisor-hero',
  imports: [BadgeComponent, CardComponent, ButtonComponent],
  template: `
    <section class="advisor">
      <div class="container advisor__grid">
        <div class="advisor__media">
          <img [src]="brand.assets.advisorPhoto" [alt]="brand.brandName + ', ' + brand.roleTitle" />
        </div>
        <div class="advisor__copy">
          <span class="eyebrow">Perfil de autoridad</span>
          <h1>{{ brand.brandName }}</h1>
          <p class="advisor__role">{{ brand.roleTitle }} · {{ brand.licenseId }}</p>
          <p class="advisor__bio">
            Con más de una década asesorando a empresas en construcción, ingeniería y minería,
            he consolidado un enfoque netamente consultivo:             licito tu póliza entre las
            principales aseguradoras del mercado, negocio la prima y respondo por tu equipo en
            cada siniestro, todo sin costo adicional para tu empresa.
          </p>
          <div class="advisor__badges">
            <app-badge variant="primary">{{ brand.licenseId }}</app-badge>
            <app-badge variant="secondary">{{ brand.supervisionBadge }}</app-badge>
            <app-badge variant="whatsapp">Respuesta en menos de 24h</app-badge>
          </div>
          <div class="advisor__highlights">
            <app-card class="highlight">
              <strong>+150 empresas</strong>
              <span>patrocinadas en portafolio gestionado</span>
            </app-card>
            <app-card class="highlight">
              <strong>Sectores regulados</strong>
              <span>minero, construcción y energía</span>
            </app-card>
            <app-card class="highlight">
              <strong>Costo cero</strong>
              <span>la comisión la paga la aseguradora</span>
            </app-card>
          </div>
          <div class="advisor__ctas">
            <app-button variant="primary" href="/agendar-cita">Agendar asesoría de 15 min</app-button>
            <app-button variant="whatsapp" [href]="whatsappUrl" [target]="'_blank'">
              Consultar por WhatsApp
            </app-button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .advisor {
        padding: clamp(3rem, 7vw, 5rem) 0;
      }
      .advisor__grid {
        display: grid;
        grid-template-columns: 0.8fr 1.2fr;
        gap: 3rem;
        align-items: start;
      }
      .advisor__media {
        position: sticky;
        top: 90px;
      }
      .advisor__media img {
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-lg);
        width: 100%;
      }
      h1 {
        font-size: clamp(2rem, 4.5vw, 3rem);
        margin-bottom: 0.3rem;
      }
      .advisor__role {
        color: var(--color-primary);
        font-weight: 700;
        margin: 0 0 1.2rem;
      }
      .advisor__bio {
        margin-bottom: 1.5rem;
        font-size: 1.02rem;
      }
      .advisor__badges {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        margin-bottom: 1.8rem;
      }
      .advisor__highlights {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.9rem;
        margin-bottom: 1.8rem;
      }
      .highlight {
        padding: 1rem;
      }
      .highlight strong {
        display: block;
        font-family: var(--font-heading);
        color: var(--color-primary);
        font-size: 1.05rem;
      }
      .highlight span {
        font-size: 0.82rem;
        color: var(--color-muted);
      }
      .advisor__ctas {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      @media (max-width: 900px) {
        .advisor__grid {
          grid-template-columns: 1fr;
        }
        .advisor__media {
          position: static;
          max-width: 280px;
        }
        .advisor__highlights {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AdvisorHeroComponent {
  readonly brand = BRAND_CONFIG;
  readonly whatsappUrl = inject(WhatsAppService).buildGenericUrl(
    'quisiera conversar con la corredora sobre las coberturas de mi empresa.'
  );
}
