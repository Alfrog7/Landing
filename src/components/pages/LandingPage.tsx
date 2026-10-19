import { useState } from 'preact/hooks';
import { ArrowRight } from 'lucide-preact';
import { Accordion } from '../ui/Accordion';
import { Hero } from '../landing/Hero';
import { SolutionsCarousel } from '../landing/SolutionsCarousel';
import { HowItWorks } from '../landing/HowItWorks';
import { InsurerLogoStrip } from '../landing/InsurerLogoStrip';
import { WhyMelanie } from '../landing/WhyMelanie';
import { AppointmentScheduler } from '../landing/AppointmentScheduler';
import { ServiceDetailModal } from '../landing/ServiceDetailModal';
import { useTranslation } from '../../core/i18n/i18n';
import { LANDING_FAQS_DATA } from '../../core/data/landing.data';
import type { AudienceCategory, ServiceDetail } from '../../core/models/insurance-service.model';

export default function LandingPage() {
  const tr = useTranslation();
  const [activeTab, setActiveTab] = useState<AudienceCategory>('empresas');
  const [detail, setDetail] = useState<ServiceDetail | null>(null);

  const faqs = LANDING_FAQS_DATA.map((_, index) => ({
    question: tr.t(`faq.q${index + 1}`),
    answer: tr.t(`faq.a${index + 1}`),
  }));

  return (
    <app-landing>
      <Hero activeTab={activeTab} onTabChange={setActiveTab} />

      <SolutionsCarousel activeTab={activeTab} onDetailPressed={setDetail} />

      <HowItWorks />

      <InsurerLogoStrip />

      <WhyMelanie />

      <AppointmentScheduler />

      <section class="section screen" id="faq">
        <div class="container landing-faq">
          <div class="landing-faq__head">
            <h2 class="section-title">{tr.t('faq.title')}</h2>
            <a class="landing-faq__all" href="/preguntas-frecuentes">
              {tr.t('faq.more')}
              <ArrowRight size={16} />
            </a>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      {detail && <ServiceDetailModal service={detail} onClose={() => setDetail(null)} />}
    </app-landing>
  );
}
