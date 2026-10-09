import {
  Component,
  afterNextRender,
  effect,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { EmblaCarouselDirective } from 'embla-carousel-angular';
import { EmblaEventType } from 'embla-carousel';
import {
  LucideCar,
  LucideChevronLeft,
  LucideChevronRight,
  LucideFileText,
  LucideHammer,
  LucideHeartPulse,
  LucidePiggyBank,
  LucidePlane,
  LucideShieldCheck,
  LucideUsers,
} from '@lucide/angular';
import {
  AudienceCategory,
  InsuranceService,
} from '../../../../core/models/insurance-service.model';
import { INSURANCE_SERVICES_DATA } from '../../../../core/data/landing.data';

@Component({
  selector: 'app-solution-card',
  imports: [
    LucideCar,
    LucideFileText,
    LucideHammer,
    LucideHeartPulse,
    LucidePiggyBank,
    LucidePlane,
    LucideShieldCheck,
    LucideUsers,
  ],
  template: `
    <article class="card" (click)="quotePressed.emit(service())">
      <header class="card__head">
        <span class="card__icon" [class]="'card__icon--' + service().badge.variant">
          @switch (service().icon) {
            @case ('file-text') {
              <svg lucideFileText [size]="22" />
            }
            @case ('shield-check') {
              <svg lucideShieldCheck [size]="22" />
            }
            @case ('users') {
              <svg lucideUsers [size]="22" />
            }
            @case ('hammer') {
              <svg lucideHammer [size]="22" />
            }
            @case ('piggy-bank') {
              <svg lucidePiggyBank [size]="22" />
            }
            @case ('heart-pulse') {
              <svg lucideHeartPulse [size]="22" />
            }
            @case ('car') {
              <svg lucideCar [size]="22" />
            }
            @case ('plane') {
              <svg lucidePlane [size]="22" />
            }
          }
        </span>
        <span class="card__badge" [class]="'card__badge--' + service().badge.variant">
          {{ service().badge.text }}
        </span>
      </header>
      <h3 class="card__title">{{ service().title }}</h3>
      <p class="card__description">{{ service().description }}</p>
      <div class="card__insurers">
        @for (insurer of service().insurers; track insurer) {
          <span class="card__pill">{{ insurer }}</span>
        }
      </div>
      <button
        type="button"
        class="card__cta"
        (click)="$event.stopPropagation(); quotePressed.emit(service())"
      >
        Cotizar {{ service().ctaLabel }} →
      </button>
    </article>
  `,
  styles: [
    `
      .card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-3xl);
        box-shadow: var(--shadow-md);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .card:hover {
        box-shadow: var(--shadow-card-hover);
        transform: translateY(-3px);
      }
      .card__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
      }
      .card__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 14px;
      }
      .card__icon--green {
        background: var(--color-primary-light);
        color: var(--color-primary-dark);
      }
      .card__icon--sky {
        background: var(--color-sky-light);
        color: var(--color-sky);
      }
      .card__icon--orange {
        background: var(--color-orange-light);
        color: var(--color-orange);
      }
      .card__badge {
        font-size: 0.72rem;
        font-weight: 700;
        padding: 0.35rem 0.8rem;
        border-radius: 999px;
        white-space: nowrap;
      }
      .card__badge--green {
        background: var(--color-primary-light);
        color: var(--color-primary-dark);
      }
      .card__badge--sky {
        background: var(--color-sky-light);
        color: var(--color-sky);
      }
      .card__badge--orange {
        background: var(--color-orange-light);
        color: var(--color-orange);
      }
      .card__title {
        font-size: 1.22rem;
        font-weight: 800;
        color: var(--color-heading);
        margin: 0 0 0.5rem;
      }
      .card__description {
        color: var(--color-muted);
        font-size: 0.9rem;
        line-height: 1.55;
        margin: 0 0 1rem;
      }
      .card__insurers {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        margin-bottom: 1.2rem;
      }
      .card__pill {
        font-size: 0.7rem;
        font-weight: 700;
        color: var(--color-heading);
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 999px;
        padding: 0.25rem 0.65rem;
      }
      .card__cta {
        width: 100%;
        padding: 0.7rem 1rem;
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        font-family: var(--font-body);
        font-size: 0.88rem;
        font-weight: 700;
        color: var(--color-heading);
        cursor: pointer;
        transition: all 0.25s ease;
      }
      .card__cta:hover {
        background: var(--color-sky-light);
        color: var(--color-sky);
        border-color: var(--color-sky);
      }
    `,
  ],
})
export class SolutionCardComponent {
  readonly service = input.required<InsuranceService>();
  readonly quotePressed = output<InsuranceService>();
}

@Component({
  selector: 'app-solutions-carousel',
  imports: [EmblaCarouselDirective, LucideChevronLeft, LucideChevronRight, SolutionCardComponent],
  template: `
    <section class="section solutions" id="soluciones">
      <div class="container">
        <div class="solutions__head text-center">
          <span class="eyebrow">Soluciones a tu ritmo</span>
          <h2 class="section-title">
            {{ activeTab() === 'empresas' ? 'Seguros para Empresas' : 'Seguros para Personas & Familias' }}
          </h2>
          <p class="solutions__hint">
            Desliza las tarjetas para comparar soluciones
          </p>
        </div>
      </div>
      <div class="solutions__viewport-wrap">
        <button
          type="button"
          class="solutions__nav solutions__nav--prev"
          (click)="scrollPrev()"
          aria-label="Anterior"
        >
          <svg lucideChevronLeft [size]="20" />
        </button>
        <div class="solutions__viewport" emblaCarousel [options]="options" [subscribeToEvents]="emblaEvents" (emblaChange)="onEmblaChange($event)">
          <div class="solutions__track">
            @for (service of filteredServices(); track service.id) {
              <div class="solutions__slide">
                <app-solution-card
                  [service]="service"
                  (quotePressed)="quotePressed.emit($event)"
                />
              </div>
            }
          </div>
        </div>
        <button
          type="button"
          class="solutions__nav solutions__nav--next"
          (click)="scrollNext()"
          aria-label="Siguiente"
        >
          <svg lucideChevronRight [size]="20" />
        </button>
      </div>
      <div class="container solutions__dots" aria-label="Paginación del carrusel">
        @for (dot of dots(); track $index) {
          <button
            type="button"
            class="solutions__dot"
            [class.solutions__dot--active]="selectedIndex() === $index"
            [attr.aria-label]="'Ir a la página ' + ($index + 1)"
            (click)="scrollTo($index)"
          ></button>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .solutions__head {
        max-width: 640px;
        margin: 0 auto 2.2rem;
      }
      .solutions__hint {
        color: var(--color-muted);
        font-size: 0.95rem;
        margin: 0.3rem 0 0;
      }
      .solutions__viewport-wrap {
        position: relative;
        padding-left: max(4vw, 1rem);
        padding-right: max(4vw, 1rem);
      }
      .solutions__viewport {
        overflow: hidden;
      }
      .solutions__track {
        display: flex;
        gap: 1.5rem;
        user-select: none;
        touch-action: pan-y;
      }
      .solutions__slide {
        flex: 0 0 auto;
        min-width: 290px;
        max-width: 320px;
        display: flex;
      }
      .solutions__slide app-solution-card {
        width: 100%;
      }
      .solutions__nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        box-shadow: var(--shadow-md);
        color: var(--color-heading);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .solutions__nav:hover {
        border-color: var(--color-primary);
        color: var(--color-primary-dark);
      }
      .solutions__nav--prev {
        left: 1rem;
      }
      .solutions__nav--next {
        right: 1rem;
      }
      .solutions__dots {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1.6rem;
      }
      .solutions__dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        border: 0;
        background: var(--color-border-strong);
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .solutions__dot--active {
        width: 26px;
        background: var(--color-primary);
      }
      @media (max-width: 640px) {
        .solutions__nav {
          display: none;
        }
      }
    `,
  ],
})
export class SolutionsCarouselComponent {
  readonly activeTab = input.required<AudienceCategory>();
  readonly quotePressed = output<InsuranceService>();

