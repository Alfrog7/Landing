import { useState } from 'preact/hooks';
import { BadgeCheck } from 'lucide-preact';
import { BRAND_CONFIG } from '../../core/config/brand.config';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { useTranslation } from '../../core/i18n/i18n';
import { CalendarSelector } from './CalendarSelector';
import { Meipo } from './Meipo';

const TIME_SLOTS = ['09:30 AM', '11:00 AM', '03:30 PM', '04:45 PM', '05:30 PM'];

export function AppointmentScheduler() {
  const tr = useTranslation();
  const brand = BRAND_CONFIG;

  // Fotografía real con fallback automático al placeholder mientras no exista el archivo
  const [photoSrc, setPhotoSrc] = useState<string>(brand.assets.advisorPhotoReal);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyOrRuc, setCompanyOrRuc] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  // Se guarda el índice del tema para que siga correcto al cambiar de idioma
  const [topicIndex, setTopicIndex] = useState(0);

  const topics = tr.list('schedule.topics');
  const serviceTopic = topics[topicIndex] ?? topics[0] ?? '';

  const canSubmit =
    selectedDate.length > 0 && selectedSlot.length > 0 && fullName.trim().length > 0 && whatsapp.trim().length > 0;

  const onSubmit = (event: Event) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }
    const [year, month, day] = selectedDate.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dateLabel = dateObj.toLocaleDateString(tr.current.locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    const url = WhatsAppService.buildAppointmentUrl({
      date: dateLabel,
      time: selectedSlot,
      fullName,
      companyOrRuc,
      serviceTopic,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <app-appointment-scheduler>
      <section class="section scheduler" id="agendar">
        <span class="scheduler__orb scheduler__orb--emerald" aria-hidden="true"></span>
        <span class="scheduler__orb scheduler__orb--sky" aria-hidden="true"></span>
        <div class="container">
          <div class="text-center scheduler__head">
            <span class="eyebrow">{tr.t('schedule.eyebrow')}</span>
            <h2 class="section-title">{tr.t('schedule.title')}</h2>
          </div>

          <div class="scheduler__panel">
            <aside class="scheduler__aside">
              <div class="scheduler__photo-card">
                <img
                  src={photoSrc}
                  onError={() => setPhotoSrc(brand.assets.advisorPhoto)}
                  alt={brand.ownerName}
                  class="scheduler__avatar"
                />
                <span class="scheduler__sbs-badge">
                  <BadgeCheck size={14} />
                  {brand.sbsChipShort}
                </span>
              </div>
              <strong class="scheduler__owner">{brand.ownerName}</strong>
              <span class="scheduler__license">
                {tr.t('why.role')} · {brand.licenseId}
              </span>

              <ul class="scheduler__tags">
                <li>{tr.t('schedule.tag1')}</li>
                <li>{tr.t('schedule.tag2')}</li>
                <li>{tr.t('schedule.tag3')}</li>
              </ul>

              <div class="scheduler__tip">
                <Meipo size={46} />
                <p>{tr.t('schedule.meipoTip')}</p>
              </div>

              <p class="scheduler__privacy">{tr.t('schedule.privacy')}</p>
            </aside>

            <form class="scheduler__form" onSubmit={onSubmit} noValidate>
              <fieldset>
                <legend>{tr.t('schedule.step1')}</legend>
                <div class="scheduler__step1">
                  <CalendarSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
                  <div class="scheduler__slots-column">
                    <p class="scheduler__slots-title">{tr.t('schedule.slotsTitle')}</p>
                    <div class="scheduler__slots-grid">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          class={`scheduler__slot${selectedSlot === slot ? ' scheduler__slot--active' : ''}`}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>{tr.t('schedule.step2')}</legend>
                <div class="scheduler__fields">
                  <input
                    type="text"
                    placeholder={tr.t('schedule.phName')}
                    autocomplete="name"
                    value={fullName}
                    onInput={(e) => setFullName(e.currentTarget.value)}
                    name="fullName"
                    required
                  />
                  <input
                    type="text"
                    placeholder={tr.t('schedule.phCompany')}
                    autocomplete="organization"
                    value={companyOrRuc}
                    onInput={(e) => setCompanyOrRuc(e.currentTarget.value)}
                    name="companyOrRuc"
                  />
                  <input
                    type="tel"
                    placeholder={tr.t('schedule.phWhats')}
                    autocomplete="tel"
                    value={whatsapp}
                    onInput={(e) => setWhatsapp(e.currentTarget.value)}
                    name="whatsapp"
                    required
                  />
                  <select
                    value={String(topicIndex)}
                    onChange={(e) => setTopicIndex(Number(e.currentTarget.value))}
                    name="serviceTopic"
                    required
                  >
                    {topics.map((topic, index) => (
                      <option key={index} value={String(index)}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>

              <button type="submit" class="scheduler__confirm" disabled={!canSubmit}>
                {tr.t('schedule.confirm')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </app-appointment-scheduler>
  );
}
