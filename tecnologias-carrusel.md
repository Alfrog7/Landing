# Tecnologías del Proyecto Landing y Comportamiento del Carrusel

## 1. Stack Tecnológico Utilizado

### Framework Base
- **Angular 21.2** (standalone components, signals, zoneless change detection)
  - Componentes standalone con inputs/outputs tipados (`input()`, `output()`, `signal()`).
  - Router con `anchorScrolling` para el scroll suave entre secciones (#soluciones, #sobre-melanie, #aseguradoras, #agendar, #faq).
- **TypeScript 5.9** — modelos de datos en `src/app/core/models/`.

### Librerías Externas (adaptación del documento React → Angular)

| Librería original (doc) | Sustituta Angular | Uso en el proyecto |
|---|---|---|
| `lucide-react` | `@lucide/angular` | Iconos vectoriales: `<svg lucideShieldCheck [size]="20" />` etc. |
| `embla-carousel-react` | `embla-carousel-angular@19` (core `embla-carousel@8.6`) | Carrusel "gusanito" de soluciones |
| `embla-carousel-autoplay` | — (implementación propia con `setInterval`) | Movimiento automático del carrusel |
| `@radix-ui/react-dialog` | `@angular/cdk` (Dialog) | Modal Split-View accesible (focus trap, cierre con Escape, bloqueo de scroll) |
| `framer-motion` | Animaciones CSS (`@keyframes`) | Flotación de Meipo, entrada del modal |
| `tailwind.config.js` | Tokens SCSS en `src/styles.scss` (custom properties) | Paleta esmeralda/azul cielo, sombras, radios |

### Infraestructura
- **Git + GitHub:** `https://github.com/Alfrog7/Landing.git` (rama `main`).
- **Build:** `@angular/build:application`, sin SASS externo pesado; estilos inline por componente.
- Presupuesto de estilos de componente ampliado a 16 kB en `angular.json`.

---

## 2. El Carrusel "Gusanito" (SolucionesCarouselComponent)

Archivo: `src/app/features/landing/components/solutions-carousel/solutions-carousel.component.ts`

### Cómo funciona
1. **Renderización de cards:** las tarjetas provienen de `SERVICES_CATALOG_DATA` (`src/app/core/data/landing.data.ts`), filtradas por pestaña activa (`empresas` / `personas`) que llega como input desde el Hero.
2. **Motor de arrastre:** la directiva `EmblaCarouselDirective` (aplicada con `[emblaCarousel]`) con opciones `{ loop: true, align: 'start', dragFree: false }`, ancho fijo por tarjeta (290–320 px) y efecto peek.
3. **Autoplay (implementación propia):**
   - Se usa un `setInterval` de **3200 ms** que llama a `scrollNext()` de la API de Embla.
   - Con `loop: true`, el carrusel vuelve al inicio al llegar a la última tarjeta: rotación infinita.
   - **Pausa automática** al pasar el mouse sobre el carrusel (`mouseenter` → `stopAutoplay`) y **reanudación** al salir (`mouseleave` → `startAutoplay`).
   - El temporizador se detiene al destruir el componente (`DestroyRef`).
   - Llamadas defensivas (`try/catch`) para que una inicialización tardía de Embla nunca rompa la rotación.
4. **Sincronización UI:**
   - Flechas `<` `>` laterales y dots inferiores.
   - Los dots se recalculan con `scrollSnapList()` tras el render (`afterNextRender` + `syncFromApi`) y al reinicializar por cambio de pestaña.
   - Suscripción a eventos de Embla vía `[subscribeToEvents]="['init', 'reInit', 'select']"` y output `(emblaChange)` del wrapper Angular.

### Sobre el primer intento con plugin oficial
Se instaló `embla-carousel-autoplay@8.6` y se pasó como `[plugins]` a la directiva, pero no giraba de forma fiable en este setup (el wrapper de Angular copia las opciones/plugins en su ciclo de inicialización). Se reemplazó por el control propio descrito arriba, que es determinista y sin dependencias extra. Las 3 tarjetas "**(Prueba)**" del catálogo de Empresas (Transporte de Cargas, Flota Vehicular, Ciberriesgo) se agregaron para verificar el loop con más contenido — se pueden eliminar de `landing.data.ts` cuando se confirme el comportamiento.
