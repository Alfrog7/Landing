import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { BRAND_CONFIG } from '../../core/config/brand.config';
import { WhatsAppService } from '../../core/services/whatsapp.service';

const whatsappUrl = WhatsAppService.buildGenericUrl(
  'quisiera conversar con la corredora sobre las coberturas de mi empresa.'
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
            <span class="eyebrow">Perfil de autoridad</span>
            <h1>{brand.brandName}</h1>
            <p class="advisor__role">
              {brand.roleTitle} · {brand.licenseId}
            </p>
            <p class="advisor__bio">
              Con más de una década asesorando a empresas en construcción, ingeniería y minería, he consolidado un
              enfoque netamente consultivo: licito tu póliza entre las principales aseguradoras del mercado, negocio la
              prima y respondo por tu equipo en cada siniestro, todo sin costo adicional para tu empresa.
            </p>
            <div class="advisor__badges">
              <Badge variant="primary">{brand.licenseId}</Badge>
              <Badge variant="secondary">{brand.supervisionBadge}</Badge>
              <Badge variant="whatsapp">Respuesta en menos de 24h</Badge>
            </div>
            <div class="advisor__highlights">
              <Card class="highlight">
                <strong>+150 empresas</strong>
                <span>patrocinadas en portafolio gestionado</span>
              </Card>
              <Card class="highlight">
                <strong>Sectores regulados</strong>
                <span>minero, construcción y energía</span>
              </Card>
              <Card class="highlight">
                <strong>Costo cero</strong>
                <span>la comisión la paga la aseguradora</span>
              </Card>
            </div>
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
