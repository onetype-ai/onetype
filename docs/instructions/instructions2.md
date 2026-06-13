# Instructions 2 — Navbar, Workspaces, Float Panel

Nastavak na instructions1.md. Šta je urađeno u drugoj sesiji, app i framework.

## Navbar (front/addons/navbar)

Gornja traka editora, extension based, kao layouts ali horizontalno. Tri pozicije: left, center, right. Sadržaj dolazi iz addon itema, ništa nije hardkodovano.

Polja itema: `id, order, active, app[], mode[], position(left/center/right), type(default/dropdown/popup), icon, label, tooltip, selected, onClick, config, data, render`.

Tri tipa (`type`):
- **default** je dugme. icon, label, ili oba, plus onClick. Ako ima `render` (a type je default), to je custom inline sadržaj bez box wrappera.
- **dropdown** je trigger. icon/label su dugme, `render` je panel koji se otvara ispod preko `ot-popup`.
- **popup** otvara `render` kao centriran modal preko `$ot.float.modal`.

Element `e-navbar` (hash e-45daee5a). Grupiše po `position` kroz `navbar.Fn('positions')`, filtrira po visible (active/app/mode), sluša `apps.switch`/`modes.switch`/`@addon.item.added/removed`.

**Full height render**: ako item ima `render`, custom sadržaj automatski ide pune visine navbara (bez vertikalnog paddinga). CSS koristi `:has(> :not(.item))` da prepozna entry sa custom renderom. Tako workspace tabovi mogu da idu od vrha do dna. Bez ikakvog `height` polja, render = full height po defaultu.

Dizajn: Linear minimal. Pills prozirni (bez bg/border), tekst-2 boja, selected ima brand-opacity bg + brand boja + popunjena ikona + brand indikator na vrhu (kao apps rail i sidebar, usklađeno). Navbar je transparentan, samo donja linija. Visina 46px (home.js grid rows).

Dokumentacija: `items/documentation/documentation.js`, Global grupa.

## Workspaces (front/addons/workspaces)

Stari folder `workspace` (jednina, držao app registracije bridge/forms/...) preimenovan u `workspaces`. Sad je pravi addon.

Workspace je sačuvan UI kontekst (koja app, mod, paneli) sa svojim id-jem. Tabovi u centru navbara, VS Code stil. Podaci se dele između workspace-ova (workspace je pogled, ne kopija), switch je samo re-render pogleda.

Polja: `id(string), name(string), icon(string)`. Za sad 2 hardkodovana self itema (Editor, CMS) u `items/self/`.

**Element `e-workspace-tabs`** (hash e-1323fd4c) u navbar centru (`items/navbar/tabs.js`, custom render pa full height). Tabovi: ikona (`workspace.icon || 'web_asset'`) + ime, VS Code stil (pune visine, naslonjeni na dno, aktivni deli bg sa canvasom + brand linija na dnu). Klik na neaktivni tab = switch, klik na aktivni = otvara desni settings panel. Plus dugme za novi workspace (tooltip Create Workspace). Sluša `@addon.item.added/modified/removed` i `workspaces.switch`.

**Settings** (`workspaces.active`, persist string, default editor). Komande: `workspaces:create` (novi + switch), `workspaces:switch`, `workspaces:close` (guard: ne moze poslednji, auto-switch ako zatvaras aktivni). Emitter `workspaces.switch`.

**Settings element `e-workspace-settings`** (hash e-45baeef1). Koristi `e-core-builder` (framework config driven forma) sa `name` field-om, clean sekcija (`section: { background: '', variant: [] }` da nema okvira oko polja), Save dugme na dnu (`_save` preimenuje + zatvori panel). Otvara se kroz `$ot.float.panel({ position: 'right', width: 'l' })`. Desni panel jer će tu kasnije ići AI autonomous agent definicija.

## Float Panel ($ot.float.panel, framework)

Sve floating wrapovano u `$ot.float.{popup, modal, panel, tooltip, toast, confirm}` namespace (addons/float/popup/js/addon.js). Stari flat `$ot.modal`/`$ot.popup`/... ostaju kao aliasi da ne polome postojeći kod (47 poziva).

**`$ot.float.panel(options)`** je novi chrome popup. Sam iscrtava okvir (header sa title/description/close, body sa content, footer sa actions). Ti samo daš sadržaj.

Opcije: `title, description, content (string ili funkcija), actions[{label, color, tone, icon, onClick}], position(center/right/left/bottom/top), width(s/m/l), padding(none/s/m/l), clean(bool, bez chrome-a), backdrop(0.4 default), closeable, escape, onClose, onOpen`.

Pozicije daju različite oblike iz istog API-ja: center je modal, right/left je drawer (full height), bottom/top je sheet (full width). Sve su lebdeće kartice sa borderom, radius-om i marginom od ivica (16px padding na overlay), ne zalepljene golo.

Element `e-popup-panel` (hash e-5ea275cd, u addons/float/popup/js/items/elements/panel/). Funkcija `popup.Fn('panel', options)`. Content ide kroz `ot-html` (kompajlira HTML string, podržava ugnježdene elemente). Actions koriste `e-form-button` sa `color`/`tone` (ne variant). Save dugme = `{ label: 'Save', color: 'brand', onClick: ({ close }) => ... }`.

