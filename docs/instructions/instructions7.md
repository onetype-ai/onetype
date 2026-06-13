# Instructions 7 — Extensions app, Presets, odluke o pravcu

Nastavak na instructions6. Izgrađen Extensions marketplace i Presets addon, donete ključne odluke o ostatku globalnih addona i builder sloju.

## Extensions app (front/applications/extensions) — marketplace

Aplikacija u rail-u (id `extensions`, order 6, icon extension). SRŽ platforme po Dejanu: sve je ekstenzija, ovo je izlog.

- **addon.js**: item = ekstenzija sa store licem: `id, order, name, icon, color (brand|blue|red|orange|green), description, overview (markdown za detail), author, official (bool → verified značka), category, rating, reviews, price (label), featured, trending, installed`.
- **functions**: `list({query, category})` — category može biti i `all/featured/trending/installed`; `categories()` (distinct + count); `persist()` → settings `extensions.installed` (lista id-jeva, default null = prvi put), restore na `settings.ready` (core/listeners/ready.js).
- **Komande**: `extensions:install/uninstall {id}` — guardovi (404, already), persist, emit `extensions.install/uninstall`.
- **Layout**: sidebar (e-navigation-sidebar: Browse grupa All/Featured/Trending/Installed + Categories koje se same grade) + content sa config `{category, extension}` — kad je `extension` setovan renderuje detail, inače store. Navigacija = `layouts:open extensions-content data {...}` (bez ruta).
- **Elementi**: `e-extensions-store` (e-26ab8bfe) — hero kroz **e-global-heading** + pretraga kroz **e-form-input** (`:_input` callback!), sekcije sa karticama; `e-extensions-card` (e-64509053) — ZASEBAN element, config `{extension (object), _open, _toggle}` — props kroz `this.Compute`, klik na karticu otvara detail, Install dugme `event.stopPropagation()`; ot-key MORA `entry.id + ':' + entry.installed`; `e-extensions-detail` (e-6ba4172c) — back dugme, hero (veliki tile, ime+verified, author·category, rating/reviews/price, Install/Uninstall) + overview kroz e-global-markdown (fallback description).
- **Explorer izvor**: `extensions:` prefiks, Enter instalira/deinstalira.
- Katalog TEMP (items/self/catalog.js): 5 official OneType (installed) + 17 third-party, 14 kategorija; overviews mapa na dnu fajla za detail stranice (6 napisanih).
- Pattern lekcija: framework form-input ima `_input`/`_change` callback propse ({event, value}); element-u-elementu callback = `:_name` konvencija.

## Presets addon (front/addons/presets) — živi šabloni

Preset može biti BILO ŠTA (kolekcija, tag, bridge, workflow...) — callback materijalizuje rezultat iz ulaza.

- **addon.js**: `id, group (domen: collections/tags/workflows...), app[], mode[] (prazno = svuda, kućni standard), order, name, icon, description, config (define šema ulaza), callback (required)`.
- `item.Fn('run', data)` — **STRICT** DataDefine validacija pa callback (await-uje). `item.Fn('visible')` kao layouts. `Fn('list', group)` filtrira visible + group.
- **Komande**: `presets:run {id, input}` (404/400 sa preciznim porukama — "Unknown field hacker", "Invalid option 9. Expected: 1...6"), `presets:list {group}` — exposed, AI i terminal ih koriste.
- Demo (items/self/demo.js TEMP): collections (Blog 6 polja, Products sa currency), tags (Heading h1-h6, Container — vezani app:['builder'], dokazana vidljivost), workflows (Lead capture). Docs item pun.
- Vlasnik domena pita `presets.Fn('list', 'svojagrupa')` i nudi u svom UI-ju.

## Workflows app modovi

Site (id `front`, default, icon web) i Server (id `back`, icon dns) — front/addons/workspaces/items/modes/workflows/{front,back,bar}.js. Modes bar je layout item PO APP-u (`workflows-modes-bar`).

## ODLUKE o pravcu (važno!)

1. **Scheduler NIJE posebna aplikacija** — schedule je samo tip TRIGGERA. Workflows app = automatizacije: trigger (schedule/event/webhook/manual/ai) + akcije, oba kao PROŠIRIVI REGISTRI (ekstenzije dodaju svoje). Framework `schedules` (vreme) i `events` moduli se tu naslanjaju.
2. **Globalni addoni koji još fale** (redosled: context menu → notifications → toolbars → controls → triggers/actions): context menu (desni klik registar po kontekstu — najveća rupa), notifications (toast kroz postojeći $ot.float.toast({title,message,type,duration}) + inbox u navbaru), toolbars (generalizovane trake kao registri), controls/fields registry (tipovi polja za kolekcije/forme/settings), importers/exporters (Webflow!), integrations (spoljni servisi + kredencijali), permissions srž PRE third-party runtime koda, queue, bugs modul (stability score na marketplace-u). Teme = presets grupa; paneli = layouts; slash = commands.
3. **Builder inventar** (pages, classes, colors, tags, components + ostalo): elements tree, variables/tokens (site colors HSL sistem + framework variables postoje), breakpoints, assets/media (Cloudflare images uvezen), typography (fonts back addon), collections+bindings (app ljuska postoji), forms (postoji), navigation, site settings (scope "site"), publish. Faza 2: interactions, locales. BACK VEĆ IMA: sites/pages/sections/elements/variables addone — front se kači, ne izmišlja. Redosled: pages → elements tree + tags → classes/styles + tokens → components → bindings.
4. History/versioning IDE NA KRAJU (Dejan: komplikovano, versioning priča).

## Alati

- screenshot.mjs sad SKALIRA: duža strana ≤1500px (CDP clip scale) — API za slike u dugim razgovorima odbija ≥2000px. Stare velike slike u istoriji razgovora ostaju problematične, novi snimci prolaze.
- Podsetnik: assets manifest (back/items/assets/assets.js) se čita na BOOT — izmena traži restart `node back`. CDP testovi: uvek cd u sites-app pre poziva.
