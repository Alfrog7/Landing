import { Component } from '@angular/core';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  sector: string;
}

@Component({
  selector: 'app-testimonials',
  template: `
    <section class="section">
      <div class="container">
        <div class="text-center testimonials__intro">
          <span class="eyebrow">Casos de éxito</span>
          <h2 class="section-title">Validados en obra, planta y mina</h2>
        </div>
        <div class="testimonials__grid">
          @for (testimonial of testimonials; track testimonial.author) {
            <figure class="testimonials__card">
              <blockquote>“{{ testimonial.quote }}”</blockquote>
              <figcaption>
                <strong>{{ testimonial.author }}</strong>
                <span>{{ testimonial.role }}</span>
                <span class="testimonials__sector">{{ testimonial.sector }}</span>
              </figcaption>
            </figure>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .testimonials__intro {
        max-width: 620px;
        margin: 0 auto 2.6rem;
      }
      .testimonials__grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.4rem;
      }
      .testimonials__card {
        margin: 0;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 1.6rem;
        box-shadow: var(--shadow-sm);
        display: flex;
        flex-direction: column;
        gap: 1.1rem;
      }
      blockquote {
        margin: 0;
        font-size: 0.98rem;
        line-height: 1.6;
        color: var(--color-heading);
      }
      figure figcaption {
        display: flex;
        flex-direction: column;
        line-height: 1.35;
      }
      figcaption strong {
        color: var(--color-heading);
      }
      figcaption span {
        font-size: 0.83rem;
        color: var(--color-muted);
      }
      .testimonials__sector {
        margin-top: 0.2rem;
        color: var(--color-primary) !important;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-size: 0.72rem !important;
      }
      @media (max-width: 900px) {
        .testimonials__grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class TestimonialsComponent {
  readonly testimonials: Testimonial[] = [
    {
      quote:
        'Cambiamos al canal telefónico por Melanie: en dos semanas ya teníamos las constancias de garita del cuadro del día listas antes del ingreso de cada turno.',
      author: 'Jorge Ramírez',
      role: 'Gerente de Operaciones',
      sector: 'Construcción civil',
    },
    {
      quote:
        'Nos licitó el SCTR frente a tres aseguradoras y bajamos la prima anual en 18% sin cambiar de cobertura. Renovación sin sorpresas.',
      author: 'Ana Karen Quispe',
      role: 'Jefa de RR.HH.',
      sector: 'Ingeniería de detalles',
    },
    {
      quote:
        'En una emergencia a medio día nos emitió la constancia del operario nuevo en 40 minutos. El contrato del principal exige ese pase, y nunca falló.',
      author: 'Luis Marella',
      role: 'Superintendente de Seguridad',
      sector: 'Contratista minero',
    },
  ];
}
