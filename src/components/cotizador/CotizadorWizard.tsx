import { useState } from 'preact/hooks';
import { ArrowLeft, ArrowRight, Check } from 'lucide-preact';
import { Stepper, type StepDefinition } from '../ui/Stepper';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { FormField } from '../ui/FormField';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { QuoteService } from '../../core/services/quote.service';
import {
  INSURANCE_TYPE_LABELS,
  SCALE_LABELS,
  type CompanyScale,
  type InsuranceType,
  type QuoteDraft,
} from '../../core/models/quote.model';

const STEPS: StepDefinition[] = [
  { label: 'Escala y póliza' },
  { label: 'Datos de la empresa' },
  { label: 'Contacto y envío' },
];

const SCALE_OPTIONS = (Object.keys(SCALE_LABELS) as CompanyScale[]).map((key) => ({
  value: key,
  label: SCALE_LABELS[key],
}));

const PRODUCT_OPTIONS: { value: InsuranceType; label: string; hint: string }[] = [
  { value: 'sctr_salud', label: INSURANCE_TYPE_LABELS['sctr_salud'], hint: 'Cobertura médica ante accidentes de trabajo' },
  { value: 'sctr_pension', label: INSURANCE_TYPE_LABELS['sctr_pension'], hint: 'Invalidez y sobrevivencia' },
  { value: 'sctr_integral', label: INSURANCE_TYPE_LABELS['sctr_integral'], hint: 'Salud y Pensión en un solo contrato' },
  { value: 'vida_ley', label: INSURANCE_TYPE_LABELS['vida_ley'], hint: 'Vida obligatoria para planilla' },
];

const digitsOnly = (event: Event, max?: number): string => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  if (max) {
    value = value.slice(0, max);
  }
  input.value = value;
  return value;
};

