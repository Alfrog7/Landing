import { Component, computed, inject, signal } from '@angular/core';
import { LucideMessageCircle } from '@lucide/angular';
import { AccordionComponent } from '../../shared/components/accordion/accordion.component';
import { HeroComponent } from './components/hero/hero.component';
import { SolutionsCarouselComponent } from './components/solutions-carousel/solutions-carousel.component';
import { InsurersCoverageTableComponent } from './components/insurers-coverage-table/insurers-coverage-table.component';
import { WhyMelanieComponent } from './components/why-melanie/why-melanie.component';
import { AppointmentSchedulerComponent } from './components/appointment-scheduler/appointment-scheduler.component';
import { ServiceDetailService } from './service-detail.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { WhatsAppService } from '../../core/services/whatsapp.service';
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
    LucideMessageCircle,
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

    <div class="landing-urgent" role="complementary">
      <div class="landing-urgent__copy">
        <strong>{{ tr.t('schedule.urgentTitle') }}</strong>
        <p>{{ tr.t('schedule.urgentText') }}</p>
      </div>
      <a class="landing-urgent__btn" [href]="urgentUrl" target="_blank" rel="noopener noreferrer">
        <svg lucideMessageCircle [size]="18" />
        {{ tr.t('schedule.urgentBtn') }}
      </a>
    </div>

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
      // Separador único de urgencia antes de Preguntas Frecuentes
      .landing-urgent {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.2rem;
        width: min(56rem, 92%);
        // Visualmente conectado con la tarjeta del agendador (gap efectivo ≈ mt-6)
        margin: -1.5rem auto 0;
        background: var(--color-primary-light);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-3xl);
        padding: 1.4rem 1.6rem;
        text-align: center;
      }
      .landing-urgent__copy {
        min-width: 0;
      }
      .landing-urgent strong {
        color: var(--color-heading);
        font-size: 1rem;
      }
      .landing-urgent p {
        margin: 0.2rem 0 0;
        font-size: 0.88rem;
        color: var(--color-body);
      }
      .landing-urgent__btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.8rem 1.3rem;
        background: var(--color-primary);
        color: #fff;
        border-radius: 999px;
        font-size: 0.88rem;
        font-weight: 700;
        white-space: nowrap;
        flex-shrink: 0;
        transition: background 0.25s ease;
      }
      .landing-urgent__btn:hover {
        background: var(--color-primary-dark);
      }
      @media (max-width: 640px) {
        .landing-urgent {
          flex-direction: column;
          align-items: stretch;
          gap: 0.75rem;
          padding: 1.1rem 1.2rem;
          text-align: center;
        }
        .landing-urgent__btn {
          justify-content: center;
          white-space: normal;
        }
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

  readonly urgentUrl: string;

  constructor(
    private readonly serviceDetailService: ServiceDetailService,
    whatsapp: WhatsAppService
  ) {
    this.urgentUrl = whatsapp.buildUrgentCheckpointUrl();
  }

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
