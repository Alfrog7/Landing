import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { InsuranceService } from '../../core/models/insurance-service.model';
import { FastQuoteModalComponent } from './components/fast-quote-modal/fast-quote-modal.component';

@Injectable({ providedIn: 'root' })
export class FastQuoteService {
  private readonly dialog = inject(Dialog);

  open(service: InsuranceService | null = null): void {
    this.dialog.open(FastQuoteModalComponent, {
      data: { service },
      autoFocus: true,
      hasBackdrop: true,
      panelClass: 'fast-quote-panel',
      backdropClass: 'fast-quote-backdrop',
    });
  }
}
