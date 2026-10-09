import { Component } from '@angular/core';
import { AdvisorHeroComponent } from './components/advisor-hero/advisor-hero.component';
import { MethodologyStepsComponent } from './components/methodology-steps/methodology-steps.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';

@Component({
  selector: 'app-asesoria',
  imports: [AdvisorHeroComponent, MethodologyStepsComponent, TestimonialsComponent],
  template: `
    <app-advisor-hero />
    <app-methodology-steps />
    <app-testimonials />
  `,
})
export class AsesoriaComponent {}
