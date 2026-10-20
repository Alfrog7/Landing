# Bitácora de issues — Landing "Mel · Corredora de Seguros"

> **LEE ESTO PRIMERO (nuevo chat):** el proyecto está en **Astro 7 + Preact** (migrado de Angular 21).
> El feedback oficial de Melanie vive en `.opencode/skills/landing-design/Mejoras para la página web — Melanie Calderón, Asesora de Seguros.md`.
> Las issues #4–#19 del repo (`Alfrog7/Landing`) ejecutan ese feedback.
> Antes de actuar, verificar estado real con `gh`: `gh issue list`, `gh pr list` (estados cambian entre sesiones).
>
> **Flujo de trabajo:** 1 issue → 1 rama `feat/issue-N-*` → PR a `develop` con `Closes #N` + etiqueta del milestone → tras el **merge, cerrar la issue MANUALMENTE** (GitHub no auto-cierra porque la rama default es `main`, no `develop`).
>
> **Comandos:** `npm run dev` (puerto **4321**), `npm run build`, `npm run check` (type-check de Astro). Node ≥22.22 (instalado v24.20 vía winget).
>
> **Lecciones técnicas acumuladas:**
> - ⚠️ La herramienta de escritura puede corromper UTF-8 con acentos (mojibake). El editor normal (`edit`) SÍ preserva UTF-8. Para contenido nuevo con acentos: script Node con escapes `\uXXXX` → `fs.writeFileSync(path, content, 'utf8')` y verificar con `s.includes('Calderón')`.
> - `gh issue/pr create --body` multilínea falla en PowerShell 5.1 → usar `--body-file` con markdown en `%TEMP%\opencode\`.
> - Los diccionarios y `landing.data.ts` usan **CRLF**: en Node comparar con `.trim()`, usar `.split('\n')` + `join('\n')` y `replace()` con `\r?\n`.
> - ⚠️ Al insertar bloques con `indexOf`: recalcular índices DESPUÉS de cada replace que cambie la longitud del contenido (bug documentado en issue #11).
> - Los builders de `whatsapp.service.ts` usan `let message` (no `const`) porque anexan `SIGNATURE` (firma legal persona natural).
>
> **Estado en vivo al cerrar el chat anterior:** issue #15 cerrada (PR #31 mergeado; incluye ajustes de revisión: botones separados + bienvenida Mepo con paleta de especificación e imagen más grande/separada del navbar). Activa `feat/issue-16-boton-emergencia` con **PR #32 abierto** (esperando revisión). Siguiente issue: **#17** (contenido de presentación: logo MEL, "¿Qué es un corredor?", "Tu bróker" — M4).

---

## Issue #4 — [SBS] Datos maestros (COMPLETADA — PR #20, mergeado)

**Rama:** `feat/issue-4-datos-maestros` · **PR:** https://github.com/Alfrog7/Landing/pull/20 · **Commits:** `10850a1`, `3d4041c`

### Qué se hizo

1. **`src/core/config/brand.config.ts`** (reescrito):
   - `ownerName`: `Melanie O. Calderón Vega` (antes "Melanie Silva Alarcón").
   - `licenseId`: `Registro SBS N-4050` (antes "Matrícula J-0941").
   - `roleTitle`: `Corredora de seguros persona natural – seguros generales y de vida`.
   - `brandName: 'Mel'`, `brandTitle: 'Mel – Corredora de Seguros'`, `firstName: 'Melanie'` (mensajes conversacionales).
   - NUEVO `legalLine`: "Melanie O. Calderón Vega · Corredora de Seguros persona natural · Registro SBS N-4050" (línea legal persistente, fuente única).
   - NUEVO `experience`: "Más de 15 años de experiencia · Registrada en la SBS desde el 7 de julio de 2011".
   - `contact.email`: `vivefelizviveseguro@gmail.com` · `contact.phone`: "Por confirmar (escribir por WhatsApp)" con comentario `TODO-CONTACTO` (número real pendiente → issue #19; `whatsappNumber` 51987654321 se conserva SOLO como número funcional de los enlaces wa.me).
   - `assets.advisorPhotoReal` → `/assets/images/mepo/ICON.png` (foto real entregada; fallback a `profile.svg` intacto).
2. **`src/layouts/BaseLayout.astro`**: `<title>` por defecto = `brandTitle | legalLine` y meta description en 1ª persona con Registro N-4050. Import de `BRAND_CONFIG` (fuente única).
3. **`src/components/landing/Hero.tsx`**: sello del certificado de ejemplo `J-0941` → `N-4050`.
4. **`src/components/landing/WhyMelanie.tsx`**: badge de la foto usa `brand.legalLine` completo.
5. **`src/core/services/whatsapp.service.ts`**: mensajes usan `BRAND_CONFIG.firstName`; los builders anexan firma `— Melanie O. Calderón Vega, corredora de seguros persona natural` (constante `SIGNATURE`).
6. **i18n `{es,en,fr,it}.ts`**: `hero.badge` → línea legal; `why.role` → "corredora de seguros persona natural"; `why.track` → experiencia + fecha SBS; `why.title` sin "Silva"; `navbar.subtitle` → "Corredora de Seguros"; `footer.contactTitle` sin plural ("Hablemos"); `footer.emailLabel` → "Correo de corredora de seguros persona natural:"; `footer.credentialLine` → "…persona natural · Registro SBS N-4050."; `footer.insurersTitle` → "Aseguradoras con las que trabajo".
7. **Datos sueltos**: `landing.data.ts` FAQ sin "colegiada"; `faqs.data.ts` sin "colegiada"/lista de aseguradoras/"no la empresa"; `GoogleCalendarBooking.tsx` sin "Silva"; `CotizadorWizard.tsx` placeholder neutro; `global.scss` cabecera.

### Verificación

- `npm run check`: 0 errores · `npm run build`: 5 páginas OK.
- Auditoría `src/`: 0 apariciones de "Silva", "J-0941", "melaniesilva", "Colegiada", "987 654", "contacto@" (única excepción: `whatsappNumber` funcional con `TODO-CONTACTO`).

---

## Issue #5 — [SBS] Eliminar promesas exactas (COMPLETADA — PR #21, mergeado)

### Qué se hizo

1. **i18n (4 idiomas)** — 15 líneas por idioma:
   - `cartas-fianza.badge`: "Emisión 48h" → **"Emisión ágil"**; `emision` → "Gestión ágil tras aprobación de línea afianzadora".
   - `seguro-credito.badge`: "Recupero 90%" → **"Atención prioritaria"**; `emision` → "con atención prioritaria".
   - `sctr-vida-ley.badge`: "Pase < 2h" → **"Constancia ágil"**; `emision` → "Emisión ágil con código digital".
   - `polizas-ingenieria.emision`: "48 a 72 horas" → "con atención prioritaria".
   - `vida-devolucion.badge`: "Retorno 100%+" → **"Ahorro con respaldo"**; `emision` → "con seguimiento directo".
   - `vehicular.emision`: "24 a 48 horas" → "Cotización y emisión ágiles".
   - `hogar.emision`: "en 24 horas" → "Emisión sin inspección para sumas estándar".
   - `asistencia-viaje.emision`: "menos de 1 hora" → "con atención prioritaria".
   - `salud-eps.emision`: "24 a 48 horas" → "Activación ágil".
   - `why.block2Text` y `faq.a2` suavizados (sin "menos de 2/48 horas").
   - Conservados (no son promesas): porcentajes legales de coberturas (10%, 90% indemnity), "100% gratuito", "100% directo", "Auxilio 24/7", "asistencia 24 horas" (features).
2. **`landing.data.ts`**: `badgeTime` y `specs.tiempoEmision` espejan los nuevos textos; FAQ a2 estática corregida.
3. **SVGs de servicios**: `seguro-credito.svg` "S/ 9,900"→"Cuentas B2B" y "90 %"→"Morosidad" · `sctr-mineria.svg` "< 2 h"→"Express" · `fianzas-obras.svg` "48 h"→"Express" · `seguro-hogar.svg` "100 %"→"Familiar" · `vida-ahorro.svg` "+ 100 %"→"Ahorro".

### Técnica

- Reemplazos por número de línea vía Node con escapes `\uXXXX` (1 línea → 1 línea, sin desplazamiento). Los números de línea valen para el estado del archivo de esa rama; recalcular si se edita antes.

---

## Issue #6 — [SBS] Primera persona singular (COMPLETADA — PR #22, mergeado)

### Qué se hizo

Barrida de lenguaje societario/plural (47 reemplazos):

1. **`how.s1Text/s2Text/s3Text`** (4 idiomas): "Mapeamos/Pedimos/Revisamos/coordinamos" → "Mapeo/Pido/Reviso/coordin" (fr: "Je cartographie/demande/vérifie").
2. **`faq.a1`**: "cotizamos" → "cotizo" ("we quote"/"je chiffre"/"preparo preventivi").
3. **`faq.a3`**: "trasladamos/we move/nous transférons" → singular.
4. **`services.*.tip`** (9 fichas × 4 idiomas): verbos en 1ª persona + sin nombres de aseguradoras en tips (fianza, vehicular, salud) + "la tasa de prima más baja" → "una tasa conveniente" (anti-superlativo).
5. **`matrix.consult`**: "Ask us" → "Ask me"; "Nous consulter" → "Me consulter".
6. **`landing.data.ts`** y **`faqs.data.ts`**: espejados ("Trabajamos emisiones express… el mismo día" → "Trabajo emisiones con gestión ágil…").

### Verificación

- Regex de barrida (nosotros/nuestro/somos/verbos -amos/we/our/nous/notre/noi/siamo) sobre `src/`: 0 coincidencias en contenido.
- "S.A.C." solo como **empresa cliente ficticia** (certificado de ejemplo del Hero y placeholder del cotizador) — uso legítimo.

---

## Issue #7 — Franja de logos reemplaza la Matriz (COMPLETADA — PR #23, mergeado)

### Qué se hizo

1. **Nuevo** `src/components/landing/InsurerLogoStrip.tsx`: título i18n "Trabajo con las principales aseguradoras del Perú" + **13 aseguradoras** (Mapfre, Pacífico, Rimac, La Positiva, Chubb, Crecer, Protecta Security, Secrex Cesce, InSur, Avla, AuguStar, Sanitas, Quálitas). Conserva `id="aseguradoras"` (navbar + redirect `/coberturas-sctr` siguen funcionando).
2. **Nuevo** `app-insurer-logo-strip.scss`: logos 40px, `grayscale(100%) + opacity .55` → color al hover/`focus-within`, flex-wrap.
3. **7 wordmarks provisionales** en `public/assets/images/insurers/` (`crecer`, `protecta`, `secrex`, `insur`, `augustar`, `sanitas`, `qualitas` .svg) marcados "provisional" → reemplazar por archivos oficiales (**issue #19**).
4. **Eliminado**: `InsurersCoverageTable.tsx`, su SCSS, `INSURERS_MATRIX_DATA` y los tipos `CoverageAvailability`/`InsurerCoverageRow` del modelo.
5. **i18n**: bloque `matrix.*` completo retirado; añadido `strip.title`.
6. Incluye asset `solunion.jpeg` (se usará en la ficha de crédito, issue #12 o futuras).

---

## Issue #8 — Tarjetas simplificadas (COMPLETADA — PR #24, mergeado)

### Qué se hizo

1. **Títulos simples** (i18n ×4 idiomas): "Cartas fianza" · "Seguro de crédito" · "SCTR y Vida Ley" · "Obras y construcción" · "Vehicular y SOAT" · "Hogar" · "Viajes" · "Vida" · "Salud" (antes: Cartas Fianza Express, Planilla Obligatoria (SCTR & Vida Ley), Pólizas de Ingeniería & RC, Vehicular (Soat + Todo Riesgo), Hogar & Multirriesgo, Asistencia en Viaje, Vida con Devolución, Salud Integral & EPS).
2. **Sin aseguradoras**: eliminada la línea `card__insurers` de la tarjeta (`SolutionsCarousel.tsx`), el bloque "Aseguradoras Aliadas" del modal, la clave `modal.aliadas` (4 idiomas), el campo `insurers` de las 9 entradas y del modelo `ServiceDetail`. SCSS muerto limpiado (`card__insurers`, `detail__insurers`, `detail__pill`).
3. **Pestaña Personas** verificada por datos: 5 tarjetas (Vida, Salud, Vehicular y SOAT, Hogar, Viajes).
4. "Vida con Devolución" se conserva como tema del agendador y prosa del a3 (no son títulos de tarjeta).

---

## Issue #9 — Mepo: bienvenida y saludo "¡Kuyaymi!" (COMPLETADA — PR #25, mergeado)

### Qué se hizo

1. **Renombrado global Meipo → Mepo** (20 archivos): `Meipo.tsx` → `Mepo.tsx`, `app-meipo.scss` → `app-mepo.scss`, evento `meipo-wave` → `mepo-wave`, clases `meipo-*`/`hero__meipo` → `mepo-*`/`hero__mepo`, clave i18n `meipoTip` → `mepoTip`, campo `meipoTip` → `mepoTip` en modelo/data, aria-labels.
2. **i18n**: bloque nuevo `mepo { salute, sign1..sign3 }` en 4 idiomas con el saludo literal aprobado ("¡Kuyaymi!, que en quechua significa 'es cariño'…").
3. **Nuevo** `MepoWelcome.tsx` + `app-mepo-welcome.scss`: bloque superior de la Home (antes del Hero) con `mepo-bienvenida.jpeg` y **3 letreros como botones reales** (aria-label, focus-visible): "Bienvenido" → inicio · "Sigue el camino" → `/#soluciones` · "¿En qué te puedo servir?" → WhatsApp prellenado. Responsive <900px apilado.
4. **Estilo de los letreros corregido por feedback del usuario**: verde-bosque institucional (`--color-primary` #0B7A57 + borde `--color-primary-dark` + hover) — NO el marrón madera original (no cuadraba con la identidad "papel frío + tinta verde-bosque").
5. **⚠️ Los suricatos siguen en la imagen entregada** (prohibidos por derechos de Compare the Market): mitigado con recorte CSS. **Actualizado en issue #15** (commit `7da1044`): ventana `object-fit: cover` (banda 5:4, `object-position: 87%`) que además elimina el espacio vacío; botones con la paleta de la especificación de Melanie (`docs/especificacion-koala-botones-melanie.md`) — verde esmeralda #007a4d, terracota #c45c18, azul cerúleo #0284c7. Asset corregido pendiente en **issue #19**. Nota: el letrero 3 de la imagen dice "En que te puedo servir?" sin apertura — los botones usan i18n correcto.

---

## Issue #10 — Ambiente de color por seguro + Mepo condicional (COMPLETADA — PR #26, mergeado)

### Qué se hizo

1. **Nuevo** `src/styles/components/_service-themes.scss` (registrado primero en `_index.scss`): variables `--svc-accent / --svc-accent-dark / --svc-accent-contrast / --svc-secondary / --svc-secondary-contrast / --svc-tint` con fallback a la identidad; **10 paletas** vía `[data-svc='<service.id>']`:
   - Cartas fianza: marino #1B2A5E + dorado #F5B50A · Crédito: azul acero #28619B + gris · Obras: grafito #333B41 + amarillo obra · SCTR: azul #175E9D + naranja #F26B21 · Salud(&EPS): salvia #64755B + crema · Hogar: terracota #A85430 + beige · Vida: lavanda #6C5AA7 + dorado suave · Vehicular: rojo vino #7A2E2E · Viajes: turquesa #0B7280 + arena. (Si #12+ separa EPS de Salud: reservar verde menta #237F56 para EPS.)
   - Contraste AA: acentos con blanco ≥4.5:1 (verificado por luminancia).
2. **Ficha** (`ServiceDetailModal.tsx` + SCSS): `data-svc` en `.detail` — tag accent, badge de tiempo secondary, regulatory/checkmarks accent, emission tint, CTA accent + hover dark.
3. **Tarjeta** (`SolutionsCarousel.tsx` + SCSS): `data-svc` en `.card` — badge tint/borde accent, CTA underline accent al hover (ya no naranja fijo).
4. **Mepo condicional**: campo `mepo: boolean` en modelo + 9 servicios; el tip de Mepo solo en Vida/Salud/Hogar/Vehicular/Viajes (true); NO en Cartas fianza/Crédito/Obras/SCTR (false).
5. Estructura/orden/logo intactos: solo cambia el ambiente.

---

## Issue #11 — Nueva estructura de ficha (COMPLETADA — PR #27, mergeado)

**Rama:** `feat/issue-11-ficha-nueva` · **PR:** https://github.com/Alfrog7/Landing/pull/27 · **Commits:** `75697eb`, `f103cfe`, `4b488be`

**Corrección tras revisión de Melanie (2026-10-19, commit `f103cfe`):** el modal mostraba el texto crudo `modal.about` / `modal.protection` porque esas claves nunca se agregaron a los diccionarios. Añadidas en 4 idiomas según el feedback (§4: "Qué es", "Qué te protege"); `form.title` ("Para cotizarte necesito") y el botón "Cotizar por WhatsApp" ya eran correctos. El video queda con portada "Muy pronto" hasta que Melanie envíe el enlace (issue #19).

### Qué se hizo

1. **Modelo**: nuevo `QuoteFormField { key, type?: 'text'|'select' }` (etiqueta i18n `fields.<key>`, opciones `fields.<key>Options`).
2. **Datos**: nuevo `QUOTE_FORM_FIELDS: Record<serviceId, QuoteFormField[]>` con los campos exactos de la tabla del feedback (fianza: RUC/tipo/monto/plazo/entidad; crédito: RUC/ventas/clientes/canal; obras: RUC/tipo/monto/plazo; SCTR: RUC/actividad/trabajadores/planilla; salud: edades/distrito; vida: edad/ocupación/monto; vehicular: marca/modelo/año/valor; hogar: condición/distrito/valor casa/valor contenido; viajes: destino/fechas/edades).
3. **`ServiceDetailModal.tsx`** reescrito — orden literal del feedback: 1) **video 16:9** con portada + "Muy pronto: Melanie te lo explica en 1 minuto"; 2) **Qué es** (2 líneas, `summary`); 3) **Qué te protege** (3 puntos, `coberturas.slice(0,3)`); 4) **formulario corto** (nombre/correo/celular + campos del seguro + checkbox de consentimiento); 5) **CTA "Cotizar por WhatsApp"** prellenado. Retirados: bloque de requisitos y caja de "tiempo de emisión".
4. **`whatsapp.service.ts`**: nuevo `buildFichaQuoteUrl(serviceTitle, fields[])` — "Hola Melanie, quiero cotizar *X*." + bullets + firma persona natural.
5. **i18n (4 idiomas)**: `video.placeholder`, `modal.about`, `modal.protection`, `form.{title,name,email,phone,consent,submit}`, `fields.*` (29 etiquetas + 3 selects: 5 tipos de fianza, local/exportación, propietario/inquilino).
6. **SCSS**: `.detail__video` (16:9 + overlay `color-mix` del accent), `.detail__form-grid` (2 col → 1 col <860px), `.detail__consent`.
7. Mantiene: foco trampado/Escape, tema por seguro, Mepo condicional.

