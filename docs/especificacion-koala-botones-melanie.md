# Guía de Implementación Frontend: Reubicación de Imagen y Estilos de Botones

Esta guía técnica contiene el código, las dimensiones exactas y los estilos CSS/Tailwind necesarios para implementar la sección del koala Meipo con su letrero de madera y los 3 botones interactivos armonizados en tu landing page.

---

## 1. Especificaciones de la Imagen del Koala

- **Archivo / Formato:** JPEG (`.jpeg` / `.jpg`)
- **Resolución nativa recomendada:** `1408 x 768 px`
- **Relación de aspecto:** Aprox. `16:9` (~1.83:1)
- **Posicionamiento:** Columna izquierda, ancho completo dentro de su contenedor (`w-full`), esquinas redondeadas (`border-radius: 24px` o `rounded-3xl`), sombra sutil (`shadow-xl`) y recorte suave (`overflow-hidden object-cover`).

---

## 2. Paleta de Colores de los Botones (Armonizada con los Letreros)

Los letreros de madera tienen 3 tonos clave que los botones replican fielmente para evitar desentonar:

| Botón | Letrero / Icono | Color Hex (Fondo) | Hover State | Color Texto / Icono |
| :--- | :--- | :--- | :--- | :--- |
| **1. Bienvenido** | Palma verde | `#007a4d` (Verde esmeralda cálido) | `#00633e` | `#ffffff` |
| **2. Sigue el camino** | Flecha curva naranja | `#c45c18` (Terracota / Naranja madera) | `#ab4d10` | `#ffffff` |
| **3. ¿En qué te puedo servir?** | Manos / Interrogación azul | `#0284c7` (Azul cerúleo amigable) | `#0369a1` | `#ffffff` |

---

## 3. Comportamiento Interactivo (Micro-interacciones de Botón)

Para lograr el efecto de apertura, pulsación táctil y respuesta fluida:
1. **Estado Normal:** Fondo plano de color cálido, bordes suaves (`rounded-2xl` / `16px`), padding cómodo (`p-4` / `p-5`).
2. **Hover (Cursor encima):**
   - El botón se expande sutilmente: `transform: scale(1.02) translateY(-2px);`
   - La flecha indicadora derecha (`>`) se desliza: `transform: translateX(6px);`
   - Resplandor y sombra difusa suave: `box-shadow: 0 12px 24px -6px rgba(0,0,0,0.18);`
3. **Active (Al presionar / Clic):**
   - El botón se "hunde": `transform: scale(0.98) translateY(1px);`
   - Da la sensación inmediata de clic físico antes de navegar o abrir la sección.

---

## 4. Estructura HTML y Clases (Tailwind CSS)


```html
<!-- SECCIÓN PRINCIPAL: KOALA + PANEL DE NAVEGACIÓN INTERACTIVA -->
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
    
    <!-- COLUMNA IZQUIERDA: IMAGEN DEL KOALA (1408 x 768 px) -->
    <div class="lg:col-span-7">
      <div class="relative overflow-hidden rounded-3xl shadow-xl bg-slate-100 border border-slate-100">
        <img 
          src="/assets/img/koala-meipo-camino.jpeg" 
          alt="Meipo el koala asesor indicando los caminos de seguros"
          width="1408"
          height="768"
          class="w-full h-auto object-cover block transition-transform duration-500 hover:scale-[1.01]"
          loading="eager"
        />
      </div>
    </div>

    <!-- COLUMNA DERECHA: SALUDO + BOTONERA INTERACTIVA -->
    <div class="lg:col-span-5 flex flex-col gap-4">
      
      <!-- Mensaje de bienvenida de Meipo -->
      <div class="bg-white rounded-2xl p-5 border-l-4 border-[#007a4d] shadow-sm mb-2">
        <p class="text-slate-800 text-base leading-relaxed">
          <span class="font-bold text-slate-900">Hola, soy Mepo 🐨 ¡Kuyaymi!</span>, 
          que en quechua significa <em>"es cariño"</em>. Y así te voy a cuidar: con un abrazo y mucho cariño.
        </p>
      </div>

      <!-- BOTÓN 1: BIENVENIDO (Verde Esmeralda) -->
      <a 
        href="#bienvenido" 
        class="interactive-btn group flex items-center justify-between p-4 sm:p-5 rounded-2xl text-white font-medium text-lg shadow-md transition-all duration-200"
        style="background-color: #007a4d;"
      >
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <!-- Icono Casita / Palma -->
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span class="tracking-wide">Bienvenido</span>
        </div>
        <div class="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1.5">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </a>

      <!-- BOTÓN 2: SIGUE EL CAMINO (Naranja Terracota Madera) -->
      <a 
        href="#sigue-el-camino" 
        class="interactive-btn group flex items-center justify-between p-4 sm:p-5 rounded-2xl text-white font-medium text-lg shadow-md transition-all duration-200"
        style="background-color: #c45c18;"
      >
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <!-- Icono Camino / Flecha -->
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          <span class="tracking-wide">Sigue el camino</span>
        </div>
        <div class="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1.5">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </a>

      <!-- BOTÓN 3: ¿EN QUÉ TE PUEDO SERVIR? (Azul Cerúleo) -->
      <a 
        href="#en-que-te-puedo-servir" 
        class="interactive-btn group flex items-center justify-between p-4 sm:p-5 rounded-2xl text-white font-medium text-lg shadow-md transition-all duration-200"
        style="background-color: #0284c7;"
      >
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <!-- Icono Interrogación / Ayuda -->
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="tracking-wide">¿En qué te puedo servir?</span>
        </div>
        <div class="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1.5">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </a>

    </div>
  </div>
</section>
```

---

## 5. Hoja de Estilos CSS Pura (Si no usas Tailwind)

Si tu proyecto utiliza CSS tradicional, agrega estas reglas a tu archivo `.css`:

```css
/* Contenedor del Koala */
.koala-image-wrapper {
  width: 100%;
  max-width: 100%;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.15);
}

.koala-image-wrapper img {
  width: 100%;
  height: auto;
  aspect-ratio: 1408 / 768;
  object-fit: cover;
  display: block;
}

/* Micro-interacciones de los botones */
.interactive-btn {
  cursor: pointer;
  border: none;
  text-decoration: none;
  user-select: none;
  will-change: transform, box-shadow;
  transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.18s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.18s ease;
}

/* Hover: Leve aumento y elevación */
.interactive-btn:hover {
  transform: translateY(-2px) scale(1.02);
  filter: brightness(1.04);
  box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.22);
}

/* Active / Click: Efecto de hundimiento táctil */
.interactive-btn:active {
  transform: translateY(1px) scale(0.98);
  filter: brightness(0.96);
  box-shadow: 0 4px 10px -2px rgba(0, 0, 0, 0.18);
}
```
