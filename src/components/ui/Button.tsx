import type { ComponentChildren } from 'preact';

export type AppButtonVariant = 'primary' | 'outline' | 'whatsapp' | 'ghost';

interface ButtonProps {
  variant?: AppButtonVariant;
  type?: 'button' | 'submit';
  href?: string | null;
  target?: string | null;
  disabled?: boolean;
  block?: boolean;
  onPressed?: () => void;
  children?: ComponentChildren;
}

export function Button({
  variant = 'primary',
  type = 'button',
  href = null,
  target = null,
  disabled,
  block = false,
  onPressed,
  children,
}: ButtonProps) {
  const className = `app-btn app-btn--${variant}${block ? ' app-btn--block' : ''}`;
  return (
    <app-button>
      {href ? (
        <a
          href={href}
          target={target ?? undefined}
          rel={target ? '_blank noopener noreferrer' : undefined}
          class={className}
        >
          {children}
        </a>
      ) : (
        <button type={type} disabled={disabled === true} onClick={() => onPressed?.()} class={className}>
          {children}
        </button>
      )}
    </app-button>
  );
}
