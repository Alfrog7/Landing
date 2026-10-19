import { ArrowDown, Building2, Check, Users } from 'lucide-preact';
import { useTranslation } from '../../core/i18n/i18n';
import type { AudienceCategory } from '../../core/models/insurance-service.model';
import { Mepo } from './Mepo';

interface HeroProps {
  activeTab: AudienceCategory;
  onTabChange: (tab: AudienceCategory) => void;
}

export function Hero({ activeTab, onTabChange }: HeroProps) {
  const tr = useTranslation();

  return (
    <app-hero>
      <section class="hero screen">
        <div class="container hero__grid">
          <div class="hero__copy">
            <h1 class="hero__title">{tr.t('hero.title')}</h1>
            <p class="hero__lead">{tr.t('hero.lead')}</p>

            <div class={`hero__tabs${activeTab === 'personas' ? ' hero__tabs--personas' : ''}`} role="tablist" aria-label={tr.t('hero.tabsAria')}>
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
              <a href="/cotizador" class="hero__cta-primary">
                {tr.t('hero.ctaPrimary')}
              </a>
              <a href="/#como-funciona" class="hero__cta-secondary">
                {tr.t('hero.ctaSecondary')}
                <ArrowDown size={18} />
              </a>
            </div>

            <ul class="hero__trust">
              <li>{tr.t('hero.trust1')}</li>
              <li>{tr.t('hero.trust2')}</li>
              <li>{tr.t('hero.trust3')}</li>
            </ul>
          </div>

          <figure class="hero__doc-wrap">
            <div class="hero__doc" role="img" aria-label={tr.t('hero.docTitle')}>
              <div class="hero__doc-head">
                <span class="hero__doc-title">{tr.t('hero.docTitle')}</span>
                <span class="hero__doc-status">
                  <i aria-hidden="true"></i>
                  {tr.t('hero.docStatus')}
                </span>
              </div>
              <dl class="hero__doc-fields">
                <div>
                  <dt>{tr.t('hero.docCompany')}</dt>
                  <dd>Constructora Andina S.A.C.</dd>
                </div>
                <div>
                  <dt>{tr.t('hero.docRuc')}</dt>
                  <dd>20 ••••••• 89</dd>
                </div>
                <div>
                  <dt>{tr.t('hero.docCover')}</dt>
                  <dd>SCTR Salud + Pensión</dd>
                </div>
                <div>
                  <dt>{tr.t('hero.docValidity')}</dt>
                  <dd>16/10/2026 – 15/11/2026</dd>
                </div>
                <div>
                  <dt>{tr.t('hero.docIssued')}</dt>
                  <dd>1 h 38 min</dd>
                </div>
              </dl>
              <div class="hero__doc-foot">
                <span class="hero__doc-bars" aria-hidden="true"></span>
                <span class="hero__doc-stamp" aria-hidden="true">
                  <Check size={18} />
                  <b>SBS</b>
                  <em>N-4050</em>
                </span>
              </div>
            </div>
            <Mepo size={150} class="hero__mepo" />
            <figcaption class="hero__doc-note">{tr.t('hero.docExample')}</figcaption>
          </figure>
        </div>
      </section>
    </app-hero>
  );
}
