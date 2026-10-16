import { ArrowDown, ArrowRight, Building2, CircleCheck, Users } from 'lucide-preact';
import { useTranslation } from '../../core/i18n/i18n';
import type { AudienceCategory } from '../../core/models/insurance-service.model';
import { Meipo } from './Meipo';

interface HeroProps {
  activeTab: AudienceCategory;
  onTabChange: (tab: AudienceCategory) => void;
  onQuotePressed: () => void;
}

export function Hero({ activeTab, onTabChange, onQuotePressed }: HeroProps) {
  const tr = useTranslation();

  return (
    <app-hero>
      <section class="hero">
        <span class="hero__orb hero__orb--emerald" aria-hidden="true"></span>
        <span class="hero__orb hero__orb--sky" aria-hidden="true"></span>
        <div class="container hero__grid">
          <div class="hero__copy">
            <span class="hero__badge">{tr.t('hero.badge')}</span>
            <h1 class="hero__title">{tr.t('hero.title')}</h1>
            <p class="hero__lead">{tr.t('hero.lead')}</p>

            <div class="hero__tabs" role="tablist" aria-label={tr.t('hero.tabsAria')}>
              <button
                type="button"
                role="tab"
                class={`hero__tab${activeTab === 'empresas' ? ' hero__tab--active' : ''}`}
                aria-selected={activeTab === 'empresas'}
                onClick={() => onTabChange('empresas')}
              >
                <Building2 size={18} />
                {tr.t('hero.tabEmpresas')}
              </button>
              <button
                type="button"
                role="tab"
                class={`hero__tab${activeTab === 'personas' ? ' hero__tab--active' : ''}`}
                aria-selected={activeTab === 'personas'}
                onClick={() => onTabChange('personas')}
              >
                <Users size={18} />
                {tr.t('hero.tabPersonas')}
              </button>
            </div>

            <div class="hero__ctas">
              <button type="button" class="hero__cta-primary" onClick={onQuotePressed}>
                {tr.t('hero.ctaPrimary')}
                <ArrowRight size={18} />
              </button>
              <a href="/#soluciones" class="hero__cta-secondary">
                {tr.t('hero.ctaSecondary')}
                <ArrowDown size={18} />
              </a>
            </div>

            <ul class="hero__trust">
              <li>
                <CircleCheck size={18} />
                {tr.t('hero.trust1')}
              </li>
              <li>
                <CircleCheck size={18} />
                {tr.t('hero.trust2')}
              </li>
              <li>
                <CircleCheck size={18} />
                {tr.t('hero.trust3')}
              </li>
            </ul>
          </div>

          <div class="hero__media">
            <div class="hero__meipo-capsule">
              <Meipo size={220} class="hero__meipo" />
            </div>
            <div class="hero__meipo-shadow" aria-hidden="true"></div>
            <div class="hero__bubble">{tr.t('hero.bubble')}</div>
            <div class="hero__float hero__float--1">
              <strong>{tr.t('hero.float1Title')}</strong>
              <span>{tr.t('hero.float1Sub')}</span>
            </div>
            <div class="hero__float hero__float--2">
              <strong>{tr.t('hero.float2Title')}</strong>
              <span>{tr.t('hero.float2Sub')}</span>
            </div>
          </div>
        </div>
      </section>
    </app-hero>
  );
}
