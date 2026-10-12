import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { WhatsAppFloatComponent } from '../whatsapp-float/whatsapp-float.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, TopNavbarComponent, FooterComponent, WhatsAppFloatComponent],
  template: `
    <div class="main-layout">
      <app-top-navbar />
      <main class="main-layout__content">
        <router-outlet />
      </main>
      <app-footer />
      <app-whatsapp-float />
    </div>
  `,
  styles: [
    `
      .main-layout {
        position: relative;
        display: block;
        width: 100%;
        min-height: 100vh;
        overflow-x: hidden;
      }
      @supports (min-height: 100dvh) {
        .main-layout {
          min-height: 100dvh;
        }
      }
      .main-layout__content {
        min-height: 60vh;
      }
    `,
  ],
})
export class MainLayoutComponent {}
