import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { WhatsAppFloatComponent } from '../whatsapp-float/whatsapp-float.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, TopNavbarComponent, FooterComponent, WhatsAppFloatComponent],
  template: `
    <app-top-navbar />
    <main class="main-layout__content">
      <router-outlet />
    </main>
    <app-footer />
    <app-whatsapp-float />
  `,
  styles: [
    `
      .main-layout__content {
        min-height: 60vh;
      }
    `,
  ],
})
export class MainLayoutComponent {}
