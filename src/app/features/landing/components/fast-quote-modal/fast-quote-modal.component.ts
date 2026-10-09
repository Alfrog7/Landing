import { Component, computed, inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { LucideInfo, LucideMessageCircle, LucideX } from '@lucide/angular';
import { InsuranceService } from '../../../../core/models/insurance-service.model';
import { WhatsAppService } from '../../../../core/services/whatsapp.service';
import { MeipoIllustrationComponent } from '../meipo/meipo-illustration.component';

@Component({
  selector: 'app-fast-quote-modal',
  imports: [LucideInfo, LucideMessageCircle, LucideX, MeipoIllustrationComponent],
  template: `
    <div class="modal">
      <header class="modal__head">
        <div class="modal__title-wrap">
          <h2 class="modal__title">{{ service()?.title || 'Cotización Express' }}</h2>
          @if (service()) {
            <span class="modal__tag">{{ service()!.modalConfig.tag }}</span>
          }
        </div>
        <button type="button" class="modal__close" (click)="close()" aria-label="Cerrar modal">
          <svg lucideX [size]="18" />
        </button>
      </header>

      @if (service()) {
        <div class="modal__tip">
          <app-meipo [size]="52" />
          <p><strong>Tip de Meipo:</strong> {{ service()!.modalConfig.tipText }}</p>
        </div>
      }

      <div class="modal__field">
        <label for="quote-ruc">RUC de la Empresa * (11 dígitos)</label>
        <div class="modal__ruc">
          <input
            id="quote-ruc"
            type="text"
            inputmode="numeric"
            autocomplete="off"
            placeholder="20123456789"
            [value]="ruc()"
            maxlength="11"
            (input)="onRucInput($event)"
            aria-describedby="quote-ruc-help"
          />
          <button
            type="button"
            class="modal__validate"
            [disabled]="!rucValid()"
            (click)="validateSunat()"
          >
            Validar SUNAT
          </button>
        </div>
        <p class="modal__help" id="quote-ruc-help">
          <svg lucideInfo [size]="14" />
          Consulta referencial en centrales sin afectar tu score de riesgo.
          @if (businessName()) {
            <br />
            <strong>Razón social: {{ businessName() }}</strong>
          }
        </p>
      </div>

      <div class="modal__field">
        <span class="modal__label">¿Qué necesitas cotizar? *</span>
        <div class="modal__chips" role="group" aria-label="Opciones de cotización">
          @for (option of options(); track option) {
            <button
              type="button"
              class="modal__chip"
              [class.modal__chip--active]="selectedOption() === option"
              (click)="selectedOption.set(option)"
            >
              {{ option }}
            </button>
          }
        </div>
      </div>

      <button type="button" class="modal__submit" [disabled]="!canSubmit()" (click)="submit()">
        <svg lucideMessageCircle [size]="18" />
        Solicitar Evaluación Inmediata por WhatsApp
      </button>
    </div>
  `,
  styles: [
    `
      .modal {
        width: min(460px, 92vw);
        background: var(--color-surface);
        border-radius: var(--radius-3xl);
        box-shadow: var(--shadow-lg);
        padding: 1.6rem;
        animation: modal-in 0.25s ease;
      }
      @keyframes modal-in {
        from {
          opacity: 0;
          transform: translateY(12px) scale(0.98);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      .modal__head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1.2rem;
      }
      .modal__title-wrap {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
      }
      .modal__title {
        font-size: 1.2rem;
        font-weight: 800;
        color: var(--color-heading);
        margin: 0;
      }
      .modal__tag {
        align-self: flex-start;
        font-size: 0.68rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        color: var(--color-sky);
        background: var(--color-sky-light);
        border-radius: 999px;
        padding: 0.25rem 0.7rem;
      }
      .modal__close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: 1px solid var(--color-border);
        background: var(--color-bg);
        color: var(--color-muted);
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .modal__close:hover {
        color: var(--color-heading);
        border-color: var(--color-border-strong);
      }
      .modal__tip {
        display: flex;
        gap: 0.8rem;
        align-items: center;
        background: var(--color-sky-light);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 0.8rem 1rem;
        margin-bottom: 1.2rem;
      }
      .modal__tip p {
        margin: 0;
        font-size: 0.86rem;
        color: var(--color-heading);
      }
      .modal__field {
        margin-bottom: 1.2rem;
      }
      .modal__field label,
      .modal__label {
        display: block;
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--color-heading);
        margin-bottom: 0.45rem;
      }
      .modal__ruc {
        display: flex;
        gap: 0.6rem;
      }
      .modal__ruc input {
        flex: 1;
        min-width: 0;
        padding: 0.7rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        font-family: var(--font-body);
        font-size: 0.95rem;
        color: var(--color-heading);
        outline: none;
        transition: border-color 0.2s ease;
      }
      .modal__ruc input:focus {
        border-color: var(--color-primary);
      }
      .modal__validate {
        padding: 0.7rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        background: var(--color-bg);
        font-family: var(--font-body);
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--color-heading);
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.2s ease;
      }
      .modal__validate:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .modal__validate:not(:disabled):hover {
        border-color: var(--color-primary);
        color: var(--color-primary-dark);
      }
      .modal__help {
        display: flex;
        align-items: flex-start;
        gap: 0.35rem;
        margin: 0.5rem 0 0;
        font-size: 0.76rem;
        color: var(--color-muted);
      }
      .modal__help svg {
        flex-shrink: 0;
        margin-top: 2px;
      }
      .modal__chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .modal__chip {
        padding: 0.5rem 0.95rem;
        border-radius: 999px;
        border: 1px solid var(--color-border);
        background: var(--color-surface);
        font-family: var(--font-body);
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--color-heading);
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .modal__chip:hover {
        border-color: var(--color-border-strong);
      }
      .modal__chip--active {
        background: var(--color-primary-light);
        border-color: var(--color-primary);
        color: var(--color-primary-dark);
      }
      .modal__submit {
        width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.95rem 1.4rem;
        border: 0;
        border-radius: var(--radius-lg);
        background: var(--color-primary);
        color: #fff;
        font-family: var(--font-body);
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.25s ease;
      }
      .modal__submit:hover:not(:disabled) {
        background: var(--color-primary-dark);
      }
      .modal__submit:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ],
})
export class FastQuoteModalComponent {
  readonly data = inject<{ service: InsuranceService | null } | undefined>(DIALOG_DATA, {
    optional: true,
  });
  readonly dialogRef = inject(DialogRef);
  private readonly whatsapp = inject(WhatsAppService);

  readonly service = signal<InsuranceService | null>(this.data?.service ?? null);
  readonly ruc = signal('');
  readonly businessName = signal('');
  readonly selectedOption = signal('');

  readonly rucValid = computed(() => /^\d{11}$/.test(this.ruc()));
  readonly canSubmit = computed(
    () => this.rucValid() && this.selectedOption().length > 0
  );
  readonly options = computed(() => this.service()?.modalConfig.options ?? [
    'Cotización general',
    'Asesoría inicial',
    'Renovación de póliza',
  ]);

  onRucInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 11);
    this.ruc.set(value);
    (event.target as HTMLInputElement).value = value;
  }

  validateSunat(): void {
    if (!this.rucValid()) {
      return;
    }
    this.businessName.set(`RUC ${this.ruc()} — CONSULTA SIMULADA`);
  }

  submit(): void {
    const url = this.whatsapp.buildServiceQuoteUrl(
      this.service()?.title ?? 'Cotización Express',
      this.ruc(),
      this.selectedOption()
    );
    window.open(url, '_blank', 'noopener,noreferrer');
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
