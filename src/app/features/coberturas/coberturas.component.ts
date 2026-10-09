import { Component, inject, signal } from '@angular/core';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { SctrBreakdownComponent } from './components/sctr-breakdown/sctr-breakdown.component';
import { InsurersMatrixComponent } from './components/insurers-matrix/insurers-matrix.component';
import { VidaLeyCardComponent } from './components/vida-ley-card/vida-ley-card.component';

@Component({
  selector: 'app-coberturas',
  imports: [FormFieldComponent, SctrBreakdownComponent, InsurersMatrixComponent, VidaLeyCardComponent],
  template: `
    <header class="hero-mini">
      <div class="container">
        <span class="eyebrow eyebrow--light">Coberturas &amp; SCTR</span>
        <h1>Coberturas obligatorias y emisión express para tu operación</h1>
        <p>
          Conoce qué cubre cada seguro obligatorio y asegura que tus trabajadores del
          DS.009-97-TR ingresen sin contratiempos a obra y garitas.
        </p>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <span class="eyebrow">Normativa SCTR</span>
        <h2 class="section-title">SCTR Salud y SCTR Pensión: coberturas diferenciadas</h2>
        <p class="lead">
          El Seguro Complementario de Trabajo de Riesgo es obligatorio para las actividades de
          alto riesgo calificadas por el Ministerio de Trabajo (DS.009-97-TR): minería,
          construcción, electricidad, gas y otras actividades conforme a la norma.
        </p>
        <app-sctr-breakdown />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <span class="eyebrow">Matriz comparativa</span>
        <h2 class="section-title">Aseguradoras multimarca respaldadas</h2>
        <app-insurers-matrix />
      </div>
    </section>

    <section class="section">
      <div class="container coberturas__vida">
        <div>
          <span class="eyebrow">Seguro obligatorio adicional</span>
          <h2 class="section-title">Seguro Vida Ley para toda la planilla</h2>
          <p class="lead">
            Requerido a todas las empresas con personal en planilla, sin importar el nivel de
            riesgo del puesto ni la actividad económica del negocio.
          </p>
        </div>
        <app-vida-ley-card />
      </div>
    </section>

    <section class="section comparison-cta" id="comparativo">
      <div class="container coberturas__cta">
        <div class="coberturas__form">
          <h2>Solicita tu comparativo de tasas</h2>
          <p>Registramos tu planilla y contacto: enviamos el comparativo multimarca por correo.</p>
          <form (submit)="submitInline($event)" novalidate>
            <app-form-field label="RUC (11 dígitos, inicia con 10 o 20)" inputId="ruc">
              <input
                id="ruc"
                name="ruc"
                inputmode="numeric"
                maxlength="11"
                placeholder="20123456789"
                [value]="ruc()"
                (input)="onRucInput($event)"
              />
            </app-form-field>
            <app-form-field label="Trabajadores en planilla" inputId="workers">
              <input
                id="workers"
                name="workers"
                type="number"
                min="1"
                placeholder="12"
                [value]="workers()"
                (input)="onWorkersInput($event)"
              />
            </app-form-field>
            <app-form-field label="Correo corporativo" inputId="email" [error]="inlineError()">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="rrhh@empresa.com"
                [value]="email()"
                (input)="onEmailInput($event)"
              />
            </app-form-field>
            <app-form-field label="Nombre del responsable" inputId="nickname">
              <input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="Jefe/a de RR.HH."
                [value]="nickname()"
                (input)="onNicknameInput($event)"
              />
            </app-form-field>
            <button type="submit" class="coberturas__submit">
              Solicitar comparativo por WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero-mini {
        background: var(--color-primary);
        color: #fff;
        padding: clamp(2.5rem, 6vw, 4rem) 0;
      }
      .eyebrow--light {
        color: #a8c4f5;
      }
      .hero-mini h1 {
        color: #fff;
        font-size: clamp(1.9rem, 4.5vw, 3rem);
        margin-bottom: 0.7rem;
      }
      .hero-mini p {
        color: rgba(255, 255, 255, 0.85);
        max-width: 58ch;
        margin: 0;
      }
      .lead {
        max-width: 62ch;
        margin-bottom: 2rem;
      }
      .coberturas__vida {
        display: grid;
        grid-template-columns: 0.9fr 1.1fr;
        gap: 2.5rem;
        align-items: center;
      }
      .coberturas__cta {
        width: min(560px, 100%);
      }
      .coberturas__form {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 2rem;
        box-shadow: var(--shadow-md);
      }
      .coberturas__form h2 {
        font-size: 1.5rem;
        margin-bottom: 0.4rem;
      }
      .coberturas__form p {
        font-size: 0.9rem;
        color: var(--color-muted);
        margin: 0 0 1.4rem;
      }
      form {
        display: grid;
        gap: 1.1rem;
      }
      .coberturas__submit {
        padding: 0.85rem 1.5rem;
        border: 0;
        border-radius: var(--radius-sm);
        background: var(--color-whatsapp);
        color: #fff;
        font-weight: 700;
        font-size: 0.95rem;
        cursor: pointer;
      }
      .coberturas__submit:hover {
        background: var(--color-whatsapp-dark);
      }
      @media (max-width: 880px) {
        .coberturas__vida {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class CoberturasComponent {
  readonly ruc = signal('');
  readonly workers = signal('');
  readonly email = signal('');
  readonly nickname = signal('');
  readonly inlineError = signal<string | null>(null);

  private readonly whatsapp = inject(WhatsAppService);

  onRucInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 11);
    input.value = value;
    this.ruc.set(value);
  }

  onWorkersInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    input.value = value;
    this.workers.set(value);
  }

  onEmailInput(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
  }

  onNicknameInput(event: Event): void {
    this.nickname.set((event.target as HTMLInputElement).value);
  }

  submitInline(event: Event): void {
    event.preventDefault();
    const ruc = this.ruc();
    const workers = Number(this.workers());
    const email = this.email();
    const nickname = this.nickname();

    const rucValido = /^\d{11}$/.test(ruc) && (ruc.startsWith('10') || ruc.startsWith('20'));
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!rucValido) {
      this.inlineError.set('RUC inválido: requiere 11 dígitos e iniciar con 10 o 20.');
      return;
    }
    if (!workers || workers < 1) {
      this.inlineError.set('Indica un número válido de trabajadores.');
      return;
    }
    if (!emailValido) {
      this.inlineError.set('Ingresa un correo corporativo válido.');
      return;
    }
    if (!nickname.trim()) {
      this.inlineError.set('Ingresa el nombre del responsable.');
      return;
    }
    this.inlineError.set(null);

    window.open(
      this.whatsapp.buildGenericUrl(
        `solicito comparativo de tasas de SCTR: RUC ${ruc}, ${workers} trabajadores en planilla, responsable ${nickname}, correo ${email}.`
      ),
      '_blank',
      'noopener,noreferrer'
    );
  }
}
