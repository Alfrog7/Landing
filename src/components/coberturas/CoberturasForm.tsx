import { useState } from 'preact/hooks';
import { FormField } from '../ui/FormField';
import { WhatsAppService } from '../../core/services/whatsapp.service';

export default function CoberturasForm() {
  const [ruc, setRuc] = useState('');
  const [workers, setWorkers] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [inlineError, setInlineError] = useState<string | null>(null);

  const onRucInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 11);
    input.value = value;
    setRuc(value);
  };

  const onWorkersInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    input.value = value;
    setWorkers(value);
  };

  const submitInline = (event: Event) => {
    event.preventDefault();
    const workersCount = Number(workers);

    const rucValido = /^\d{11}$/.test(ruc) && (ruc.startsWith('10') || ruc.startsWith('20'));
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!rucValido) {
      setInlineError('RUC inválido: requiere 11 dígitos e iniciar con 10 o 20.');
      return;
    }
    if (!workersCount || workersCount < 1) {
      setInlineError('Indica un número válido de trabajadores.');
      return;
    }
    if (!emailValido) {
      setInlineError('Ingresa un correo corporativo válido.');
      return;
    }
    if (!nickname.trim()) {
      setInlineError('Ingresa el nombre del responsable.');
      return;
    }
    setInlineError(null);

    window.open(
      WhatsAppService.buildGenericUrl(
        `solicito comparativo de tasas de SCTR: RUC ${ruc}, ${workersCount} trabajadores en planilla, responsable ${nickname}, correo ${email}.`
      ),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <form onSubmit={submitInline} noValidate>
      <FormField label="RUC (11 dígitos, inicia con 10 o 20)" inputId="ruc">
        <input
          id="ruc"
          name="ruc"
          inputMode="numeric"
          maxLength={11}
          placeholder="20123456789"
          value={ruc}
          onInput={onRucInput}
        />
      </FormField>
      <FormField label="Trabajadores en planilla" inputId="workers">
        <input
          id="workers"
          name="workers"
          type="number"
          min="1"
          placeholder="12"
          value={workers}
          onInput={onWorkersInput}
        />
      </FormField>
      <FormField label="Correo corporativo" inputId="email" error={inlineError}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="rrhh@empresa.com"
          value={email}
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
      </FormField>
      <FormField label="Nombre del responsable" inputId="nickname">
        <input
          id="nickname"
          name="nickname"
          type="text"
          placeholder="Jefe/a de RR.HH."
          value={nickname}
          onInput={(e) => setNickname(e.currentTarget.value)}
        />
      </FormField>
      <button type="submit" class="coberturas__submit">
        Solicitar comparativo por WhatsApp
      </button>
    </form>
  );
}
