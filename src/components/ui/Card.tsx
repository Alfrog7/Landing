import type { ComponentChildren } from 'preact';

export function Card({ class: className, children }: { class?: string; children?: ComponentChildren }) {
  return (
    <app-card class={className}>
      <div class="app-card">{children}</div>
    </app-card>
  );
}
