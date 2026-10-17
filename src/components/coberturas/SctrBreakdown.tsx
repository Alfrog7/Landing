const SALUD = [
  'Cobertura inmediata ante siniestros en garitas y frentes de obra',
  'Red de clínicas y centros médicos conveniados',
  'Traslados y atención de urgencias 24/7 según aseguradora',
];

const PENSION = [
  'Pensión de invalidez total y parcial',
  'Pensión de viudez y orfandad (sobrevivencia)',
  'Gastos de sepelio según condición de póliza',
];

export function SctrBreakdown() {
  return (
    <app-sctr-breakdown>
      <div class="breakdown__cards">
        <article class="breakdown__col">
          <h3>SCTR Salud: atención médica y rehabilitación</h3>
          <p>
            Ampara la asistencia sanitaria esencial tras accidentes de trabajo o enfermedades
            profesionales, incluyendo hospitalización, cirugías, medicamentos y fisioterapia hasta
            la recuperación.
          </p>
          {SALUD.map((item) => (
            <p key={item} class="breakdown__item">
              ✓ {item}
            </p>
          ))}
        </article>
        <article class="breakdown__col">
          <h3>SCTR Pensión: invalidez y sobrevivencia</h3>
          <p>
            Brinda rentas para el trabajador y su familia ante invalidez parcial o total y
            fallecimiento derivados de un accidente laboral o enfermedad profesional.
          </p>
          {PENSION.map((item) => (
            <p key={item} class="breakdown__item">
              ✓ {item}
            </p>
          ))}
        </article>
      </div>
    </app-sctr-breakdown>
  );
}
