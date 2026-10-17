const COBERTURAS = [
  {
    title: 'Muerte por cualquier causa',
    detail: 'Beneficio pagado al grupo de sobrevivencia del trabajador.',
  },
  {
    title: 'Muerte accidental',
    detail: 'Doble indemnización en caso de fallecimiento en accidente.',
  },
  {
    title: 'Invalidez total y permanente',
    detail: 'Capital asegurado ante pérdida total de capacidad laboral.',
  },
];

export function VidaLeyCard() {
  return (
    <app-vida-ley-card>
      <article class="vida">
        <div class="vida__head">
          <div>
            <h3>Seguro Vida Ley</h3>
            <p>
              D.Leg. 817 — obligatorio para todo el personal en planilla, desde el primer día de
              ingreso.
            </p>
          </div>
        </div>
        <ul class="vida__list">
          {COBERTURAS.map((cover) => (
            <li key={cover.title}>
              <strong>{cover.title}</strong>
              <span>{cover.detail}</span>
            </li>
          ))}
        </ul>
        <p class="vida__note">
          Gestión mensual de altas y bajas por planilla y certificados individuales incluidos con la
          corredora.
        </p>
      </article>
    </app-vida-ley-card>
  );
}
