import { Card } from '../ui/Card';

interface MethodStep {
  number: number;
  title: string;
  description: string;
}

const STEPS: MethodStep[] = [
  {
    number: 1,
    title: 'Diagnóstico de Riesgo y Planilla',
    description:
      'Mapeamos las actividades de alto riesgo, censo de trabajadores en planilla (T-Registro) y exigencias contractuales del principal.',
  },
  {
    number: 2,
    title: 'Licitación Multimarca',
    description:
      'Solicitamos cotizaciones a Rímac, Pacífico, Mapfre y La Positiva para comparar primas, endosos y condiciones.',
  },
  {
    number: 3,
    title: 'Emisión y Validación de Póliza',
    description:
      'Revisamos pólizas y constancias, verificamos la cobertura exacta de garitas y coordinamos el pago de la prima.',
  },
  {
    number: 4,
    title: 'Acompañamiento Continuo',
    description:
      'Movimientos mensuales de planilla, soporte en siniestros, renovación anual y mejoras de cobertura cuando el mercado lo permite.',
  },
];

export function MethodologySteps() {
  return (
    <app-methodology-steps>
      <section class="section methodology">
        <div class="container">
          <div class="methodology__intro">
            <h2 class="section-title">Cuatro pasos hasta tu póliza gestionada</h2>
          </div>
          <ol class="methodology__steps">
            {STEPS.map((step) => (
              <Card key={step.number} class="methodology__step">
                <li>
                  <span class="methodology__number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              </Card>
            ))}
          </ol>
        </div>
      </section>
    </app-methodology-steps>
  );
}
