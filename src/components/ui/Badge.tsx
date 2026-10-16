import type { ComponentChildren } from 'preact';

export function Badge({
  variant = 'primary',
  children,
}: {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'warn';
  children?: ComponentChildren;
}) {
  return (
    <app-badge>
      <span class={`app-badge app-badge--${variant}`}>{children}</span>
    </app-badge>
  );
}