export default function CotizadorWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  // Estado del wizard persistente entre pasos.
  const [scale, setScale] = useState<CompanyScale | ''>('');
  const [productType, setProductType] = useState<InsuranceType | ''>('');
  const [ruc, setRuc] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [workersCount, setWorkersCount] = useState('');
  const [urgency, setUrgency] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // Errores por campo.
  const [rucError, setRucError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [workersError, setWorkersError] = useState<string | null>(null);
  const [contactNameError, setContactNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [draft, setDraft] = useState<QuoteDraft | null>(null);

  const clearFieldErrors = () => {
    setStepError(null);
    setRucError(null);
    setNameError(null);
    setWorkersError(null);
    setContactNameError(null);
    setEmailError(null);
    setPhoneError(null);
  };

  const validateCurrentStep = (): boolean => {
    clearFieldErrors();

    if (currentStep === 0) {
      if (!scale) {
        setStepError('Selecciona el tamaño de tu empresa para continuar.');
        return false;
      }
      if (!productType) {
        setStepError('Selecciona la póliza que necesita.');
        return false;
      }
      return true;
    }

    if (currentStep === 1) {
      const rucValido = /^\d{11}$/.test(ruc) && (ruc.startsWith('10') || ruc.startsWith('20'));
      if (!rucValido) {
        setRucError('RUC inválido: requiere 11 dígitos e iniciar con 10 o 20.');
        return false;
      }
      if (!businessName.trim()) {
        setNameError('Ingresa la razón social.');
        return false;
      }
      const workers = Number(workersCount);
      if (!workers || workers < 1) {
        setWorkersError('Indica un número estimado válido.');
        return false;
      }
      return true;
    }

    if (!contactName.trim()) {
      setContactNameError('Ingresa el nombre del responsable.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      setEmailError('Ingresa un correo corporativo válido.');
      return false;
    }
    if (!/^9\d{8}$/.test(contactPhone)) {
      setPhoneError('Ingresa un celular válido de 9 dígitos (empieza en 9).');
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateCurrentStep()) {
      return;
    }
    setStepError(null);
    setCurrentStep((step) => Math.min(step + 1, 2));
  };

  const back = () => {
    setStepError(null);
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const submit = (event: Event) => {
    event.preventDefault();
    if (!validateCurrentStep()) {
      return;
    }

    const quote: QuoteDraft = {
      scale: scale as CompanyScale,
      productType: productType as InsuranceType,
      ruc,
      businessName,
      workersCount: Number(workersCount),
      contactName,
      contactEmail,
      contactPhone,
      urgencyForCheckpoint: urgency,
    };

    QuoteService.submitQuote(quote);
    setDraft(quote);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div class="wizard-confirm" role="status">
        <Badge variant="whatsapp">
          <Check size={14} />
          Solicitud recibida
        </Badge>
        <h2>¡Gracias, {draft?.contactName}!</h2>
        <p>
          Registramos tu solicitud de cotización de <strong>{draft ? INSURANCE_TYPE_LABELS[draft.productType] : ''}</strong>{' '}
          para <strong>{draft?.businessName}</strong> ({SCALE_LABELS[draft?.scale ?? 'micro']}, {draft?.workersCount}{' '}
          trabajadores en riesgo). Continúa la conversación por WhatsApp o agenda una asesoría de 15 minutos.
        </p>
        <ul class="wizard-confirm__summary">
          <li>
            <strong>RUC:</strong> {draft?.ruc}
          </li>
          <li>
            <strong>Responsable:</strong> {draft?.contactName}
          </li>
          <li>
            <strong>Contacto:</strong> {draft?.contactEmail} · {draft?.contactPhone}
          </li>
          <li>
            <strong>Pase de garita urgente:</strong> {draft?.urgencyForCheckpoint ? 'Sí' : 'No'}
          </li>
        </ul>
        <div class="wizard-confirm__actions">
          <Button variant="whatsapp" href={draft ? WhatsAppService.buildQuoteUrl(draft) : ''} target="_blank">
            Continuar por WhatsApp
          </Button>
          <Button variant="outline" href="/#agendar">
            Agendar asesoría de 15 min
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Stepper steps={STEPS} current={currentStep} />

      <form onSubmit={submit} noValidate>
        {currentStep === 0 && (
          <app-step-segment>
            <FormField label="¿Qué tamaño tiene tu empresa?" inputId="scale">
              <select id="scale" value={scale} onChange={(e) => setScale(e.currentTarget.value as CompanyScale)}>
                <option value="" disabled>
                  Selecciona una opción…
                </option>
                {SCALE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormField>

            <legend class="segment-legend">¿Qué póliza necesita?</legend>
            <div class="segment-products" role="radiogroup" aria-label="Tipo de póliza">
              {PRODUCT_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  class={`segment-product${productType === option.value ? ' segment-product--active' : ''}`}
                >
                  <input
                    type="radio"
                    name="productType"
                    value={option.value}
                    checked={productType === option.value}
                    onChange={() => setProductType(option.value)}
                  />
                  <span class="segment-product__title">{option.label}</span>
                  <span class="segment-product__hint">{option.hint}</span>
                </label>
              ))}
            </div>
          </app-step-segment>
        )}

        {currentStep === 1 && (
          <app-step-company>
            <FormField label="RUC (11 dígitos, inicia con 10 o 20)" inputId="ruc" error={rucError}>
              <input
                id="ruc"
                name="ruc"
                inputMode="numeric"
                maxLength={11}
                placeholder="20123456789"
                value={ruc}
                onInput={(e) => setRuc(digitsOnly(e, 11))}
              />
            </FormField>
            <FormField label="Razón social" inputId="businessName" error={nameError}>
              <input
                id="businessName"
                name="businessName"
                type="text"
                placeholder="Constructora Andina S.A.C."
                value={businessName}
                onInput={(e) => setBusinessName(e.currentTarget.value)}
              />
            </FormField>
            <FormField label="Trabajadores en riesgo (estimado)" inputId="workersCount" error={workersError}>
              <input
                id="workersCount"
                name="workersCount"
                type="number"
                min="1"
                placeholder="12"
                value={workersCount}
                onInput={(e) => setWorkersCount(digitsOnly(e))}
              />
            </FormField>
            <label class="urgency">
              <input type="checkbox" checked={urgency} onChange={(e) => setUrgency(e.currentTarget.checked)} />
              <span>Necesito emitir pases de garita para hoy (emisión express).</span>
            </label>
          </app-step-company>
        )}

        {currentStep === 2 && (
          <app-step-contact>
            <FormField label="Responsable (RR.HH. / Administración)" inputId="contactName" error={contactNameError}>
              <input
                id="contactName"
                name="contactName"
                type="text"
                placeholder="Ej. Ana Karen Quispe"
                value={contactName}
                onInput={(e) => setContactName(e.currentTarget.value)}
              />
            </FormField>
            <FormField label="Correo corporativo" inputId="contactEmail" error={emailError}>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                placeholder="rrhh@empresa.com"
                value={contactEmail}
                onInput={(e) => setContactEmail(e.currentTarget.value)}
              />
            </FormField>
            <FormField label="Celular (9 dígitos)" inputId="contactPhone" error={phoneError}>
              <input
                id="contactPhone"
                name="contactPhone"
                inputMode="numeric"
                maxLength={9}
                placeholder="987654321"
                value={contactPhone}
                onInput={(e) => setContactPhone(digitsOnly(e, 9))}
              />
            </FormField>
            <p class="privacy">
              Usamos tus datos únicamente para responder tu cotización conforme a la política de privacidad de la
              corredora.
            </p>
          </app-step-contact>
        )}

        {stepError && (
          <p class="wizard-error" role="alert">
            {stepError}
          </p>
        )}

        <div class="wizard-nav">
          {currentStep > 0 && (
            <Button variant="outline" type="button" onPressed={back}>
              <ArrowLeft size={16} />
              Anterior
            </Button>
          )}
          {currentStep < 2 ? (
            <Button variant="primary" type="button" onPressed={next}>
              Continuar
              <ArrowRight size={16} />
            </Button>
          ) : (
            <Button variant="primary" type="submit" block>
              Enviar cotización
            </Button>
          )}
        </div>
      </form>
    </>
  );
}
