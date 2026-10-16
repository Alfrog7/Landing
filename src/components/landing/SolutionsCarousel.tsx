import { useEffect, useRef, useState } from 'preact/hooks';
import EmblaCarousel, { type EmblaCarouselType } from 'embla-carousel';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-preact';
import { useTranslation } from '../../core/i18n/i18n';
import type { AudienceCategory, ServiceDetail } from '../../core/models/insurance-service.model';
import { SERVICES_CATALOG_DATA } from '../../core/data/landing.data';

interface SolutionCardProps {
  service: ServiceDetail;
  onDetailPressed: (service: ServiceDetail) => void;
}

function SolutionCard({ service, onDetailPressed }: SolutionCardProps) {
  const tr = useTranslation();

  return (
    <app-solution-card>
      <article class="card" onClick={() => onDetailPressed(service)}>
        <img class="card__bg" src={service.image} alt={tr.t(`services.${service.id}.title`)} loading="lazy" />
        <div class="card__shade" aria-hidden="true"></div>

        <button
          type="button"
          class="card__plus"
          aria-label={tr.t('carousel.cardCta')}
          onClick={(event) => {
            event.stopPropagation();
            onDetailPressed(service);
          }}
        >
          <Plus size={18} />
        </button>

        <div class="card__content">
          <div class="card__top">
            <span class="card__badge">{tr.t(`services.${service.id}.badge`)}</span>
            <div class="card__insurers">
              {service.insurers.map((insurer) => (
                <span key={insurer} class="card__pill">
                  {insurer}
                </span>
              ))}
            </div>
          </div>

          <div class="card__body">
            <h3 class="card__title">{tr.t(`services.${service.id}.title`)}</h3>
            <p class="card__summary">{tr.t(`services.${service.id}.summary`)}</p>
          </div>

          <button
            type="button"
            class="card__cta"
            onClick={(event) => {
              event.stopPropagation();
              onDetailPressed(service);
            }}
          >
            {tr.t('carousel.cardCta')}
          </button>
        </div>
      </article>
    </app-solution-card>
  );
}

// Embla solo puede desplazar/loopear si el contenido ancho total supera el
// viewport: repetimos la lista hasta garantizarlo sin importar cuántas
// tarjetas haya en el catálogo.
function computeRepeat(baseCount: number, viewportWidth: number): number {
  if (!viewportWidth || !baseCount) {
    return 1;
  }
  // Ancho mínimo estimado por slide (tarjeta de 290px + 24px de separación).
  const stride = 314;
  const target = viewportWidth + stride;
  const needed = Math.ceil(target / stride);
  return Math.max(1, Math.min(6, Math.ceil(needed / baseCount)));
}

interface SolutionsCarouselProps {
  activeTab: AudienceCategory;
  onDetailPressed: (service: ServiceDetail) => void;
}

export function SolutionsCarousel({ activeTab, onDetailPressed }: SolutionsCarouselProps) {
  const tr = useTranslation();
  const [viewportWidth, setViewportWidth] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const base = SERVICES_CATALOG_DATA.filter((s) => s.category === activeTab);
  const repeat = computeRepeat(base.length, viewportWidth);
  const displayServices: ServiceDetail[] = Array.from({ length: base.length * repeat }, (_, i) => base[i % base.length]);
  const dots = Array.from({ length: base.length }, (_, i) => i);

  const viewportRef = useRef<HTMLDivElement>(null);
  const emblaRef = useRef<EmblaCarouselType | null>(null);
  const baseCountRef = useRef(base.length);
  baseCountRef.current = base.length;
  const autoplayTimer = useRef<number | null>(null);

  const stopAutoplay = () => {
    if (autoplayTimer.current !== null) {
      window.clearInterval(autoplayTimer.current);
      autoplayTimer.current = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer.current = window.setInterval(() => {
      try {
        emblaRef.current?.scrollNext();
      } catch {
        stopAutoplay();
      }
    }, 3200);
  };

  // Inicialización de Embla + autoplay
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    const api = EmblaCarousel(viewport, { loop: true, align: 'start', dragFree: false });
    emblaRef.current = api;
    const sync = () => setSelectedIndex(api.selectedScrollSnap() % (baseCountRef.current || 1));
    api.on('init', sync).on('reInit', sync).on('select', sync);
    sync();
    setViewportWidth(viewport.clientWidth);
    startAutoplay();

    let resizeTimer: number | null = null;
    const onResize = () => {
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
      }
      resizeTimer = window.setTimeout(() => setViewportWidth(viewport.clientWidth), 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      stopAutoplay();
      window.removeEventListener('resize', onResize);
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
      }
      api.destroy();
      emblaRef.current = null;
    };
  }, []);

  // Al cambiar de pestaña o de repetición se recalcula el carrusel con el DOM ya actualizado
  useEffect(() => {
    const timer = window.setTimeout(() => emblaRef.current?.reInit());
    return () => window.clearTimeout(timer);
  }, [activeTab, repeat]);

  return (
    <app-solutions-carousel>
      <section class="section solutions" id="soluciones">
        <div class="container">
          <div class="solutions__head text-center">
            <span class="eyebrow">{tr.t('carousel.eyebrow')}</span>
            <h2 class="section-title">
              {activeTab === 'empresas' ? tr.t('carousel.titleEmpresas') : tr.t('carousel.titlePersonas')}
            </h2>
            <p class="solutions__hint">{tr.t('carousel.hint')}</p>
          </div>
        </div>
        <div class="solutions__viewport-wrap">
          <button
            type="button"
            class="solutions__nav solutions__nav--prev"
            onClick={() => emblaRef.current?.scrollPrev()}
            aria-label={tr.t('carousel.prev')}
          >
            <ChevronLeft size={20} />
          </button>
          <div class="solutions__viewport" ref={viewportRef} onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
            <div class="solutions__track">
              {displayServices.map((service, index) => (
                <div key={index} class="solutions__slide">
                  <SolutionCard service={service} onDetailPressed={onDetailPressed} />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            class="solutions__nav solutions__nav--next"
            onClick={() => emblaRef.current?.scrollNext()}
            aria-label={tr.t('carousel.next')}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div class="container solutions__dots" aria-label={tr.t('carousel.dotsAria')}>
          {dots.map((index) => (
            <button
              key={index}
              type="button"
              class={`solutions__dot${selectedIndex === index ? ' solutions__dot--active' : ''}`}
              aria-label={`${tr.t('carousel.pageAria')} ${index + 1}`}
              onClick={() => emblaRef.current?.scrollTo(index)}
            ></button>
          ))}
        </div>
      </section>
    </app-solutions-carousel>
  );
}
