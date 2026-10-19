import { useEffect, useRef, useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import EmblaCarousel, { type EmblaCarouselType } from 'embla-carousel';
import {
  ChevronLeft,
  ChevronRight,
  ScrollText,
  ShieldCheck,
  HandCoins,
  Package,
  Ship,
  Store,
  Building,
  Cog,
  Truck,
  Scale,
} from 'lucide-preact';
import type { LucideProps } from 'lucide-preact';
import { useTranslation } from '../../core/i18n/i18n';

// Icono por tipo, indexado igual que las listas i18n names/phrases (issue #12)
const SLIDE_ICONS: Record<string, FunctionalComponent<LucideProps>[]> = {
  'cartas-fianza': [ScrollText, ShieldCheck, HandCoins, Package, Ship],
  'seguro-credito': [Store, Ship],
  'polizas-ingenieria': [Building, Cog, Truck, Scale],
};

interface ServiceTypeCarouselProps {
  serviceId: string;
  onChoose: (value: string) => void;
}

// Carrusel de tipos de las fichas formales (feedback §4, issue #12): una lamina por
// tipo con nombre y frase corta, autoplay pausable (hover/foco), flechas y puntos.
// Fondo azul marino con detalles dorados; sin autoplay con prefers-reduced-motion.
export function ServiceTypeCarousel({ serviceId, onChoose }: ServiceTypeCarouselProps) {
  const tr = useTranslation();
  const base = `typeCarousels.${serviceId}`;
  const names = tr.list(`${base}.names`);
  const phrases = tr.list(`${base}.phrases`);
  const count = names.length;
  const [current, setCurrent] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLElement>(null);
  const emblaRef = useRef<EmblaCarouselType | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const wrap = wrapRef.current;
    if (!viewport || !wrap || !count) {
      return;
    }
    const api = EmblaCarousel(viewport, { loop: false, align: 'start' });
    emblaRef.current = api;
    const sync = () => setCurrent(api.selectedScrollSnap());
    api.on('init', sync).on('select', sync);
    sync();

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stop = () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    const start = () => {
      if (reduceMotion || timerRef.current !== null) {
        return;
      }
      timerRef.current = window.setInterval(() => {
        const embla = emblaRef.current;
        if (embla) {
          embla.scrollTo((embla.selectedScrollSnap() + 1) % count);
        }
      }, 4500);
    };
    start();
    wrap.addEventListener('mouseenter', stop);
    wrap.addEventListener('mouseleave', start);
    wrap.addEventListener('focusin', stop);
    wrap.addEventListener('focusout', start);

    return () => {
      stop();
      wrap.removeEventListener('mouseenter', stop);
      wrap.removeEventListener('mouseleave', start);
      wrap.removeEventListener('focusin', stop);
      wrap.removeEventListener('focusout', start);
      api.destroy();
      emblaRef.current = null;
    };
  }, [count, tr.lang]);

  if (!count) {
    return null;
  }

  const goTo = (index: number) => {
    emblaRef.current?.scrollTo(((index % count) + count) % count);
  };

  const icons = SLIDE_ICONS[serviceId] ?? [];

  return (
    <section class="detail__carousel" ref={wrapRef} aria-label={tr.t('typeCarousels.title')}>
      <div class="detail__carousel-viewport" ref={viewportRef}>
        <div class="detail__carousel-track">
          {names.map((name, index) => {
            const Icon = icons[index] ?? ShieldCheck;
            return (
              <div class="detail__carousel-slide" key={name}>
                <span class="detail__carousel-icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <div class="detail__carousel-body">
                  <h4 class="detail__carousel-name">{name}</h4>
                  <p class="detail__carousel-phrase">{phrases[index]}</p>
                  <button type="button" class="detail__carousel-cta" onClick={() => onChoose(name)}>
                    {tr.t(`${base}.cta`)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div class="detail__carousel-nav">
        <button
          type="button"
          class="detail__carousel-arrow"
          onClick={() => goTo(current - 1)}
          aria-label={tr.t('typeCarousels.prev')}
        >
          <ChevronLeft size={16} />
        </button>
        <div class="detail__carousel-dots">
          {names.map((name, index) => (
            <button
              type="button"
              class="detail__carousel-dot"
              key={`dot-${name}`}
              aria-label={name}
              aria-current={current === index}
              onClick={() => goTo(index)}
            ></button>
          ))}
        </div>
        <button
          type="button"
          class="detail__carousel-arrow"
          onClick={() => goTo(current + 1)}
          aria-label={tr.t('typeCarousels.next')}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
