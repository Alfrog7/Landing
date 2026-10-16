import { useState } from 'preact/hooks';
import { BadgeCheck, Clock, MessageCircle, ShieldCheck } from 'lucide-preact';
import { BRAND_CONFIG } from '../../core/config/brand.config';
import { useTranslation } from '../../core/i18n/i18n';

export function WhyMelanie() {
  const tr = useTranslation();
  const brand = BRAND_CONFIG;
  // Fotografía real con fallback automático al placeholder mientras no exista el archivo
  const [photoSrc, setPhotoSrc] = useState<string>(brand.assets.advisorPhotoReal);

  return (
    <app-why-melanie>
      <section class="section why" id="sobre-melanie">
        <div class="container why__grid">
          <article class="why__profile">
            <div class="why__photo-card">
              <img
                src={photoSrc}
                onError={() => setPhotoSrc(brand.assets.advisorPhoto)}
                alt={`${brand.ownerName}, ${brand.roleTitle}`}
                class="why__photo"
              />
              <span class="why__sbs-badge">
                <BadgeCheck size={16} />
                {brand.sbsChipShort} · Persona Natural Colegiada
              </span>
            </div>
            <h3 class="why__name">{brand.ownerName}</h3>
            <p class="why__role">
              {tr.t('why.role')} · {brand.licenseId}
            </p>
            <p class="why__track">{tr.t('why.track')}</p>
            <blockquote class="why__quote">“{brand.quote}”</blockquote>
          </article>

          <div class="why__blocks">
            <h2 class="section-title why__title">{tr.t('why.title')}</h2>
            <div class="why__block">
              <span class="why__icon why__icon--green">
                <MessageCircle size={24} />
              </span>
              <div>
                <h3>{tr.t('why.block1Title')}</h3>
                <p>{tr.t('why.block1Text')}</p>
              </div>
            </div>
            <div class="why__block">
              <span class="why__icon why__icon--sky">
                <Clock size={24} />
              </span>
              <div>
                <h3>{tr.t('why.block2Title')}</h3>
                <p>{tr.t('why.block2Text')}</p>
              </div>
            </div>
            <div class="why__block">
              <span class="why__icon why__icon--orange">
                <ShieldCheck size={24} />
              </span>
              <div>
                <h3>{tr.t('why.block3Title')}</h3>
                <p>{tr.t('why.block3Text')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </app-why-melanie>
  );
}
