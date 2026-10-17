import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { useTranslation } from '../../core/i18n/i18n';

const url = WhatsAppService.buildGenericUrl('quisiera cotizar un seguro con asesoría personalizada.');

export default function WhatsAppFloat() {
  const tr = useTranslation();

  return (
    <app-whatsapp-float>
      <a class="wafloat" href={url} target="_blank" rel="noopener noreferrer" aria-label={tr.t('navbar.waFloatAria')}>
        <WhatsAppIcon size={30} />
        <span class="wafloat__tooltip">{tr.t('navbar.waChat')}</span>
      </a>
    </app-whatsapp-float>
  );
}
