import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LucideShieldCheck } from '@lucide/angular';
import { CoverageAvailability } from '../../../../core/models/insurance-service.model';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { INSURERS_MATRIX_DATA } from '../../../../core/data/landing.data';
import { BRAND_CONFIG } from '../../../../core/config/brand.config';

interface MatrixInsurer {
  name: string;
  logo?: string;
  abbr?: string;
  pillBg?: string;
  pillFg?: string;
}

@Component({
  selector: 'app-insurers-coverage-table',
  imports: [NgTemplateOutlet, LucideShieldCheck],
  template: `
    <section class="section matrix" id="aseguradoras">
      <div class="container">
        <div class="text-center matrix__head">
          <span class="eyebrow">{{ tr.t('matrix.eyebrow') }}</span>
          <h2 class="section-title">{{ tr.t('matrix.title') }}</h2>
          <p class="matrix__subtitle">
            {{ tr.t('matrix.subtitle') }}
          </p>
          <span class="matrix__neutral">
            <svg lucideShieldCheck [size]="15" />
            {{ tr.t('matrix.neutral') }}
          </span>
        </div>

        <div class="matrix__card">
          <div class="matrix__scroll" role="region" [attr.aria-label]="tr.t('matrix.tableAria')" tabindex="0">
            <table class="matrix__table">
              <thead>
                <tr>
                  <th scope="col" class="matrix__service-col">{{ tr.t('matrix.colService') }}</th>
                  @for (insurer of insurers; track insurer.name) {
                    <th scope="col" [title]="insurer.name">
                      @if (insurer.logo) {
                        <img class="matrix__insurer-logo" [src]="insurer.logo" [alt]="insurer.name" loading="lazy" />
                      } @else {
                        <span class="matrix__brand-pill" [style.background]="insurer.pillBg" [style.color]="insurer.pillFg">{{ insurer.abbr }}</span>
                      }
                    </th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (row of rows; track row.serviceName) {
                  <tr>
                    <th scope="row">{{ tr.t(row.serviceName) }}</th>
                    <td><ng-container [ngTemplateOutlet]="cell" [ngTemplateOutletContext]="{ value: row.rimac }" /></td>
                    <td><ng-container [ngTemplateOutlet]="cell" [ngTemplateOutletContext]="{ value: row.pacifico }" /></td>
                    <td><ng-container [ngTemplateOutlet]="cell" [ngTemplateOutletContext]="{ value: row.mapfre }" /></td>
                    <td><ng-container [ngTemplateOutlet]="cell" [ngTemplateOutletContext]="{ value: row.positiva }" /></td>
                    <td><ng-container [ngTemplateOutlet]="cell" [ngTemplateOutletContext]="{ value: row.insurAvla }" /></td>
                    <td><ng-container [ngTemplateOutlet]="cell" [ngTemplateOutletContext]="{ value: row.chubb }" /></td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <ng-template #cell let-value="value">
      @switch (value) {
        @case (true) {
          <svg class="matrix__check" lucideShieldCheck [size]="20" [attr.aria-label]="tr.t('matrix.available')" />
        }
        @case ('consultar') {
          <span class="matrix__consult">
            {{ tr.t('matrix.consult') }}
          </span>
        }
        @default {
          <span class="matrix__dash" [attr.aria-label]="tr.t('matrix.notAvailable')">—</span>
        }
      }
    </ng-template>
  `,
  styles: [
    `
      .matrix {
        position: relative;
        background: var(--color-bg);
      }
      // Iluminación ambiental (Ambient Glow): separa la sección de la pared blanca
      .matrix::before {
        content: '';
        position: absolute;
        top: 28%;
        left: 50%;
        transform: translateX(-50%);
        width: min(600px, 92vw);
        height: 400px;
        background: rgba(167, 243, 208, 0.2);
        filter: blur(120px);
        border-radius: 50%;
        pointer-events: none;
      }
      .matrix > .container {
        position: relative;
        z-index: 1;
      }
      .matrix__head {
        max-width: 680px;
        margin: 0 auto 2.2rem;
      }
      .matrix__subtitle {
        color: var(--color-muted);
        font-size: 0.98rem;
        margin: 0.4rem 0 1rem;
      }
      .matrix__neutral {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        font-size: 0.8rem;
        color: var(--color-heading);
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 999px;
        padding: 0.4rem 1rem;
      }
      .matrix__neutral svg {
        color: var(--color-primary);
      }
      .matrix__scroll {
        overflow-x: auto;
      }
      // Tarjeta elevada que aloja la matriz
      .matrix__card {
        background: var(--color-surface);
        border: 1px solid color-mix(in srgb, var(--color-border) 75%, transparent);
        border-radius: var(--radius-3xl);
        box-shadow: var(--shadow-card-catalog);
        padding: 1.5rem;
      }
      @media (min-width: 768px) {
        .matrix__card {
          padding: 2rem;
        }
      }
      .matrix__table {
        width: 100%;
        min-width: 880px;
        border-collapse: collapse;
        font-size: 0.88rem;
      }
      // Cabecera diferenciada con esquinas redondeadas
      .matrix__table thead th {
        background: rgba(248, 250, 252, 0.8);
        color: #475569;
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        padding: 0.875rem 1rem;
        text-align: center;
        border-bottom: 1px solid var(--color-border);
        white-space: nowrap;
      }
      .matrix__table thead th:first-child {
        text-align: left;
        border-top-left-radius: var(--radius-lg);
        border-bottom-left-radius: var(--radius-lg);
      }
      .matrix__table thead th:last-child {
        border-top-right-radius: var(--radius-lg);
        border-bottom-right-radius: var(--radius-lg);
      }
      .matrix__insurer-logo {
        display: block;
        margin: 0 auto;
        height: 22px;
        width: auto;
        max-width: 96px;
        object-fit: contain;
        background: transparent;
        filter: saturate(1.05);
      }
      // Pastillas de marca para entidades sin logotipo vectorial
      .matrix__brand-pill {
        display: inline-block;
        padding: 0.3rem 0.75rem;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 800;
        font-family: var(--font-heading);
        letter-spacing: 0.03em;
      }
      .matrix__table tbody th {
        text-align: left;
        font-weight: 600;
        color: var(--color-body);
        padding: 0.85rem 1rem;
        border-bottom: 1px solid var(--color-border);
      }
      .matrix__table tbody tr:last-child th,
      .matrix__table tbody tr:last-child td {
        border-bottom: 0;
      }
      .matrix__table tbody tr {
        transition: background-color 0.2s ease;
      }
      // Hover interactivo sutil en tinte esmeralda
      .matrix__table tbody tr:hover {
        background: rgba(209, 250, 229, 0.3);
      }
      .matrix__table tbody td {
        text-align: center;
        padding: 0.85rem 1rem;
        border-bottom: 1px solid var(--color-border);
      }
      .matrix__check {
        color: var(--color-primary);
        margin: 0 auto;
      }
      .matrix__dash {
        color: var(--color-border-strong);
        font-weight: 700;
      }
      .matrix__consult {
        display: inline-block;
        font-size: 11px;
        font-weight: 500;
        color: #0369a1;
        background: #f0f9ff;
        border: 1px solid #e0f2fe;
        padding: 2.5px 10px;
        border-radius: 999px;
      }
    `,
  ],
})
export class InsurersCoverageTableComponent {
  readonly tr = inject(TranslationService);
  readonly rows = INSURERS_MATRIX_DATA;

  // Logotipos vectoriales de aliadas + pastillas de marca cuidadas para AVLA y Chubb
  readonly insurers: MatrixInsurer[] = [
    ...(BRAND_CONFIG.insurers.map((i) => ({ name: i.name, logo: i.logo })) as MatrixInsurer[]),
    { name: 'AVLA / Insur', abbr: 'AVLA', pillBg: '#0b132b', pillFg: '#ffffff' },
    { name: 'Chubb', abbr: 'CHUBB', pillBg: '#eaf4ff', pillFg: '#084783' },
  ];
}
