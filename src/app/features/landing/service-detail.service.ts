import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ServiceDetail } from '../../core/models/insurance-service.model';
import { ServiceDetailModalComponent } from './components/service-detail-modal/service-detail-modal.component';

@Injectable({ providedIn: 'root' })
export class ServiceDetailService {
  private readonly dialog = inject(Dialog);

  open(service: ServiceDetail): void {
    this.dialog.open(ServiceDetailModalComponent, {
      data: { service },
      autoFocus: true,
      hasBackdrop: true,
      backdropClass: 'service-detail-backdrop',
    });
  }
}