### Verificación

- `npm run check`: 0 errores · `npm run build`: 5 páginas OK.
- Script: 9 servicios en QUOTE_FORM_FIELDS, builder presente, video/about/protege/consent/CTA en el modal, requisitos fuera de la ficha, diccionarios sin mojibake.

---

## Issue #12 — Carrusel de tipos en fichas formales (COMPLETADA — PR #28, mergeado)

**Rama:** `feat/issue-12-carrusel-tipos` · **PR:** https://github.com/Alfrog7/Landing/pull/28 · **Commits:** `0b1986b`, `afb499b`

### Qué se hizo

1. **Nuevo componente** `ServiceTypeCarousel.tsx`: carrusel embla con lámina por tipo (icono lucide + nombre + frase corta + botón de cotización), flechas prev/next, puntos navegables con `aria-label`. Fondo azul marino #1B2A5E con detalles dorados #F5B50A (feedback §4 literal).
2. **Autoplay** 4,5 s: se detiene en hover/foco (`mouseenter`/`focusin`) y NO arranca con `prefers-reduced-motion`. Al elegir un tipo, scroll suave al formulario (instantáneo con reduced-motion).
3. **Preselección**: `TYPE_CAROUSEL_FIELDS` en `landing.data.ts` (`cartas-fianza`→`tipoFianza`, `seguro-credito`→`canal`, `polizas-ingenieria`→`tipoObra`); el botón fija el campo y baja al form. Solo estas 3 fichas formales tienen carrusel.
4. **i18n (4 idiomas)**: bloque `typeCarousels` (`title`, `prev`, `next`, `cta`, pares `names`/`phrases`). Los `names` coinciden 1:1 con las opciones del select (`tipoFianzaOptions`, `canalOptions`) en los 4 idiomas — verificado por script.
5. **Tipos**: fianzas = los 5 literales del feedback; crédito (Local/Exportación) y obras (Obra civil/Montaje e instalaciones/Equipos y maquinaria/Responsabilidad Civil) son **provisionales** — el feedback no los define, confirmar con Melanie (nota dejada en el PR).
6. Integrado en `ServiceDetailModal.tsx` entre el video y "Qué es".

