# CDI Consultoría — sitio web

Sitio de marketing de CDI Consultoría: consultoría en logística, depósitos e inventarios (Argentina y Uruguay, desde 1992). Empresa matriz: SZNET.

**Dominio real de producción:** `cdinet.com.ar` (el sitio hoy se despliega en un dominio de Vercel mientras se migra el DNS — ver `astro.config.mjs` y los `canonical`/`og:url`, que ya apuntan a `cdinet.com.ar`).

## Stack

- **[Astro](https://astro.build)** — sitio 100% estático, sin framework de UI (sin React/Vue), cero JS por defecto salvo donde se declara explícitamente (`<script>` en componentes puntuales como el menú móvil o el panel de diagnóstico del hero).
- **Deploy:** Vercel, autodetecta Astro vía `vercel.json` (`framework: astro`, build `astro build`, output `dist`).
- Sin base de datos, sin backend, sin CMS. Todo el contenido vive en archivos `.astro` dentro de `src/pages/`.

## Cómo correr el proyecto

```bash
npm install
npm run dev       # servidor local con recarga en caliente
npm run build     # genera dist/ (lo que se despliega)
npm run preview   # sirve dist/ localmente para verificar el build de producción
```

## Estructura

```
src/
  layouts/Layout.astro       # <head> compartido: meta tags, OG, Twitter, JSON-LD Organization
  components/                # Nav, Footer, Faq, KpiRow, RelatedServices, CtaBanner, Breadcrumb,
                              # DiagnosticPanel (panel del hero), ConsoleLog (sin usar, ver nota abajo)
  lib/schema.js               # helpers para generar JSON-LD: faqSchema(), serviceSchema(), articleSchema()
  styles/global.css           # todo el CSS del sitio (paleta dark "consola", ver sección Diseño)
  content/blog/               # content collection de Astro para el futuro blog (vacía a propósito)
  pages/
    index.astro                       # Home
    servicios.astro                   # hub que linkea las 14 páginas de servicio
    consultoria-depositos.astro       # + 13 landings más de servicio (ver lista abajo)
    metodologia.astro
    nosotros.astro
    faq.astro                         # 30 preguntas
    contacto.astro
    blog/index.astro                  # listado de categorías, sin artículos aún
    casos-de-exito/index.astro        # + 6 páginas, una por cliente real
public/
  assets/                     # fotos e íconos (generados con IA, ver nota abajo)
  robots.txt                  # permite explícitamente GPTBot, ClaudeBot, PerplexityBot, etc.
  sitemap.xml                 # a mano, 28 URLs — actualizar si se agregan páginas
  llms.txt                    # resumen del sitio en markdown para asistentes de IA
_legacy/                      # versiones estáticas previas (HTML suelto), archivadas, no se sirven
```

## Páginas de servicio (14)

**Consultoría** (servicio principal — nunca subordinar esto a la tecnología):
`consultoria-depositos`, `consultoria-inventarios`, `auditoria-inventarios`, `supply-chain`, `mejora-continua`, `capacitacion-operativa`

**Optimización:**
`optimizacion-depositos`, `optimizacion-picking`, `organizacion-almacenes`, `inventarios-ciclicos`, `exactitud-inventario`

**Tecnología que aplicamos** (herramientas, explícitamente subordinadas — ver sección Posicionamiento):
`implementacion-wms`, `rfid-depositos`, `codigo-de-barras-inventarios`

Cada landing sigue el mismo patrón interno: hero con pregunta de dolor → 3 problemas específicos → KPIs + 1 caso de éxito relacionado → FAQ propia (3 preguntas) → cross-links a otras 3 consultorías → CTA. Al agregar una landing nueva, copiar la estructura de una existente (`consultoria-depositos.astro` es la más representativa) en vez de empezar de cero.

## Posicionamiento — reglas que no hay que romper

Esto quedó establecido después de varias iteraciones y una auditoría GEO/SEO explícita. Antes de agregar contenido, respetar:

1. **CDI es una consultora, no un vendedor de hardware/software.** El código de barras, RFID y WMS son herramientas que se recomiendan *cuando el diagnóstico lo indica*, nunca el punto de partida del mensaje.
2. **Nunca centrar "hardware" en un H1, título o el campo `slogan` del schema**, ni siquiera en negación ("no vendemos hardware") — la negación no elimina la asociación semántica para un LLM, la refuerza. Ya se corrigió 3 veces en el sitio; no reintroducirlo.
3. **Los hooks de hero van con el dolor del cliente primero** ("¿Tu inventario nunca cierra?"), no con el nombre del servicio.
4. **No fabricar testimonios, porcentajes de resultado por cliente, ni casos de éxito placeholder.** Los 6 casos actuales (Bustin, San Justo Iluminación, Adama, Toyota Tsusho, Mercado Libre, A. Sabbatini e Hijos) son reales, con datos reales. Si no hay dato real, no se inventa — se omite.
5. **Metodología es de 7 etapas**, con "Auditoría operativa" e "Identificación de causas" explícitas — lenguaje de consultoría de diagnóstico, no de rollout de proyecto técnico.

## SEO / GEO (Generative Engine Optimization)

- JSON-LD en cada página: `ProfessionalService` (global, en `Layout.astro`), `Service` por landing, `FAQPage` donde hay preguntas, `Article` en cada caso de éxito. Helpers en `src/lib/schema.js`.
- `public/llms.txt`: resumen del sitio pensado para que un LLM lo lea directo, sin tener que crawlear todo el sitio. **Actualizar manualmente si se agregan/cambian páginas de servicio.**
- `public/robots.txt`: permite explícitamente crawlers de IA (GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, Google-Extended, PerplexityBot) además de el resto.
- `public/sitemap.xml`: escrito a mano (no autogenerado). Si se agrega una página, agregar su URL acá también.
- Palabras clave objetivo: *consultoría de toma de inventario, consultoría de depósitos, consultoría logística, movimiento de mercadería* — ya tejidas en hero, meta descriptions y FAQ.

## Diseño

Paleta dark "consola de operaciones": `--bg` casi negro, paneles con borde sutil, acento verde (`--green`, estados OK) y ámbar (`--amber`, alertas), azul (`--blue`) para links/tecnología. Tipografía: Space Grotesk (títulos), Inter (cuerpo), JetBrains Mono (datos/labels). Todo el CSS está en `src/styles/global.css`, sin CSS-in-JS ni módulos separados por componente.

El panel del hero (`DiagnosticPanel.astro`) muestra hallazgos de un diagnóstico típico (deliberado: comunica "informe de consultora", no "producto de software"). Existe un componente `ConsoleLog.astro` de una iteración anterior (log de escaneos en vivo tipo terminal) que **ya no se usa** — se reemplazó por decisión explícita, porque visualmente comunicaba "producto WMS" en vez de consultora. Se puede borrar si nadie lo va a retomar.

## Assets

Fotos e íconos en `public/assets/` fueron generados con IA (ChatGPT/DALL-E) a partir de un contact sheet, recortados con Python/PIL. Las versiones `*-full.png` incluyen el label de texto original; las que no tienen sufijo son el ícono solo. No hay licencias de terceros involucradas — son 100% generados.

## Pendiente / decisiones abiertas

- `sameAs` del schema Organization solo tiene el propio dominio y `sznet.com.ar` — falta LinkedIn u otro perfil externo real (no inventar).
- Confirmar en el dashboard de Vercel que el Framework Preset quedó en "Astro" tras la migración desde HTML estático.
- Testimonios de clientes, porcentajes de resultado por caso, y artículos de blog: en pausa hasta tener datos reales (ver regla 4 de Posicionamiento).
- El dominio de producción (`cdinet.com.ar`) todavía no apunta a este deploy de Vercel — pendiente de migración DNS por parte del cliente.
