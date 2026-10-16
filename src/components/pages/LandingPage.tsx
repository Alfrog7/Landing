import { useState } from 'preact/hooks';
import { MessageCircle } from 'lucide-preact';
import { Accordion } from '../ui/Accordion';
import { Hero } from '../landing/Hero';
import { SolutionsCarousel } from '../landing/SolutionsCarousel';
import { InsurersCoverageTable } from '../landing/InsurersCoverageTable';
import { WhyMelanie } from '../landing/WhyMelanie';
import { AppointmentScheduler } from '../landing/AppointmentScheduler';
import { ServiceDetailModal } from '../landing/ServiceDetailModal';
import { useTranslation } from '../../core/i18n/i18n';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { LANDING_FAQS_DATA } from '../../core/data/landing.data';
import type { AudienceCategory, ServiceDetail } from '../../core/models/insurance-service.model';

const urgentUrl = WhatsAppService.buildUrgentCheckpointUrl();

export default function LandingPage() {
  const tr = useTranslation();
  const [activeTab, setActiveTab] = useState<AudienceCategory>('empresas');
  const [detail, setDetail] = useState<ServiceDetail | null>(null);

  const faqs = LANDING_FAQS_DATA.map((_, index) => ({
    question: tr.t(`faq.q${index + 1}`),
    answer: tr.t(`faq.a${index + 1}`),
  }));

  const quotePressed = () => {
    document.getElementById('soluciones')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <app-landing>
      <Hero activeTab={activeTab} onTabChange={setActiveTab} onQuotePressed={quotePressed} />

      <SolutionsCarousel activeTab={activeTab} onDetailPressed={setDetail} />

      <InsurersCoverageTable />

      <WhyMelanie />

      <AppointmentScheduler />

      <div class="landing-urgent" role="complementary">
        <div class="landing-urgent__copy">
          <strong>{tr.t('schedule.urgentTitle')}</strong>
          <p>{tr.t('schedule.urgentText')}</p>
        </div>
        <a class="landing-urgent__btn" href={urgentUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} />
          {tr.t('schedule.urgentBtn')}
        </a>
      </div>

      <section class="section" id="faq">
        <div class="container landing-faq">
          <div class="text-center landing-faq__head">
            <span class="eyebrow">{tr.t('faq.eyebrow')}</span>
            <h2 class="section-title">{tr.t('faq.title')}</h2>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      {detail && <ServiceDetailModal service={detail} onClose={() => setDetail(null)} />}
    </app-landing>
  );
}
