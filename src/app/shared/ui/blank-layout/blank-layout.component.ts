import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet],
  template: `
    <div class="blank-layout">
      <router-outlet />
    </div>
  `,
  styles: [
    `
      .blank-layout {
        min-height: 100vh;
        background: var(--color-bg);
      }
    `,
  ],
})
export class BlankLayoutComponent {}
