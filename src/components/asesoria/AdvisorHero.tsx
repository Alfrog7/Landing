import { Button } from '../ui/Button';
import { BRAND_CONFIG } from '../../core/config/brand.config';
import { WhatsAppService } from '../../core/services/whatsapp.service';

const whatsappUrl = WhatsAppService.buildGenericUrl(
  'quisiera conversar con la corredora sobre las coberturas de mi empresa.',
);

export function AdvisorHero() {
  const brand = BRAND_CONFIG;

  return (
    <app-advisor-hero>
      <section class="advisor">
        <div class="container advisor__grid">
          <div class="advisor__media">
            <img src={brand.assets.advisorPhoto} alt={`${brand.brandName}, ${brand.roleTitle}`} />
          </div>
          <div class="advisor__copy">
            <h1>{brand.brandName}</h1>
            <p class="advisor__role">
              {brand.roleTitle} · {brand.licenseId}
            </p>
            <p class="advisor__bio">
              Asesoro a empresas de construcción, ingeniería y minería con un enfoque netamente
              consultivo: licito tu póliza entre las principales
              aseguradoras del mercado, negocio la prima y respondo por tu equipo en cada siniestro,
              todo sin costo adicional para tu empresa.
            </p>
            <dl class="advisor__facts">
              <div>
                <dt>Sectores regulados</dt>
                <dd>minero, construcción y energía</dd>
              </div>
              <div>
                <dt>Costo cero</dt>
                <dd>la comisión la paga la aseguradora</dd>
              </div>
            </dl>
            <div class="advisor__ctas">
              <Button variant="primary" href="/agendar-cita">
                Agendar asesoría de 15 min
              </Button>
              <Button variant="whatsapp" href={whatsappUrl} target="_blank">
                Consultar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </app-advisor-hero>
  );
}