### Verificación

- `npm run check`: 0 errores · `npm run build`: 5 páginas OK.
- Script: `names` ≡ opciones del select en 4 idiomas; sin mojibake.

---

## Issue #13 — Narrativa de marca: 7 pasos + 3 casos de Vida (COMPLETADA — PR #29, mergeado)

**Rama:** `feat/issue-13-narrativa-marca` · **PR:** https://github.com/Alfrog7/Landing/pull/29 · **Commits:** `ff71b30`, `7caf964`

### Qué se hizo

1. **Nuevo componente** `ServiceNarrative.tsx` con 2 variantes:
   - `pasos` — "Carta fianza en 7 pasos" en la ficha de fianzas (entre "Qué te protege" y el formulario): stepper vertical numerado con los 7 pasos **literales del feedback** (Ganas un contrato → Me indicas los datos → Gestiono la emisión → Se emite → La entregas → Sigo la vigencia → Cumples y se libera) + cierre literal destacado ("Es la garantía que respalda que vas a cumplir, y yo la gestiono de principio a fin").
   - `casos` — "Tres formas de proteger lo que más quieres" en la ficha de Vida (tras el formulario): 3 tarjetas (Cuidar a los padres, Fondo universitario, Vida con devolución) con icono lucide y frase breve.
2. **Datos**: `SERVICE_NARRATIVES` en `landing.data.ts` — solo `cartas-fianza` → `pasos`, `vida-devolucion` → `casos`.
3. **i18n (4 idiomas)**: bloque `narratives` (`pasosTitle`, 7 `pasos`, `pasosClose`, `casosTitle`, 3 pares `casosNames`/`casosPhrases`).
4. **Estilos** en `app-service-detail-modal.scss`: stepper y tarjetas con variables del tema por seguro (marino/dorado fianzas, lavanda Vida); tarjetas 3 col → 1 col <860px. `app-stepper.scss` existente no reutilizable (scopeado a `app-stepper` del cotizador).

