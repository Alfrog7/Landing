import {
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { EmblaCarouselDirective } from 'embla-carousel-angular';
import { EmblaEventType } from 'embla-carousel';
import { LucideChevronLeft, LucideChevronRight, LucidePlus } from '@lucide/angular';
import { TranslationService } from '../../../../core/i18n/translation.service';
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
      <img
        class="card__bg"
        [src]="service().image"
        [alt]="tr.t('services.' + service().id + '.title')"
        loading="lazy"
      />
      <div class="card__shade" aria-hidden="true"></div>

      <button
        type="button"
        class="card__plus"
        [attr.aria-label]="tr.t('carousel.cardCta')"
        (click)="$event.stopPropagation(); detailPressed.emit(service())"
      >
        <svg lucidePlus [size]="18" />
      </button>

      <div class="card__content">
        <div class="card__top">
          <span class="card__badge">{{ tr.t('services.' + service().id + '.badge') }}</span>
          <div class="card__insurers">
            @for (insurer of service().insurers; track insurer) {
              <span class="card__pill">{{ insurer }}</span>
            }
          </div>
        </div>

        <div class="card__body">
          <h3 class="card__title">{{ tr.t('services.' + service().id + '.title') }}</h3>
          <p class="card__summary">{{ tr.t('services.' + service().id + '.summary') }}</p>
        </div>

        <button
          type="button"
          class="card__cta"
          (click)="$event.stopPropagation(); detailPressed.emit(service())"
        >
          {{ tr.t('carousel.cardCta') }}
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
      // Catálogo Visual Inmersivo: imagen temática a sangre con degradado oscuro
      .card {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 380px;
        width: 100%;
        border-radius: var(--radius-3xl);
        overflow: hidden;
        cursor: pointer;
        user-select: none;
        box-shadow: var(--shadow-card-catalog);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-card-hover);
      }
      .card__bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.55s ease;
      }
      .card:hover .card__bg {
        transform: scale(1.05);
      }
      .card__shade {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(2, 6, 23, 0.95),
          rgba(15, 23, 42, 0.4) 55%,
          transparent 100%
        );
      }
      .card__plus {
        position: absolute;
        top: 0.9rem;
        right: 0.9rem;
        z-index: 2;
        width: 2.5rem;
        height: 2.5rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(12px);
        color: var(--color-heading);
        box-shadow: var(--shadow-md);
        cursor: pointer;
        transition: transform 0.2s ease, background 0.2s ease;
      }
      .card__plus:hover {
        background: #fff;
        transform: scale(1.1);
      }
      .card__content {
        position: relative;
        z-index: 1;
        display: flex;
        flex: 1;
        min-height: 0;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1.25rem;
        gap: 0.75rem;
      }
      .card__top {
        position: absolute;
        top: 0.9rem;
        left: 1.25rem;
        right: 4rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
      .card__badge {
        background: rgba(255, 255, 255, 0.18);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.32);
        color: #fff;
        font-size: 11px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 999px;
        white-space: nowrap;
      }
      .card__insurers {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        min-width: 0;
      }
      .card__pill {
        background: rgba(255, 255, 255, 0.14);
        backdrop-filter: blur(8px);
        color: rgba(255, 255, 255, 0.88);
        font-size: 11px;
        font-weight: 500;
        padding: 2px 8px;
        border-radius: 999px;
        white-space: nowrap;
      }
      .card__body {
        min-height: 0;
        margin-top: 2rem;
      }
      .card__title {
        color: #fff;
        font-size: 1.15rem;
        font-weight: 700;
        line-height: 1.25;
        margin: 0 0 0.4rem;
        text-wrap: balance;
      }
      .card__summary {
        color: #e2e8f0;
        font-size: 0.85rem;
        line-height: 1.55;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .card__cta {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        padding: 0.62rem 1.1rem;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(12px);
        color: var(--color-heading);
        border: 0;
        border-radius: 999px;
        font-family: var(--font-body);
        font-size: 0.8rem;
        font-weight: 700;
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        transition: background 0.2s ease, transform 0.2s ease;
      }
      .card__cta:hover {
        background: #fff;
        transform: translateY(-1px);
      }
    `,
  ],
})
export class SolutionCardComponent {
  readonly tr = inject(TranslationService);
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
          <span class="eyebrow">{{ tr.t('carousel.eyebrow') }}</span>
          <h2 class="section-title">
            {{ activeTab() === 'empresas' ? tr.t('carousel.titleEmpresas') : tr.t('carousel.titlePersonas') }}
          </h2>
          <p class="solutions__hint">{{ tr.t('carousel.hint') }}</p>
        </div>
      </div>
      <div class="solutions__viewport-wrap">
        <button
          type="button"
          class="solutions__nav solutions__nav--prev"
          (click)="scrollPrev()"
          [attr.aria-label]="tr.t('carousel.prev')"
        >
          <svg lucideChevronLeft [size]="20" />
        </button>
        <div
          class="solutions__viewport"
          emblaCarousel
          [options]="options"
          [subscribeToEvents]="emblaEvents"
          (emblaChange)="onEmblaChange($event)"
          (mouseenter)="stopAutoplay()"
          (mouseleave)="startAutoplay()"
        >
          <div class="solutions__track">
            @for (service of displayServices(); track $index) {
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
          [attr.aria-label]="tr.t('carousel.next')"
        >
          <svg lucideChevronRight [size]="20" />
        </button>
      </div>
      <div class="container solutions__dots" [attr.aria-label]="tr.t('carousel.dotsAria')">
        @for (dot of dots(); track $index) {
          <button
            type="button"
            class="solutions__dot"
            [class.solutions__dot--active]="selectedIndex() === $index"
            [attr.aria-label]="tr.t('carousel.pageAria') + ' ' + ($index + 1)"
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
        min-width: 0;
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
        // Slide táctil: la siguiente tarjeta asoma para invitar al swipe
        .solutions__slide {
          min-width: 82vw;
          max-width: 310px;
        }
        .solutions__viewport-wrap {
          padding-left: max(4vw, 0.75rem);
          padding-right: max(4vw, 0.75rem);
        }
      }
    `,
  ],
})
export class SolutionsCarouselComponent {
  readonly activeTab = input.required<AudienceCategory>();
  readonly detailPressed = output<ServiceDetail>();
  readonly tr = inject(TranslationService);

