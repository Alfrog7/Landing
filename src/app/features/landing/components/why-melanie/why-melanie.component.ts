import { Component } from '@angular/core';
import { LucideClock, LucideMessageCircle, LucideShieldCheck } from '@lucide/angular';
import { BRAND_CONFIG } from '../../../../core/config/brand.config';

@Component({
  selector: 'app-why-melanie',
  imports: [LucideClock, LucideMessageCircle, LucideShieldCheck],
  template: `
    <section class="section why" id="sobre-melanie">
      <div class="container why__grid">
        <article class="why__profile">
          <img
            [src]="brand.assets.advisorPhoto"
            [alt]="brand.ownerName + ', ' + brand.roleTitle"
            class="why__photo"
          />
          <h3 class="why__name">{{ brand.ownerName }}</h3>
          <p class="why__role">{{ brand.roleTitle }} · {{ brand.licenseId }}</p>
          <p class="why__track">15+ Años de Experiencia Colegiada</p>
          <blockquote class="why__quote">
            “{{ brand.quote }}”
          </blockquote>
        </article>

        <div class="why__blocks">
          <h2 class="section-title why__title">¿Por qué asesorarte con {{ brand.ownerName.split(' ')[0] }} Silva?</h2>
          <div class="why__block">
            <span class="why__icon why__icon--green">
              <svg lucideMessageCircle [size]="24" />
            </span>
            <div>
              <h3>Trato 100% directo y humano</h3>
              <p>
                Hablas directamente con {{ brand.ownerName.split(' ')[0] }} por WhatsApp o llamada,
                sin bots impersonales ni conmutadores telefónicos ante urgencias.
              </p>
            </div>
          </div>
          <div class="why__block">
            <span class="why__icon why__icon--sky">
              <svg lucideClock [size]="24" />
            </span>
            <div>
              <h3>Emisión express de constancias y cartas fianza</h3>
              <p>
                Entrega en menos de 2 horas para garitas mineras, pases de contratistas y
                firmas con el Estado.
              </p>
            </div>
          </div>
          <div class="why__block">
            <span class="why__icon why__icon--orange">
              <svg lucideShieldCheck [size]="24" />
            </span>
            <div>
              <h3>Respaldo colegiado regulado ante la SBS</h3>
              <p>
                Asesoría técnica sin costo para el cliente; las aseguradoras reconocen la
                comisión según ley, garantizando imparcialidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .why__grid {
        display: grid;
        grid-template-columns: 0.85fr 1.15fr;
        gap: 3rem;
        align-items: start;
      }
      .why {
        background: var(--color-bg);
        border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
      }
      .why__profile {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-3xl);
        box-shadow: var(--shadow-md);
        padding: 2rem;
        text-align: center;
        position: sticky;
        top: 6rem;
      }
      .why__photo {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        object-fit: cover;
        margin: 0 auto 1.2rem;
        border: 4px solid var(--color-primary-light);
      }
      .why__name {
        font-size: 1.35rem;
        font-weight: 800;
        color: var(--color-heading);
        margin: 0 0 0.3rem;
      }
      .why__role {
        font-size: 0.88rem;
        font-weight: 700;
        color: var(--color-primary-dark);
        margin: 0 0 0.35rem;
      }
      .why__track {
        font-size: 0.84rem;
        font-weight: 600;
        color: var(--color-muted);
        margin: 0 0 1.2rem;
      }
      .why__quote {
        margin: 0;
        font-size: 0.92rem;
        font-style: italic;
        line-height: 1.65;
        color: var(--color-body);
        border-top: 1px dashed var(--color-border);
        padding-top: 1.2rem;
        text-align: left;
      }
      .why__title {
        margin-bottom: 1.8rem;
      }
      .why__blocks {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .why__block {
        display: flex;
        gap: 1.1rem;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-3xl);
        box-shadow: var(--shadow-md);
        padding: 1.5rem;
        transition: box-shadow 0.3s ease;
      }
      .why__block:hover {
        box-shadow: var(--shadow-card-hover);
      }
      .why__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 52px;
        border-radius: 16px;
        flex-shrink: 0;
      }
      .why__icon--green {
        background: var(--color-primary-light);
        color: var(--color-primary-dark);
      }
      .why__icon--sky {
        background: var(--color-sky-light);
        color: var(--color-sky);
      }
      .why__icon--orange {
        background: var(--color-orange-light);
        color: var(--color-orange);
      }
      .why__block h3 {
        font-size: 1.05rem;
        font-weight: 800;
        color: var(--color-heading);
        margin: 0.15rem 0 0.4rem;
      }
      .why__block p {
        margin: 0;
        font-size: 0.92rem;
        color: var(--color-muted);
        line-height: 1.6;
      }
      @media (max-width: 900px) {
        .why__grid {
          grid-template-columns: 1fr;
        }
        .why__profile {
          position: static;
          max-width: 420px;
          margin: 0 auto;
        }
      }
    `,
  ],
})
export class WhyMelanieComponent {
  readonly brand = BRAND_CONFIG;
}
