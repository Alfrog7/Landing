import { Component, inject } from '@angular/core';
import { LucideMessageCircle } from '@lucide/angular';
import { WhatsAppService } from '../../../core/services/whatsapp.service';
import { TranslationService } from '../../../core/i18n/translation.service';

@Component({
  selector: 'app-whatsapp-float',
  imports: [LucideMessageCircle],
  template: `
    <a
      class="wafloat"
      [href]="url"
      target="_blank"
      rel="noopener noreferrer"
      [attr.aria-label]="tr.t('navbar.waFloatAria')"
    >
      <svg lucideMessageCircle [size]="26" />
      <span class="wafloat__tooltip">{{ tr.t('navbar.waChat') }}</span>
    </a>
  `,
  styles: [
    `
      .wafloat {
        position: fixed;
        right: 1.4rem;
        bottom: 1.4rem;
        z-index: 60;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: var(--color-whatsapp);
        color: #fff;
        box-shadow: var(--shadow-lg);
        transition: transform 0.2s ease, background 0.2s ease;
      }
      .wafloat:hover {
        background: var(--color-whatsapp-dark);
        transform: scale(1.06);
      }
      .wafloat__tooltip {
        position: absolute;
        right: 68px;
        top: 50%;
        transform: translateY(-50%);
        white-space: nowrap;
        background: var(--color-secondary);
        color: #fff;
        font-size: 0.8rem;
        font-weight: 600;
        border-radius: 999px;
        padding: 0.45rem 0.9rem;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
      }
      .wafloat:hover .wafloat__tooltip {
        opacity: 1;
      }
    `,
  ],
})
export class WhatsAppFloatComponent {
  private readonly whatsapp = inject(WhatsAppService);
  readonly tr = inject(TranslationService);
  readonly url: string;

  constructor() {
    this.url = this.whatsapp.buildGenericUrl(
      'quisiera cotizar un seguro con asesoría personalizada. 🐨'
    );
  }
}
