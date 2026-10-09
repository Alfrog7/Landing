import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND_CONFIG } from '../../../core/config/brand.config';
import { WhatsAppService } from '../../../core/services/whatsapp.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="footer" id="contacto">
      <div class="container footer__grid">
        <div class="footer__brand">
          <img [src]="brand.assets.logoDark" [alt]="brand.brandName" class="footer__logo" />
          <p class="footer__credential">
            <strong>{{ brand.brandName }} · {{ brand.brandSubtitle }}</strong><br />
            {{ brand.ownerName }} — {{ brand.licenseId }}.<br />
            Corredora de Seguros Colegiada SBS.
          </p>
          <a
            class="footer__emergency"
            [href]="urgentUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            🚨 Soporte urgente para garitas
          </a>
        </div>

        <div class="footer__col">
          <h3>Navegación</h3>
          <a routerLink="/coberturas-sctr">Coberturas & SCTR</a>
          <a routerLink="/asesoria">Asesoría</a>
          <a routerLink="/preguntas-frecuentes">Preguntas Frecuentes</a>
          <a routerLink="/cotizador">Cotizador</a>
          <a routerLink="/agendar-cita">Agendar Cita</a>
        </div>

        <div class="footer__col">
          <h3>¡Contáctanos!</h3>
          <p class="footer__contact-item"><strong>Teléfono:</strong> {{ brand.contact.phone }}</p>
          <p class="footer__contact-item"><strong>Correo:</strong> {{ brand.contact.email }}</p>
          <p class="footer__contact-item"><strong>Horario:</strong> {{ brand.contact.schedule }}</p>
          <p class="footer__contact-item"><strong>Ubicación:</strong> {{ brand.contact.location }}</p>
        </div>

        <div class="footer__col">
          <h3>Aseguradoras aliadas</h3>
          <div class="footer__insurers">
            @for (insurer of brand.insurers; track insurer.id) {
              <img [src]="insurer.logo" [alt]="insurer.name" class="footer__insurer-logo" />
            }
          </div>
          <div class="footer__legal">
            <a href="#" disabled aria-disabled="true" title="Disponible próximamente">Canal de denuncias SBS</a>
            <a href="#" disabled aria-disabled="true" title="Disponible próximamente">Política de Privacidad</a>
            <a href="#" disabled aria-disabled="true" title="Disponible próximamente">Términos y Condiciones</a>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <p>© {{ year }} {{ brand.ownerName }}. {{ brand.roleTitle }} — {{ brand.licenseId }}. Todos los derechos reservados.</p>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: var(--color-footer);
        color: rgba(255, 255, 255, 0.78);
        margin-top: 0;
        padding-top: 3.5rem;
        padding-bottom: 2rem;
      }
      .footer__grid {
        display: grid;
        grid-template-columns: 1.4fr 1fr 1.1fr 1.2fr;
        gap: 2.5rem;
        padding: 0 0 2rem;
      }
      .footer__brand {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .footer__logo {
        height: 38px;
        width: auto;
      }
      .footer__credential {
        font-size: 0.9rem;
        line-height: 1.55;
        margin: 0;
        color: rgba(255, 255, 255, 0.78);
      }
      .footer__credential strong {
        color: #fff;
        font-family: var(--font-heading);
        font-size: 1.1rem;
      }
      .footer__emergency {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.55rem 1rem;
        border-radius: var(--radius-sm);
        background: var(--color-whatsapp);
        color: #fff;
        font-weight: 700;
        font-size: 0.85rem;
        justify-self: flex-start;
      }
      .footer__emergency:hover {
        background: var(--color-whatsapp-dark);
      }
      .footer h3 {
        color: #fff;
        font-size: 1rem;
        margin-bottom: 0.9rem;
      }
      .footer__col {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .footer__col a {
        color: rgba(255, 255, 255, 0.78);
        font-size: 0.9rem;
      }
      .footer__col a:hover {
        color: #fff;
      }
      .footer__contact-item {
        margin: 0;
        font-size: 0.9rem;
      }
      .footer__legal {
        margin-top: auto;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        border-top: 1px solid rgba(255, 255, 255, 0.15);
        padding-top: 1rem;
      }
      .footer__insurers {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }
      .footer__insurer-logo {
        height: 28px;
        width: auto;
        background: #fff;
        border-radius: 6px;
        padding: 4px;
      }
      .footer__bottom {
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        padding: 1.2rem 0;
      }
      .footer__bottom p {
        margin: 0 auto;
        width: min(1180px, 92%);
        font-size: 0.78rem;
        color: rgba(255, 255, 255, 0.55);
      }
      .footer a[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
      }
      @media (max-width: 900px) {
        .footer__grid {
          grid-template-columns: 1fr 1fr;
        }
      }
      @media (max-width: 560px) {
        .footer__grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class FooterComponent {
  private readonly whatsapp = inject(WhatsAppService);

  readonly brand = BRAND_CONFIG;
  readonly year = new Date().getFullYear();
  readonly urgentUrl = this.whatsapp.buildUrgentCheckpointUrl();
}
