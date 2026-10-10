import { Component, computed, inject, signal } from '@angular/core';
import { AccordionComponent } from '../../shared/components/accordion/accordion.component';
import { HeroComponent } from './components/hero/hero.component';
import { SolutionsCarouselComponent } from './components/solutions-carousel/solutions-carousel.component';
import { InsurersCoverageTableComponent } from './components/insurers-coverage-table/insurers-coverage-table.component';
import { WhyMelanieComponent } from './components/why-melanie/why-melanie.component';
import { AppointmentSchedulerComponent } from './components/appointment-scheduler/appointment-scheduler.component';
import { ServiceDetailService } from './service-detail.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { LANDING_FAQS_DATA } from '../../core/data/landing.data';
import { AudienceCategory, ServiceDetail } from '../../core/models/insurance-service.model';

@Component({
  selector: 'app-landing',
  imports: [
    AccordionComponent,
    HeroComponent,
    SolutionsCarouselComponent,
    InsurersCoverageTableComponent,
    WhyMelanieComponent,
    AppointmentSchedulerComponent,
  ],
  template: `
    <app-hero
      [activeTab]="activeTab()"
      (tabChange)="onTabChange($event)"
      (quotePressed)="quotePressed()"
    />

    <app-solutions-carousel
      [activeTab]="activeTab()"
      (detailPressed)="openDetail($event)"
    />

    <app-insurers-coverage-table />

    <app-why-melanie />

    <app-appointment-scheduler />

    <section class="section" id="faq">
      <div class="container landing-faq">
        <div class="text-center landing-faq__head">
          <span class="eyebrow">{{ tr.t('faq.eyebrow') }}</span>
          <h2 class="section-title">{{ tr.t('faq.title') }}</h2>
        </div>
        <app-accordion [items]="faqs()" />
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
  readonly tr = inject(TranslationService);
  readonly activeTab = signal<AudienceCategory>('empresas');
  readonly faqs = computed(() =>
    LANDING_FAQS_DATA.map((faq, index) => ({
      question: this.tr.t('faq.q' + (index + 1)),
      answer: this.tr.t('faq.a' + (index + 1)),
    }))
  );

  constructor(private readonly serviceDetailService: ServiceDetailService) {}

  onTabChange(tab: AudienceCategory): void {
    this.activeTab.set(tab);
  }

  openDetail(service: ServiceDetail): void {
    this.serviceDetailService.open(service);
  }

  quotePressed(): void {
    document.getElementById('soluciones')?.scrollIntoView({ behavior: 'smooth' });
  }
}