**Resize tracking** (addons/float/overlays/js/item/catch/add.js): svaki float se sad repozicionira na window resize (pre je samo target-vezani popup sa `track:true`). Razdvojeno: resize uvek (modal/drawer/sheet prate ivicu kad se prozor menja), scroll samo za target-vezane popupe. Cleanup listenera na close postoji.

## Docs tab persistencija (front/applications/documentation)

Aktivni tab u dokumentaciji se pamti per-addon (settings `documentation.tab` = objekat {addon: tab}, persist). Refresh vraća na tačno isti tab tog addona, fallback overview. `content.js` čita iz settings u Compute, piše u settings u change.

`items.js` Items tabela: funkcije (onClick, render) prikazuju `ƒ` umesto celog source koda. `—` znaci nije podešeno, `ƒ` znaci funkcija. Opšti fix, važi za sve addone u docs.

## DevTools (docs/devtools)

CDP helper skripte za testiranje preko Chrome remote debug porta (9222). Pokreni Chrome jednom:
```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222 --user-data-dir="/tmp/chrome-cdp" "http://localhost:3000"
```
- `cdp.mjs "<js>"` ili `--file <path>` — evaluira JS u stranici, čita rezultat, hvata console/exception.
- `click.mjs <x> <y>` — pravi mouse klik na koordinatama (native, ne sintetički), meri po frame-ovima.
- `screenshot.mjs <out> [x y w h]` — snima PNG (ceo viewport ili region).
- `resize.mjs <w> <h>` — menja viewport (Emulation.setDeviceMetricsOverride), čita panel poziciju.

Editor je na localhost:3000 (build.js + prazan __STATE__). Server rebuilduje iz framework src na svaki request, pa reload pokupi izmene framework-a bez restarta.

## Boje (framework variables.css)

Text varijable promenjene. Hijerarhija: ikonice + labeli = text-2, sitne stvari (grupe u sidebaru) = text-3, headinzi = text-1. Sidebar item ikona vraćena na text-2 (bila text-3).

## Framework izmene (audit + ostalo)

Veći audit framework-a (18 fix-eva, svaki dokazan uživo preko CDP):
- **fields.js**: FieldRemove čekirao `name in this.fields` umesto `.data` (nikad nije brisao). FieldOn pogrešan template ključ.
- **middleware.js**: MiddlewareUnregister ostavljao orphan callbacks.
- **observer.js**: ObserverNode 'remove' sad čisti sve registrovane observere (hover/click/scroll/visibility/resize) na DOM removal. ObserverUnhover brisao i `__hoverOffset`. Plus raniji `isConnected` guard (reorder node ne sme Destroy).
- **items.js**: ItemGetByMap mrtav kod uklonjen, ItemOn vraća this (chaining).
- **750-node.js**: removeAttribute na detached node (early return na replaceWith).
- **200-for.js**: throw je gubio specifičan error u generičkom (return umesto throw).
- **1000-render.js**: console.error/warn → onetype.Error.
- **state.js**: StateSet dedup front/server grane.
- **methods.js**: OnUnmounted hook dodat (event je postojao, hook nije).
- **750-html, 6 directive fajlova**: space → tab indentacija (konvencija foldera je tab).
- **locale.js**: attr → attribute. **validate.js**: spacing posle &&. **addons.js**: callback shadowing, AddonReady semicolon.

Bug nađen usput: `ot-html` + `:class` na istom elementu se sukobljavaju (ot-html zamenjuje node, briše class). Rešenje: odvojen unutrašnji div za ot-html.

## Drag & drop direktive (framework)

`ot-dragstart, ot-dragover, ot-dragenter, ot-dragleave, ot-drop, ot-dragend` (addons/render/directives/front/items/self/500-drag.js). ot-dragstart auto-postavi draggable=true, ot-dragover/drop/dragenter auto-preventDefault (neophodno da drop radi). Iskorišćeno za reorder slika u upload-many elementu (drag handleri + dragIndex + splice reorder + dragging/drag-over klase za feedback).

## Otvoreni problemi / sledeći koraci

- **Workspace srž**: `workspace.Fn('get/set/clear')` omotači koji prefiksuju settings sa aktivnim workspace id-jem. Cilj: svaki workspace pamti svoj UI state (app, mod, paneli). Svuda zameni `settings.Fn()` → `workspace.Fn()` za per-workspace state. Globalno (tema, jezik, workspace lista) ostaje settings.
- **Kontekst agent vs korisnik** (nerešeno): kako workspace sloj zna iz kog konteksta dolazi poziv (tvoj aktivni vs background agentov), da UI efekti komandi (toast, panel) ne upadaju korisniku dok agent radi u pozadini. Razmatrano: `Run(workspaceId, fn)` kontekst vs eksplicitan prosleđen workspace.
- **Live switch**: switch na workspace = re-render tog konteksta sa svežim deljenim podacima (promene idu live).
- **Builder sadržaj**: Editor workspace je prazan (canvas placeholder), pravi builder još nije tu.
- **AI sloj**: ambijentalni asistent (prati i ispravlja u letu) + agentni (background zadaci kroz iste komande). Klin proizvoda.
