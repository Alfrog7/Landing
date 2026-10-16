/// <reference path="../.astro/types.d.ts" />

// Los componentes envuelven su marcado en elementos personalizados `app-*`
// (misma jerarquía DOM que la versión Angular), a los que se adjuntan sus estilos.
declare namespace preact.JSX {
  interface IntrinsicElements {
    [tag: `app-${string}`]: HTMLAttributes<HTMLElement>;
  }
}
