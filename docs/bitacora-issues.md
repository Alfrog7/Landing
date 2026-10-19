# Bitácora de issues — Landing "Mel · Corredora de Seguros"

> Contexto para futuras sesiones: el proyecto está migrado de Angular 21 a **Astro 7 + Preact**
> (rama `develop`, commit `c5d3808`). El feedback oficial de Melanie vive en
> `.opencode/skills/landing-design/Mejoras para la página web — Melanie Calderón, Asesora de Seguros.md`.
> Las issues #4–#19 del repo ejecutan ese feedback (flujo: 1 issue → 1 branch `feat/issue-N-*` → PR a `develop`).
> Comandos: `npm run dev` (puerto 4321), `npm run build`, `npm run check`. Node requerido ≥22.22 (instalado v24.20).

---

## Issue #4 — [SBS] Datos maestros (COMPLETADA — PR #20)

**Rama:** `feat/issue-4-datos-maestros` · **PR:** https://github.com/Alfrog7/Landing/pull/20 · **Commit:** `10850a1`

### Qué se hizo

1. **`src/core/config/brand.config.ts`** (reescrito):
   - `ownerName`: `Melanie O. Calderón Vega` (antes "Melanie Silva Alarcón").
   - `licenseId`: `Registro SBS N-4050` (antes "Matrícula J-0941").
   - `roleTitle`: `Corredora de seguros persona natural – seguros generales y de vida`.
   - `brandName: 'Mel'`, `brandTitle: 'Mel – Corredora de Seguros'`, `firstName: 'Melanie'` (para mensajes conversacionales).
   - NUEVO `legalLine`: "Melanie O. Calderón Vega · Corredora de Seguros persona natural · Registro SBS N-4050" (línea legal persistente, fuente única).
   - NUEVO `experience`: "Más de 15 años de experiencia · Registrada en la SBS desde el 7 de julio de 2011".
   - `contact.email`: `vivefelizviveseguro@gmail.com` · `contact.phone`: "Por confirmar (escribir por WhatsApp)" con comentario `TODO-CONTACTO` (número real pendiente → issue #19; `whatsappNumber` 51987654321 se conserva SOLO como número funcional de los enlaces wa.me).
   - `assets.advisorPhotoReal` → `/assets/images/mepo/ICON.png` (foto real entregada; fallback a `profile.svg` intacto).
2. **`src/layouts/BaseLayout.astro`**: `<title>` por defecto = `brandTitle | legalLine` y meta description en 1ª persona con Registro N-4050. Import de `BRAND_CONFIG` (fuente única, cero duplicación).
3. **`src/components/landing/Hero.tsx`**: sello del certificado de ejemplo `J-0941` → `N-4050`.
4. **`src/components/landing/WhyMelanie.tsx`**: badge de la foto ahora usa `brand.legalLine` completo.
5. **`src/core/services/whatsapp.service.ts`**: mensajes usan `BRAND_CONFIG.firstName`; los 4 builders anexan firma `— Melanie O. Calderón Vega, corredora de seguros persona natural` (constante `SIGNATURE`). `const message` → `let message` para permitir la firma.
6. **i18n `src/core/i18n/dictionaries/{es,en,fr,it}.ts`**:
   - `hero.badge` → línea legal completa en los 4 idiomas.
   - `why.role` → "corredora de seguros persona natural" (sin "Colegiada SBS").
   - `why.track` → experiencia + fecha de registro SBS.
   - `why.title` → "¿Por qué asesorarte con Melanie?" (sin "Silva").
   - `navbar.subtitle` → "Corredora de Seguros" (variantes por idioma).
   - `footer.contactTitle` → sin "nos/-nous/-ci" plural ("Hablemos" / "Get in touch!" / "Contactez-moi !" / "Contattami!").
   - `footer.emailLabel` → "Correo de corredora de seguros persona natural:" (rótulo obligatorio).
   - `footer.credentialLine` → "…persona natural · Registro SBS N-4050."
   - `footer.insurersTitle` → "Aseguradoras con las que trabajo" (evita prometer alianza).
7. **Datos sueltos**: `landing.data.ts` FAQ (sin "colegiada"), `faqs.data.ts` FAQ del broker (sin "colegiada", sin lista de aseguradoras, sin "no la empresa"), `GoogleCalendarBooking.tsx` title (sin "Silva"), `CotizadorWizard.tsx` placeholder de teléfono neutral, `global.scss` comentario de cabecera.

### Verificación ejecutada

- `npm run check`: **0 errores / 0 warnings** · `npm run build`: **5 páginas OK**.
- Script de auditoría sobre `src/`: **0 apariciones** de "Silva", "J-0941", "melaniesilva", "Colegiada", "987 654", "contacto@" (única excepción: `whatsappNumber` funcional con `TODO-CONTACTO`).

### Lecciones técnicas (importante para próximos PR)

- ⚠️ La herramienta de escritura de archivos corrompió UTF-8 en `brand.config.ts` (mojibake "Calderón"→"CalderÃ³n"). **Solución usada**: script Node con escapes `\uXXXX` (ASCII puro) en `node -e` o archivo `.js` temporal → `fs.writeFileSync(path, content, 'utf8')`. El editor normal de archivos SÍ preserva UTF-8 (probado en diccionarios). Verificar SIEMPRE con `s.includes('Calderón')` tras escribir textos con acentos.
- El formulario de `gh issue create`/`gh pr create` con `--body` multilínea falla en PowerShell 5.1 → usar siempre `--body-file` con el markdown en `%TEMP%\opencode\`.
- Nota: la versión Angular anterior (con el rediseño y las mejoras de accesibilidad) quedó preservada en la rama `backup/angular-redesign-accesibilidad` por si hay que portar ideas.

### Pendiente externo (no bloquea el merge)

- Número de trabajo real (teléfono/WhatsApp) → issue #19 (`TODO-CONTACTO` en `brand.config.ts`).

---

## Estado de las demás issues (pendientes)

| # | Issue | Milestone |
|---|---|---|
| #5 | Eliminar promesas exactas (25%, 90%, 48h, <2h, 24h, S/ 9,900) | M1 |
| #6 | Primera persona singular y cero términos societarios (barrida completa i18n) | M1 |
| #7 | Franja de logos reemplaza Matriz Multiaseguradora | M2 |
| #8 | Tarjetas simplificadas + tarjetas de Personas | M2 |
| #9 | Mepo: 3 letreros-botón + saludo "¡Kuyaymi!" (renombrar Meipo→Mepo en código y textos) | M2 |
| #10 | Ambiente de color por seguro + Mepo condicional | M3 |
| #11 | Nueva ficha (video "Muy pronto", formulario por seguro, WhatsApp prellenado) | M3 |
| #12 | Carrusel de tipos en fichas formales | M3 |
| #13 | Carta fianza en 7 pasos + 3 casos de Vida | M3 |
| #14 | "Dos perfiles, una sola profesional" (usa ICON.png) | M4 |
| #15 | "Área de Riesgos Virtual" | M4 |
| #16 | Botón "¿Emergencia?" | M4 |
| #17 | Contenido de presentación (logo MEL, "¿Qué es un corredor?", "Tu bróker") | M4 |
| #18 | Footer legal SBS | M4 |
| #19 | [Pendientes externos] checklist de entregables de Melanie | — |
