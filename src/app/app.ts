import { Component, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    // Resaltado de llegada (glow) sobre la sección del fragmento activo.
    // Se dispara por JS porque :target no se re-evalúa tras pushState del router.
    const router = inject(Router);
    inject(DestroyRef).onDestroy(() => this.subscription?.unsubscribe());
    this.subscription = router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          this.triggerGlow(event.urlAfterRedirects);
        }
      },
    });
  }

  private subscription?: ReturnType<Router['events']['subscribe']>;

  private triggerGlow(url: string): void {
    const hashIndex = url.indexOf('#');
    if (hashIndex === -1) {
      return;
    }
    const fragment = url.slice(hashIndex + 1).split('?')[0];
    if (!fragment) {
      return;
    }
    const target = document.getElementById(fragment);
    if (!target) {
      return;
    }
    // Reinicia la animación si la clase ya estaba aplicada.
    target.classList.remove('section-arriving');
    void target.offsetWidth;
    target.classList.add('section-arriving');
    window.setTimeout(() => target.classList.remove('section-arriving'), 1200);
  }
}
