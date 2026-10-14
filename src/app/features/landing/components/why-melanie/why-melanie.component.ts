import { Component, inject, signal } from '@angular/core';
import { LucideClock, LucideMessageCircle, LucideShieldCheck, LucideBadgeCheck } from '@lucide/angular';
import { BRAND_CONFIG } from '../../../../core/config/brand.config';
import { TranslationService } from '../../../../core/i18n/translation.service';

@Component({
  selector: 'app-why-melanie',
  imports: [LucideClock, LucideMessageCircle, LucideShieldCheck, LucideBadgeCheck],
  template: `
    <section class="section why" id="sobre-melanie">
      <div class="container why__grid">
        <article class="why__profile">
          <div class="why__photo-card">
            <img
              [src]="photoSrc()"
              (error)="onPhotoError()"
              [alt]="brand.ownerName + ', ' + brand.roleTitle"
              class="why__photo"
            />
            <span class="why__sbs-badge">
              <svg lucideBadgeCheck [size]="16" />
              {{ brand.sbsChipShort }} · Persona Natural Colegiada
            </span>
          </div>
          <h3 class="why__name">{{ brand.ownerName }}</h3>
          <p class="why__role">{{ tr.t('why.role') }} · {{ brand.licenseId }}</p>
          <p class="why__track">{{ tr.t('why.track') }}</p>
          <blockquote class="why__quote">
            “{{ brand.quote }}”
          </blockquote>
        </article>

        <div class="why__blocks">
          <h2 class="section-title why__title">{{ tr.t('why.title') }}</h2>
          <div class="why__block">
            <span class="why__icon why__icon--green">
              <svg lucideMessageCircle [size]="24" />
            </span>
            <div>
              <h3>{{ tr.t('why.block1Title') }}</h3>
              <p>
                {{ tr.t('why.block1Text') }}
              </p>
            </div>
          </div>
          <div class="why__block">
            <span class="why__icon why__icon--sky">
              <svg lucideClock [size]="24" />
            </span>
            <div>
              <h3>{{ tr.t('why.block2Title') }}</h3>
              <p>
                {{ tr.t('why.block2Text') }}
              </p>
            </div>
          </div>
          <div class="why__block">
            <span class="why__icon why__icon--orange">
              <svg lucideShieldCheck [size]="24" />
            </span>
            <div>
              <h3>{{ tr.t('why.block3Title') }}</h3>
              <p>
                {{ tr.t('why.block3Text') }}
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
        position: relative;
        z-index: 1;
      }
      .why {
        position: relative;
        background: var(--color-bg);
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
      .why__photo-card {
        position: relative;
        margin: 0 auto 1.4rem;
        max-width: 280px;
      }
      .why__photo {
        width: 100%;
        aspect-ratio: 4 / 5;
        border-radius: var(--radius-3xl);
        object-fit: cover;
        // Sombra profunda suave (shadow-xl)
        box-shadow: var(--shadow-lg);
      }
      .why__sbs-badge {
        position: absolute;
        bottom: 0.9rem;
        left: 0.9rem;
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(8px);
        border: 1px solid var(--color-border);
        border-radius: 999px;
        padding: 0.4rem 0.8rem;
        font-size: 0.72rem;
        font-weight: 700;
        color: var(--color-primary-dark);
        box-shadow: var(--shadow-md);
        white-space: nowrap;
      }
      .why__sbs-badge svg {
        color: var(--color-primary);
        flex-shrink: 0;
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
        font-size: 0.98rem;
        font-style: italic;
        font-weight: 500;
        line-height: 1.65;
        color: var(--color-heading);
        border-left: 3px solid var(--color-primary);
        padding: 0.2rem 0 0.2rem 1.1rem;
        text-align: left;
      }
      .why__title {
        margin-bottom: 1.8rem;
      }
      .why__blocks {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      .why__block {
        display: flex;
        align-items: flex-start;
        gap: 1.1rem;
        background: var(--color-surface);
        border: 1px solid #f1f5f9;
        border-radius: var(--radius-xl);
        padding: 1.25rem 1.4rem;
        box-shadow: var(--shadow-sm);
        transition: all 0.3s ease;
      }
      // Reactividad amable: trazo esmeralda + sombra flotante al pasar el cursor
      .why__block:hover {
        border-color: #6ee7b7;
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
      }
      .why__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 52px;
        border-radius: 16px;
        flex-shrink: 0;
        // Compensa el alto de línea del título para que el ícono arranque
        // a la misma altura visual que la primera línea de texto
        margin-top: -0.15rem;
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
        margin: 0 0 0.4rem;
      }
      .why__block p {
        margin: 0;
        font-size: 0.92rem;
        color: var(--color-muted);
        line-height: 1.6;
      }
      .why__block h3,
      .why__block p {
        // Alinea el borde izquierdo del texto en las 3 tarjetas
        text-align: left;
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
  readonly tr = inject(TranslationService);
  readonly brand = BRAND_CONFIG;

  // Fotografía real con fallback automático al placeholder mientras no exista el archivo
  readonly photoSrc = signal<string>(BRAND_CONFIG.assets.advisorPhotoReal);
  onPhotoError(): void {
    this.photoSrc.set(BRAND_CONFIG.assets.advisorPhoto);
  }
}