  readonly carousel = viewChild.required(EmblaCarouselDirective);
  readonly selectedIndex = signal(0);
  readonly dots = signal<number[]>([]);

  readonly options = { loop: true, align: 'start' as const, dragFree: false };
  readonly emblaEvents: EmblaEventType[] = ['init', 'reInit', 'select'];
  private autoplayTimer: number | null = null;
  private resizeTimer: number | null = null;

  // Embla solo puede desplazar/loopear si el contenido ancho total supera el
  // viewport: repetimos la lista hasta garantizarlo sin importar cuántas
  // tarjetas haya en el catálogo.
  readonly viewportWidth = signal(0);
  readonly repeat = computed(() => this.computeRepeat(this.activeTab(), this.viewportWidth()));
  readonly displayServices = computed<ServiceDetail[]>(() => {
    const base = SERVICES_CATALOG_DATA.filter((s) => s.category === this.activeTab());
    const times = this.repeat();
    return Array.from({ length: base.length * times }, (_, i) => base[i % base.length]);
  });

  constructor() {
    afterNextRender(() => {
      setTimeout(() => {
        try {
          this.syncFromApi();
        } catch {
          // El carrusel aún no estaba listo; el autoplay arranca igual.
        }
        this.viewportWidth.set(window.innerWidth);
        this.startAutoplay();
      });
    });

    effect(() => {
      this.activeTab();
      this.repeat();
      untracked(() => {
        setTimeout(() => this.reInit());
      });
    });

    inject(DestroyRef).onDestroy(() => {
      this.stopAutoplay();
      window.removeEventListener('resize', this.onResizeDebounced);
      if (this.resizeTimer !== null) {
        window.clearTimeout(this.resizeTimer);
      }
    });

    window.addEventListener('resize', this.onResizeDebounced);
  }

  startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayTimer = window.setInterval(() => {
      try {
        const dir = this.carousel();
        if (dir.emblaApi) {
          dir.scrollNext();
        }
      } catch {
        this.stopAutoplay();
      }
    }, 3200);
  }

  stopAutoplay(): void {
    if (this.autoplayTimer !== null) {
      window.clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  onResizeDebounced = (): void => {
    if (this.resizeTimer !== null) {
      window.clearTimeout(this.resizeTimer);
    }
    this.resizeTimer = window.setTimeout(() => this.viewportWidth.set(window.innerWidth), 200);
  };

  private computeRepeat(tab: AudienceCategory, viewportWidth: number): number {
    if (!viewportWidth) {
      return 1;
    }
    const programs = SERVICES_CATALOG_DATA.filter((s) => s.category === tab);
    const baseCount = programs.length;
    if (!baseCount) {
      return 1;
    }
    // Ancho mínimo estimado por slide (290px + gap de 24px).
    const stride = 314;
    const target = viewportWidth + stride;
    const needed = Math.ceil(target / stride);
    return Math.max(1, Math.min(6, Math.ceil(needed / baseCount)));
  }

  private baseCount(): number {
    return SERVICES_CATALOG_DATA.filter((s) => s.category === untracked(() => this.activeTab())).length;
  }

  private dotsForTab(): number[] {
    return Array.from({ length: this.baseCount() }, (_, i) => i);
  }

  private syncFromApi(): void {
    const api = this.carousel().emblaApi;
    if (!api) {
      return;
    }
    this.dots.set(this.dotsForTab());
    this.selectedIndex.set(api.selectedScrollSnap() % this.baseCount());
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
      this.dots.set(this.dotsForTab());
      this.selectedIndex.set(api.selectedScrollSnap() % this.baseCount());
    } else if (event === 'select') {
      this.selectedIndex.set(api.selectedScrollSnap() % this.baseCount());
    }
  }

  reInit(): void {
    this.carousel().reInit();
  }
}