  readonly carousel = viewChild.required(EmblaCarouselDirective);
  readonly selectedIndex = signal(0);
  readonly dots = signal<number[]>([]);

  readonly options = { loop: false, align: 'start' as const, dragFree: false };
  readonly emblaEvents: EmblaEventType[] = ['init', 'reInit', 'select'];

  constructor() {
    afterNextRender(() => {
      setTimeout(() => this.syncFromApi());
    });

    effect(() => {
      this.activeTab();
      untracked(() => {
        setTimeout(() => this.reInit());
      });
    });
  }

  private syncFromApi(): void {
    const api = this.carousel().emblaApi;
    if (!api) {
      return;
    }
    this.dots.set(api.scrollSnapList().map((_, i) => i));
    this.selectedIndex.set(api.selectedScrollSnap());
  }

  readonly filteredServices = (): InsuranceService[] =>
    INSURANCE_SERVICES_DATA.filter((s) => s.category === this.activeTab());

  scrollPrev(): void {
    this.carousel().scrollPrev();
  }
  scrollNext(): void {
    this.carousel().scrollNext();
  }
  scrollTo(index: number): void {
    this.carousel().scrollTo(index);
  }

  onEmblaChange(event: string): void {
    const api = this.carousel().emblaApi;
    if (!api) {
      return;
    }
    if (event === 'init' || event === 'reInit') {
      this.dots.set(api.scrollSnapList().map((_, i) => i));
      this.selectedIndex.set(api.selectedScrollSnap());
    } else if (event === 'select') {
      this.selectedIndex.set(api.selectedScrollSnap());
    }
  }

  reInit(): void {
    this.carousel().reInit();
  }
}
