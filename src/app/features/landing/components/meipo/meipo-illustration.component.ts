import { Component, DestroyRef, HostListener, inject, input, signal } from '@angular/core';

@Component({
  selector: 'app-meipo',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 220 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Meipo, el koala asesor con gafas y tableta"
      class="meipo-svg"
      [class.meipo-svg--wave]="waving()"
    >
      <!-- Orejas -->
      <circle cx="42" cy="66" r="30" fill="#8FA6AD" />
      <circle cx="42" cy="66" r="18" fill="#F4B7B2" />
      <circle cx="178" cy="66" r="30" fill="#8FA6AD" />
      <circle cx="178" cy="66" r="18" fill="#F4B7B2" />
      <!-- Cabeza -->
      <ellipse cx="110" cy="105" rx="78" ry="72" fill="#A8BFC7" />
      <!-- Gafas -->
      <circle cx="82" cy="96" r="21" fill="#FFFFFF" stroke="#0F172A" stroke-width="5" />
      <circle cx="138" cy="96" r="21" fill="#FFFFFF" stroke="#0F172A" stroke-width="5" />
      <path d="M103 96h14" stroke="#0F172A" stroke-width="5" stroke-linecap="round" />
      <!-- Ojos -->
      <circle cx="82" cy="96" r="5" fill="#0F172A" />
      <circle cx="138" cy="96" r="5" fill="#0F172A" class="meipo-eye--right" />
      <circle cx="84" cy="94" r="1.6" fill="#FFFFFF" />
      <circle cx="140" cy="94" r="1.6" fill="#FFFFFF" />
      <!-- Nariz -->
      <ellipse cx="110" cy="130" rx="14" ry="18" fill="#3D3D3D" />
      <!-- Sonrisa -->
      <path d="M94 154q16 10 32 0" stroke="#3D3D3D" stroke-width="4" stroke-linecap="round" />
      <!-- Chaleco reflectante -->
      <path d="M62 176c0-12 12-20 48-20s48 8 48 20v34c0 6-5 10-10 10H72c-5 0-10-4-10-10v-34z" fill="#F97316" />
      <path d="M86 158l24 34 24-34" stroke="#ECFDF5" stroke-width="6" stroke-linecap="round" fill="none" />
      <!-- Brazos y tableta -->
      <rect x="72" y="176" width="76" height="44" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
      <rect x="82" y="184" width="56" height="6" rx="3" fill="#10B981" />
      <rect x="82" y="196" width="40" height="6" rx="3" fill="#E2E8F0" />
      <rect x="82" y="208" width="48" height="6" rx="3" fill="#E2E8F0" />
      <circle cx="58" cy="192" r="12" fill="#A8BFC7" class="meipo-arm--left" />
      <circle cx="162" cy="192" r="12" fill="#A8BFC7" class="meipo-arm--right" />
      <!-- Corazoncito -->
      <path d="M176 26c4-6 14-4 14 4 0 6-8 11-14 14-6-3-14-8-14-14 0-8 10-10 14-4z" fill="#F97316" />
    </svg>
  `,
  styles: [
    `
      .meipo-svg {
        display: block;
        max-width: 100%;
        transform-box: fill-box;
        transform-origin: center bottom;
      }
      .meipo-svg--wave {
        animation: meipo-greet 1.4s ease;
      }
      .meipo-svg--wave .meipo-eye--right {
        transform-box: fill-box;
        transform-origin: center;
        animation: meipo-wink 1.4s ease;
      }
      .meipo-svg--wave .meipo-arm--right {
        transform-box: fill-box;
        transform-origin: center;
        animation: meipo-arm 1.4s ease;
      }

      // Saludo: saltito con leve guiñada
      @keyframes meipo-greet {
        0% {
          transform: translateY(0) scale(1);
        }
        22% {
          transform: translateY(-13px) scale(1.045) rotate(-4deg);
        }
        42% {
          transform: translateY(0) scale(1);
        }
        62% {
          transform: translateY(-6px) scale(1.02) rotate(-2deg);
        }
        100% {
          transform: translateY(0) scale(1);
        }
      }
      // Guiño del ojo derecho
      @keyframes meipo-wink {
        0%,
        24% {
          transform: scaleY(1);
        }
        32%,
        44% {
          transform: scaleY(0.08);
        }
        52% {
          transform: scaleY(1);
        }
        100% {
          transform: scaleY(1);
        }
      }
      // Movimiento de brazo al saludar
      @keyframes meipo-arm {
        0% {
          transform: translateY(0);
        }
        30% {
          transform: translateY(-16px) rotate(14deg);
        }
        55% {
          transform: translateY(-8px) rotate(8deg);
        }
        80% {
          transform: translateY(-16px) rotate(14deg);
        }
        100% {
          transform: translateY(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .meipo-svg--wave,
        .meipo-svg--wave .meipo-eye--right,
        .meipo-svg--wave .meipo-arm--right {
          animation: none;
        }
      }
    `,
  ],
})
export class MeipoIllustrationComponent {
  readonly size = input<number>(180);
  readonly waving = signal(false);
  private waveTimer: number | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      if (this.waveTimer !== null) {
        window.clearTimeout(this.waveTimer);
      }
    });
  }

  @HostListener('window:meipo-wave')
  onWaveRequest(): void {
    this.waving.set(false);
    // Reinicia la SVG animación aunque el evento llegue dos veces seguidas.
    requestAnimationFrame(() => {
      this.waving.set(true);
      if (this.waveTimer !== null) {
        window.clearTimeout(this.waveTimer);
      }
      this.waveTimer = window.setTimeout(() => this.waving.set(false), 1500);
    });
  }
}
