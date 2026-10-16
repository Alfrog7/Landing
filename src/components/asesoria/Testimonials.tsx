interface Testimonial {
  quote: string;
  author: string;
  role: string;
  sector: string;
}

const TESTIMONIALS: Testimonial[] = [
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

export function Testimonials() {
  return (
    <app-testimonials>
      <section class="section">
        <div class="container">
          <div class="testimonials__intro">
            <h2 class="section-title">Validados en obra, planta y mina</h2>
          </div>
          <div class="testimonials__grid">
            {TESTIMONIALS.map((testimonial) => (
              <figure key={testimonial.author} class="testimonials__card">
                <blockquote>“{testimonial.quote}”</blockquote>
                <figcaption>
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.role}</span>
                  <span class="testimonials__sector">{testimonial.sector}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </app-testimonials>
  );
}
