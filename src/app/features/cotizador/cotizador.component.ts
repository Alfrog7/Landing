import { Component, computed, inject, signal } from '@angular/core';
import { StepperComponent, StepDefinition } from '../../shared/components/stepper/stepper.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { StepSegmentComponent } from './components/step-segment/step-segment.component';
import { StepCompanyComponent } from './components/step-company/step-company.component';
import { StepContactComponent } from './components/step-contact/step-contact.component';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { QuoteService } from '../../core/services/quote.service';
import {
  CompanyScale,
  INSURANCE_TYPE_LABELS,
  InsuranceType,
  QuoteDraft,
  SCALE_LABELS,
} from '../../core/models/quote.model';

const STEPS: StepDefinition[] = [
  { label: 'Escala y póliza' },
  { label: 'Datos de la empresa' },
  { label: 'Contacto y envío' },
];

@Component({
  selector: 'app-cotizador',
  imports: [
    StepperComponent,
    ButtonComponent,
    BadgeComponent,
    StepSegmentComponent,
    StepCompanyComponent,
    StepContactComponent,
  ],
  template: `
    <header class="cotizador-hero">
      <div class="container">
        <span class="eyebrow eyebrow--light">Cotización express</span>
        <h1>Cotiza tus seguros laborales en 3 pasos</h1>
        <p>Datos confidenciales: los usamos solo para enviarte la prima comparada entre aseguradoras.</p>
      </div>
    </header>

    <section class="section">
      <div class="container cotizador-card">
        @if (!submitted()) {
          <app-stepper [steps]="steps" [current]="currentStep()" />

          <form (submit)="submit($event)" novalidate>
            @switch (currentStep()) {
              @case (0) {
                <app-step-segment [(scale)]="scale" [(productType)]="productType" />
              }
              @case (1) {
                <app-step-company
                  [(ruc)]="ruc"
                  [(businessName)]="businessName"
                  [(workersCount)]="workersCount"
                  [(urgency)]="urgency"
                  [rucError]="rucError()"
                  [nameError]="nameError()"
                  [workersError]="workersError()"
                />
              }
              @case (2) {
                <app-step-contact
                  [(contactName)]="contactName"
                  [(contactEmail)]="contactEmail"
                  [(contactPhone)]="contactPhone"
                  [nameError]="contactNameError()"
                  [emailError]="emailError()"
                  [phoneError]="phoneError()"
                />
              }
            }

            @if (stepError(); as error) {
              <p class="wizard-error" role="alert">{{ error }}</p>
            }

            <div class="wizard-nav">
              @if (currentStep() > 0) {
                <app-button variant="outline" type="button" (pressed)="back()">
                  ← Anterior
                </app-button>
              }
              @if (currentStep() < 2) {
                <app-button variant="primary" type="button" (pressed)="next()">
                  Continuar →
                </app-button>
              } @else {
                <app-button variant="primary" type="submit" [block]="true">
                  Enviar cotización
                </app-button>
              }
            </div>
          </form>
        } @else {
          <div class="wizard-confirm" role="status">
            <app-badge variant="whatsapp">✓ Solicitud recibida</app-badge>
            <h2>¡Gracias, {{ draft()?.contactName }}!</h2>
            <p>
              Registramos tu solicitud de cotización de <strong>{{ productLabel() }}</strong>
              para <strong>{{ draft()?.businessName }}</strong>
              ({{ SCALE_LABELS[draft()?.scale ?? 'micro'] }}, {{ draft()?.workersCount }} trabajadores en riesgo).
              Continúa la conversación por WhatsApp o agenda una asesoría de 15 minutos.
            </p>
            <ul class="wizard-confirm__summary">
              <li><strong>RUC:</strong> {{ draft()?.ruc }}</li>
              <li><strong>Responsable:</strong> {{ draft()?.contactName }}</li>
              <li><strong>Contacto:</strong> {{ draft()?.contactEmail }} · {{ draft()?.contactPhone }}</li>
              <li><strong>Pase de garita urgente:</strong> {{ draft()?.urgencyForCheckpoint ? 'Sí' : 'No' }}</li>
            </ul>
            <div class="wizard-confirm__actions">
              <app-button variant="whatsapp" [href]="whatsappUrl()" [target]="'_blank'">
                Continuar por WhatsApp
              </app-button>
              <app-button variant="outline" href="/agendar-cita">
                Agendar asesoría de 15 min
              </app-button>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .cotizador-hero {
        background: var(--color-primary);
        color: #fff;
        padding: clamp(2.5rem, 6vw, 3.8rem) 0;
      }
      .eyebrow--light {
        color: #a8c4f5;
      }
      .cotizador-hero h1 {
        color: #fff;
        font-size: clamp(1.8rem, 4vw, 2.6rem);
        margin-bottom: 0.4rem;
      }
      .cotizador-hero p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0;
      }
      .cotizador-card {
        max-width: 720px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
        padding: 2.2rem;
      }
      form {
        display: grid;
        gap: 1.3rem;
      }
      .wizard-error {
        margin: 0;
        color: #dc2626;
        font-size: 0.85rem;
        font-weight: 600;
      }
      .wizard-nav {
        display: flex;
        justify-content: flex-end;
        gap: 0.9rem;
        margin-top: 0.4rem;
      }
      .wizard-confirm h2 {
        margin: 0.8rem 0 0.4rem;
      }
      .wizard-confirm__summary {
        list-style: none;
        padding: 0;
        margin: 1.2rem 0 1.6rem;
        display: grid;
        gap: 0.5rem;
        font-size: 0.92rem;
        color: var(--color-body);
      }
      .wizard-confirm__actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class CotizadorComponent {
  readonly steps = STEPS;
  readonly SCALE_LABELS = SCALE_LABELS;

  readonly currentStep = signal(0);
  readonly submitted = signal(false);
  readonly stepError = signal<string | null>(null);

  // Estado del wizard persistente entre pasos (Signals).
  readonly scale = signal<CompanyScale | ''>('');
  readonly productType = signal<InsuranceType | ''>('');
  readonly ruc = signal('');
  readonly businessName = signal('');
  readonly workersCount = signal('');
  readonly urgency = signal(false);
  readonly contactName = signal('');
  readonly contactEmail = signal('');
  readonly contactPhone = signal('');

  // Errores por campo.
  readonly rucError = signal<string | null>(null);
  readonly nameError = signal<string | null>(null);
  readonly workersError = signal<string | null>(null);
  readonly contactNameError = signal<string | null>(null);
  readonly emailError = signal<string | null>(null);
  readonly phoneError = signal<string | null>(null);

  readonly draft = signal<QuoteDraft | null>(null);

  readonly productLabel = computed(() => {
    const type = this.draft()?.productType;
    return type ? INSURANCE_TYPE_LABELS[type] : '';
  });

  readonly whatsappUrl = computed(() => {
    const draft = this.draft();
    return draft ? this.whatsapp.buildQuoteUrl(draft) : '';
  });

  private readonly whatsapp = inject(WhatsAppService);
  private readonly quoteService = inject(QuoteService);

  next(): void {
    if (!this.validateCurrentStep()) {
      return;
    }
    this.stepError.set(null);
    this.currentStep.update((step) => Math.min(step + 1, 2));
  }

  back(): void {
    this.stepError.set(null);
    this.currentStep.update((step) => Math.max(step - 1, 0));
  }

  submit(event: Event): void {
    event.preventDefault();
    if (!this.validateCurrentStep()) {
      return;
    }

    const draft: QuoteDraft = {
      scale: this.scale() as CompanyScale,
      productType: this.productType() as InsuranceType,
      ruc: this.ruc(),
      businessName: this.businessName(),
      workersCount: Number(this.workersCount()),
      contactName: this.contactName(),
      contactEmail: this.contactEmail(),
      contactPhone: this.contactPhone(),
      urgencyForCheckpoint: this.urgency(),
    };

    this.quoteService.submitQuote(draft);
    this.draft.set(draft);
    this.submitted.set(true);
  }

  private validateCurrentStep(): boolean {
    this.clearFieldErrors();
    const step = this.currentStep();

    if (step === 0) {
      if (!this.scale()) {
        this.stepError.set('Selecciona el tamaño de tu empresa para continuar.');
        return false;
      }
      if (!this.productType()) {
        this.stepError.set('Selecciona la póliza que necesita.');
        return false;
      }
      return true;
    }

    if (step === 1) {
      const rucValido =
        /^\d{11}$/.test(this.ruc()) && (this.ruc().startsWith('10') || this.ruc().startsWith('20'));
      if (!rucValido) {
        this.rucError.set('RUC inválido: requiere 11 dígitos e iniciar con 10 o 20.');
        return false;
      }
      if (!this.businessName().trim()) {
        this.nameError.set('Ingresa la razón social.');
        return false;
      }
      const workers = Number(this.workersCount());
      if (!workers || workers < 1) {
        this.workersError.set('Indica un número estimado válido.');
        return false;
      }
      return true;
    }

    if (!this.contactName().trim()) {
      this.contactNameError.set('Ingresa el nombre del responsable.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.contactEmail())) {
      this.emailError.set('Ingresa un correo corporativo válido.');
      return false;
    }
    if (!/^9\d{8}$/.test(this.contactPhone())) {
      this.phoneError.set('Ingresa un celular válido de 9 dígitos (empieza en 9).');
      return false;
    }
    return true;
  }

  private clearFieldErrors(): void {
    this.stepError.set(null);
    this.rucError.set(null);
    this.nameError.set(null);
    this.workersError.set(null);
    this.contactNameError.set(null);
    this.emailError.set(null);
    this.phoneError.set(null);
  }
}