### Verificación

- `npm run check`: 0 errores · `npm run build`: 5 páginas OK.
- Script: `narratives` en 4 idiomas, 7 pasos + cierre + 3 casos, literales del feedback intactos, sin mojibake.

---

## Issue #14 — Dos perfiles, una sola profesional (COMPLETADA — PR #30, mergeado)

**Rama:** `feat/issue-14-dos-perfiles` · **PR:** https://github.com/Alfrog7/Landing/pull/30 · **Commits:** `3320674`, `ac093f8`

### Qué se hizo

1. **Rework `WhyMelanie.tsx`**: la sección `sobre-melanie` ahora es "Dos perfiles, una sola profesional" (feedback §5). Ancla `/#sobre-melanie` intacta (navbar + redirect `/asesoria`).
2. **Foto real**: `ICON.png` (entregada por Melanie, ya apuntada por `advisorPhotoReal` desde issue #4) con fallback al placeholder, `loading="lazy"`, `decoding="async"` y `width/height` definidos.
3. **Texto literal aprobado** como intro: "Soy abogada y bróker de seguros. No solo te consigo la mejor cobertura al mejor precio: también te cuido legalmente y te acompaño en todo el proceso, incluido el siniestro."
4. **Dos tarjetas lado a lado**: "Abogada" (Scale) y "Corredora de seguros" (ShieldCheck), con frase breve en 1ª persona cada una. Etiqueta legal completa visible (badge bajo la foto).
5. Los 3 bloques de beneficios se conservan debajo; `block3Title` "Respaldo colegiado regulado…" → "Respaldo regulado ante la SBS" (sin figura colegiada).
6. **i18n (4 idiomas)**: `why.{title,profilesIntro,profile1*,profile2*}` nuevos. **SCSS**: intro + tarjetas; grid principal colapsa <1024px (spec), tarjetas <560px.

### Verificación

- `npm run check`: 0 errores · `npm run build`: 5 páginas OK.
- Script: claves en 4 idiomas, literal exacto en español, cero "colegiad*", sin mojibake.

---

## Issue #15 — Área de Riesgos Virtual (COMPLETADA — PR #31, mergeado)

**Rama:** `feat/issue-15-area-riesgos` · **PR:** https://github.com/Alfrog7/Landing/pull/31 · **Commits:** `9e909da`, `7da1044`, `7f029e0`, `c9c1731`, `ef55777`

### Qué se hizo

1. **Nuevo** `RiskManagementBlock.tsx` + `app-risk-management-block.scss` (registrado en `_index.scss`): bloque "Área de Riesgos Virtual" en la parte Empresas de la Home, tras el carrusel, **visible solo con la pestaña Empresas activa**. Estilo corporativo sobrio (sin Mepo).
2. **Texto literal del feedback** en el bloque, con precios aprobados S/ 270 y S/ 370 (no aplican la regla anti-cifras: son precios de servicio).
3. Botón [Quiero saber más] expande (`aria-expanded`/`aria-controls`) las tarjetas: **Esencial** (revisión de pólizas, calendario de renovaciones, constancias SCTR, acompañamiento en siniestros) y **Integral** ("Todo lo anterior, más:" reporte mensual, una visita al año, orientación legal-laboral básica). Items con `TODO-PLANES` (confirmación de Melanie, issue #19).
4. CTA WhatsApp con mensaje prellenado "Hola Melanie, quiero saber más sobre el Área de Riesgos Virtual." vía `buildGenericUrl` (+ firma).
5. Estructura **reservada** (comentario, no publicado) para "Seguridad y cámaras" con empresas aliadas.
6. **i18n (4 idiomas)**: bloque `risk.*` completo. Integrado en `LandingPage.tsx`. Responsive: planes 2→1 col <860px.
7. **Ajustes tras revisión** (commit `7da1044`): "Quiero saber más" y "Consultar por WhatsApp" quedaban pegados (ambos inline) → ahora bloque con 1.75rem de separación. Bienvenida de Mepo con la paleta/micro-interacciones de la especificación entregada y ventana de imagen sin espacio vacío (ver issue #9). La especificación se movió de `public/` a `docs/` (no debe servirse públicamente).

### Verificación

- `npm run check`: 0 errores · `npm run build`: 5 páginas OK.
- Script: `risk.*` en 4 idiomas, literales exactos en español, builder presente, sin mojibake.

---

## Issue #16 — Botón ¿Emergencia? en navbar (COMPLETADA — **PR #32 ABIERTO, pendiente de merge**)

**Rama:** `feat/issue-16-boton-emergencia` · **PR:** https://github.com/Alfrog7/Landing/pull/32 · **Commit:** `1354377`

### Qué se hizo

1. **Nuevo** `src/core/config/emergency.config.ts`: único punto de mantenimiento de los 13 teléfonos de siniestros (Mapfre…Quálitas) — vacíos con `TODO-EMERGENCIAS` hasta la entrega de Melanie (issue #19).
2. **Nuevo** `EmergencyButton.tsx` + `app-emergency-button.scss` (registrado): popover accesible en la navbar — Escape/clic-fuera cierran, foco trampado (Tab/Shift+Tab) entre disparador y panel, foco vuelve al botón, `aria-expanded`/`aria-haspopup`/`role="dialog"`.
3. Panel: CTA verde "WhatsApp de Melanie (canal directo)" (mensaje prellenado de emergencia + firma), lista de aseguradoras con `tel:` clicable ("Por confirmar" mientras no haya datos) y nota traducida.
4. **Integrado en `Navbar.tsx`**: desktop en `.navbar__actions` y variante `mobile` a ancho completo dentro del drawer (panel estático).
5. **i18n (4 idiomas)**: bloque `emergency.*`. Estilo sobrio (sin Mepo, sin rojo llamativo).
6. **Corrección responsive** (commit `9aaf34c`): ocultado el botón de emergencia del desktop en ≤1024px (quedaba duplicado con el del drawer) y los 3 controles de acciones (emergencia, idioma, agendar) igualados a `min-width: 7.25rem` con contenido centrado — el largo varía, el ancho no.

### Verificación

- `npm run check`: 0 errores · `npm run build`: 5 páginas OK.
- Script: `emergency.*` en 4 idiomas, 13 contactos, literal "¿Emergencia?" en español, sin mojibake.

---

## Tabla de estado general (canónica — actualizar SIEMPRE esta tabla)

| Issue | Título corto | Milestone | Estado | PR |
|---|---|---|---|---|
| #4 | Datos maestros SBS (nombre, N-4050, correo, foto) | M1 | ✅ Mergeada | #20 |
| #5 | Eliminar promesas exactas (25%, 90%, 48h, <2h) | M1 | ✅ Mergeada | #21 |
| #6 | Primera persona singular | M1 | ✅ Mergeada | #22 |
| #7 | Franja de logos reemplaza matriz | M2 | ✅ Mergeada | #23 |
| #8 | Tarjetas simplificadas (nombres cortos, sin aseguradoras) | M2 | ✅ Mergeada | #24 |
| #9 | Mepo bienvenida + Kuyaymi + renombrado | M2 | ✅ Mergeada | #25 |
| #10 | Ambiente de color por seguro + Mepo condicional | M3 | ✅ Mergeada | #26 |
| #11 | Nueva ficha (video, form por seguro, WhatsApp) | M3 | ✅ Mergeada | #27 |
| #12 | Carrusel de tipos en fichas formales (fianza×5, crédito, obras) | M3 | ✅ Mergeada | #28 |
| #13 | Carta fianza en 7 pasos + 3 casos de Vida | M3 | ✅ Mergeada | #29 |
| #14 | "Dos perfiles, una sola profesional" (ICON.png) | M4 | ✅ Mergeada | #30 |
| #15 | "Área de Riesgos Virtual" (2 planes) | M4 | ✅ Mergeada | #31 |
| #16 | Botón "¿Emergencia?" en navbar | M4 | 🔶 PR abierto | #32 |
| #17 | Contenido presentación (logo MEL, corredor, tu bróker) | M4 | ⬜ Pendiente | — |
| #18 | Footer legal SBS (SBS, Libro Reclamaciones, Defensoría, LinkedIn) | M4 | ⬜ Pendiente | — |
| #19 | [Pendientes externos] entregables de Melanie | — | ⬜ Abierta (checklist) | — |

### Pendientes externos resumidos (detalle en issue #19)

Teléfono/WhatsApp real · 7 logos oficiales (Crecer, Protecta, Secrex Cesce, InSur, AuguStar, Sanitas, Quálitas) · imagen de bienvenida sin suricatos · detalles planes Esencial/Integral · lista teléfonos de siniestros · archivo logo MEL · URL LinkedIn · videos por seguro · imagen "tu bróker" · permisos fotos Vida Ley.
