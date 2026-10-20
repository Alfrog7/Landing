import { BadgeCheck, Scale, ShieldCheck } from 'lucide-preact';
import { BRAND_CONFIG } from '../../core/config/brand.config';
import { useTranslation } from '../../core/i18n/i18n';
import { useAdvisorPhoto } from './useAdvisorPhoto';

// "Dos perfiles, una sola profesional" (feedback §5, issue #14): reemplaza a
// "¿Por qué Melanie?". Foto real + tarjetas Abogada | Corredora de seguros con el
// texto literal aprobado; los 3 bloques de beneficios se conservan debajo.
export function WhyMelanie() {
  const tr = useTranslation();
  const brand = BRAND_CONFIG;
  const photo = useAdvisorPhoto();

  return (
    <app-why-melanie>
      <section class="section screen why" id="sobre-melanie">
        <div class="container why__grid">
          <article class="why__profile">
            <div class="why__photo-card">
              <img
                src={photo.src}
                ref={photo.ref}
                onError={photo.onError}
                alt={`${brand.ownerName}, ${brand.roleTitle}`}
                class="why__photo"
                width={480}
                height={384}
                loading="lazy"
                decoding="async"
              />
              <span class="why__sbs-badge">
                <BadgeCheck size={16} />
                {brand.legalLine}
              </span>
            </div>
            <h3 class="why__name">{brand.ownerName}</h3>
            <p class="why__role">
              {tr.t('why.role')} · {brand.licenseId}
            </p>
            <p class="why__track">{tr.t('why.track')}</p>
            <blockquote class="why__quote">“{brand.quote}”</blockquote>
            <a class="why__cta" href="/#agendar">
              {tr.t('why.cta')}
            </a>
          </article>

          <div class="why__blocks">
            <h2 class="section-title why__title">{tr.t('why.title')}</h2>
            <p class="why__intro">{tr.t('why.profilesIntro')}</p>
            <div class="why__profiles">
              <article class="why__profile-card">
                <span class="why__profile-icon" aria-hidden="true">
                  <Scale size={20} />
                </span>
                <h3>{tr.t('why.profile1Title')}</h3>
                <p>{tr.t('why.profile1Text')}</p>
              </article>
              <article class="why__profile-card">
                <span class="why__profile-icon" aria-hidden="true">
                  <ShieldCheck size={20} />
                </span>
                <h3>{tr.t('why.profile2Title')}</h3>
                <p>{tr.t('why.profile2Text')}</p>
              </article>
            </div>
            {[1, 2, 3].map((n) => (
              <div key={n} class="why__block">
                <h3>{tr.t(`why.block${n}Title`)}</h3>
                <p>{tr.t(`why.block${n}Text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </app-why-melanie>
  );
}
