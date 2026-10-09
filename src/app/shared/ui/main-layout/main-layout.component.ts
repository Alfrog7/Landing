import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, TopNavbarComponent, FooterComponent],
  template: `
    <app-top-navbar />
    <main class="main-layout__content">
      <router-outlet />
    </main>
    <app-footer />
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
