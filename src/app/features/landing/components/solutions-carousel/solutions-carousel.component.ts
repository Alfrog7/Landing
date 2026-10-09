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
import Autoplay from 'embla-carousel-autoplay';
import { LucideChevronLeft, LucideChevronRight, LucidePlus } from '@lucide/angular';
import {
  AudienceCategory,
  ServiceDetail,
} from '../../../../core/models/insurance-service.model';
import { SERVICES_CATALOG_DATA } from '../../../../core/data/landing.data';

@Component({
  selector: 'app-solution-card',
  imports: [LucidePlus],
  template: `
    <article class="card" (click)="detailPressed.emit(service())">
      <img [src]="service().image" [alt]="service().title" class="card__image" loading="lazy" />
      <div class="card__shade"></div>

      <button
        type="button"
        class="card__inspect"
        (click)="$event.stopPropagation(); detailPressed.emit(service())"
        [attr.aria-label]="'Ver ficha de ' + service().title"
      >
        <svg lucidePlus [size]="20" />
      </button>

      <div class="card__info">
        <span class="card__badge">{{ service().badgeTime }}</span>
        <h3 class="card__title">{{ service().title }}</h3>
        <p class="card__summary">{{ service().summary }}</p>
        <div class="card__insurers">
          @for (insurer of service().insurers; track insurer) {
            <span class="card__pill">{{ insurer }}</span>
          }
        </div>
        <button
          type="button"
          class="card__cta"
          (click)="$event.stopPropagation(); detailPressed.emit(service())"
        >
          Ver Ficha y Cotizar →
        </button>
      </div>
    </article>
  `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
      }
      .card {
        position: relative;
        height: 380px;
        width: 100%;
        border-radius: var(--radius-3xl);
        overflow: hidden;
        box-shadow: var(--shadow-card-catalog);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1.25rem;
        cursor: pointer;
        user-select: none;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-card-hover);
      }
      .card__image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .card__shade {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(15, 23, 42, 0.95) 0%,
          rgba(15, 23, 42, 0.5) 55%,
          transparent 100%
        );
      }
      .card__inspect {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(6px);
        color: var(--color-heading);
        border: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        transition: transform 0.2s ease, background 0.2s ease;
      }
      .card__inspect:hover {
        background: #fff;
        transform: scale(1.1);
      }
      .card__info {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
      }
      .card__badge {
        align-self: flex-start;
        background: rgba(16, 185, 129, 0.9);
        color: #fff;
        font-size: 0.72rem;
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        margin-bottom: 0.5rem;
        backdrop-filter: blur(4px);
      }
      .card__title {
        color: #fff;
        font-size: 1.2rem;
        font-weight: 800;
        margin: 0 0 0.25rem;
      }
      .card__summary {
        color: #e2e8f0;
        font-size: 0.78rem;
        margin: 0 0 0.75rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .card__insurers {
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
        margin-bottom: 0.8rem;
      }
      .card__pill {
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
        font-size: 0.62rem;
        padding: 0.1rem 0.5rem;
        border-radius: 6px;
      }
      .card__cta {
        width: 100%;
        padding: 0.65rem 1rem;
        background: rgba(255, 255, 255, 0.95);
        color: var(--color-heading);
        border: 0;
        border-radius: var(--radius-lg);
        font-family: var(--font-body);
        font-size: 0.78rem;
        font-weight: 800;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      .card__cta:hover {
        background: #fff;
      }
    `,
  ],
})
export class SolutionCardComponent {
  readonly service = input.required<ServiceDetail>();
  readonly detailPressed = output<ServiceDetail>();
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
          <p class="solutions__hint">Desliza las tarjetas y pulsa (+) para ver la ficha completa</p>
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
        <div
          class="solutions__viewport"
          emblaCarousel
          [options]="options"
          [plugins]="plugins"
          [subscribeToEvents]="emblaEvents"
          (emblaChange)="onEmblaChange($event)"
        >
          <div class="solutions__track">
            @for (service of filteredServices(); track service.id) {
              <div class="solutions__slide">
                <app-solution-card
                  [service]="service"
                  (detailPressed)="detailPressed.emit($event)"
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
      .solutions {
        background: var(--color-bg);
        border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
      }
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
  readonly detailPressed = output<ServiceDetail>();

  readonly carousel = viewChild.required(EmblaCarouselDirective);
  readonly selectedIndex = signal(0);
  readonly dots = signal<number[]>([]);

  readonly options = { loop: true, align: 'start' as const, dragFree: false };
  readonly autoplayPlugin = Autoplay({
    delay: 3200,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });
  readonly plugins = [this.autoplayPlugin];
  readonly emblaEvents: EmblaEventType[] = ['init', 'reInit', 'select'];

  constructor() {
    afterNextRender(() => {
      setTimeout(() => this.syncFromApi());
    });

    effect(() => {
      this.activeTab();
      untracked(() => {
        setTimeout(() => {
          this.reInit();
          this.autoplayPlugin.play();
        });
      });
    });
  }

  readonly filteredServices = (): ServiceDetail[] =>
    SERVICES_CATALOG_DATA.filter((s) => s.category === this.activeTab());

  private syncFromApi(): void {
    const api = this.carousel().emblaApi;
    if (!api) {
      return;
    }
    this.dots.set(api.scrollSnapList().map((_, i) => i));
    this.selectedIndex.set(api.selectedScrollSnap());
  }

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
