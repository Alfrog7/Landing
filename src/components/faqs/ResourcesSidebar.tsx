import { Button } from '../ui/Button';

export function ResourcesSidebar() {
  return (
    <app-resources-sidebar>
      <div class="sidebar">
        <h3>¿Sigues con dudas?</h3>
        <p class="sidebar__cta">Agenda una videollamada gratuita con la corredora y resuélvelas en vivo.</p>
        <Button variant="primary" href="/#agendar" block>
          Agendar videollamada
        </Button>
      </div>
    </app-resources-sidebar>
  );
}
