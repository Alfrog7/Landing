import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LucideShieldCheck } from '@lucide/angular';
import { CoverageAvailability } from '../../../../core/models/insurance-service.model';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { INSURERS_MATRIX_DATA } from '../../../../core/data/landing.data';

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

        <div class="matrix__scroll" role="region" [attr.aria-label]="tr.t('matrix.tableAria')" tabindex="0">
          <table class="matrix__table">
            <thead>
              <tr>
                <th scope="col" class="matrix__service-col">{{ tr.t('matrix.colService') }}</th>
                <th scope="col">Rímac</th>
                <th scope="col">Pacífico</th>
                <th scope="col">Mapfre</th>
                <th scope="col">La Positiva</th>
                <th scope="col">AVLA / Insur</th>
                <th scope="col">Chubb</th>
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
        background: var(--color-bg);
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
        border: 1px solid var(--color-border);
        border-radius: var(--radius-3xl);
        background: var(--color-surface);
        box-shadow: var(--shadow-card-catalog);
      }
      .matrix__table {
        width: 100%;
        min-width: 860px;
        border-collapse: collapse;
        font-size: 0.88rem;
      }
      .matrix__table thead th {
        background: var(--color-bg);
        color: var(--color-heading);
        font-weight: 800;
        font-size: 0.78rem;
        letter-spacing: 0.04em;
        padding: 0.9rem 1rem;
        text-align: center;
        border-bottom: 1px solid var(--color-border);
        white-space: nowrap;
      }
      .matrix__table thead th:first-child {
        text-align: left;
        border-radius: var(--radius-3xl) 0 0 0;
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
      .matrix__table tbody tr:hover {
        background: color-mix(in srgb, var(--color-primary-light) 50%, transparent);
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
        font-size: 0.68rem;
        font-weight: 700;
        color: var(--color-sky);
        background: var(--color-sky-light);
        border-radius: 999px;
        padding: 0.2rem 0.6rem;
      }
    `,
  ],
})
export class InsurersCoverageTableComponent {
  readonly tr = inject(TranslationService);
  readonly rows = INSURERS_MATRIX_DATA;
}
