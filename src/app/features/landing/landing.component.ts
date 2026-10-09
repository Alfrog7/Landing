import { Component, signal } from '@angular/core';
import { AccordionComponent } from '../../shared/components/accordion/accordion.component';
import { HeroComponent } from './components/hero/hero.component';
import { SolutionsCarouselComponent } from './components/solutions-carousel/solutions-carousel.component';
import { InsurersLogowallComponent } from './components/insurers-logowall/insurers-logowall.component';
import { WhyMelanieComponent } from './components/why-melanie/why-melanie.component';
import { AppointmentSchedulerComponent } from './components/appointment-scheduler/appointment-scheduler.component';
import { FastQuoteService } from './fast-quote.service';
import { LANDING_FAQS_DATA } from '../../core/data/landing.data';
import { AudienceCategory, InsuranceService } from '../../core/models/insurance-service.model';

@Component({
  selector: 'app-landing',
  imports: [
    AccordionComponent,
    HeroComponent,
    SolutionsCarouselComponent,
    InsurersLogowallComponent,
    WhyMelanieComponent,
    AppointmentSchedulerComponent,
  ],
  template: `
    <app-hero
      [activeTab]="activeTab()"
      (tabChange)="onTabChange($event)"
      (quotePressed)="openQuote(null)"
    />

    <app-solutions-carousel
      [activeTab]="activeTab()"
      (quotePressed)="openQuote($event)"
    />

    <app-insurers-logowall />

    <app-why-melanie />

    <app-appointment-scheduler />

    <section class="section" id="faq">
      <div class="container landing-faq">
        <div class="text-center landing-faq__head">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2 class="section-title">Respuestas rápidas antes de cotizar</h2>
        </div>
        <app-accordion [items]="faqs" />
      </div>
    </section>
  `,
  styles: [
    `
      .landing-faq {
        max-width: 820px;
      }
      .landing-faq__head {
        margin-bottom: 1.8rem;
      }
      .landing-faq app-accordion {
        display: block;
      }
    `,
  ],
})
export class LandingComponent {
  readonly activeTab = signal<AudienceCategory>('empresas');
  readonly faqs = LANDING_FAQS_DATA;

  constructor(private readonly fastQuoteService: FastQuoteService) {}

  onTabChange(tab: AudienceCategory): void {
    this.activeTab.set(tab);
  }

  openQuote(service: InsuranceService | null): void {
    this.fastQuoteService.open(service);
  }
}
