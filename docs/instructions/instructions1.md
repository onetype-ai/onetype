# Instructions 1 — App stanje (sites-app)

Šta smo izgradili do sada. Samo app (sites-app), ne framework.

## Arhitektura

Sve je extension-based. Addoni se sami registruju, ništa nije hardkodovano. Treća strana može isto što i mi.

```
front/
  addons/        globalni, deljeni addoni
    layouts/     shell: slotovi i zone (e-layout element)
    applications/ rail launcher (e-bar element) — addon ime: apps
    status/      donja traka + panel
    modes/       editor modovi
    canvas/      canvas zona
    workspace/   leftover app/status registracije (treba preseliti)
  applications/  app moduli (svaki sam za sebe)
    builder/     builder app
    documentation/ documentation app
  items/pages/   home.js (route '/'), not-found.js
```

## Konvencija foldera addona

```
addon/
  addon.js              samo Field definicije
  core/
    metadata.js         Metadata (ako addon nije u docs preko documentation itema)
    emitters/<ime>.js   EmitRegister('addon.event', {description, metadata:{addon}, config})
  functions/<ime>.js    addon.Fn('ime', ...) globalne funkcije
  item/functions/<ime>.js  addon.Fn('item.ime', fn(item)) → item.Fn('ime')
  items/
    commands/<ime>.js   commands.Item({id:'addon:akcija', metadata:{addon}, in/out})
    settings/<ime>.js    AddonReady('settings', s => s.Item({id, default, persist}))
    elements/<ime>/      elements.ItemAdd (bez AddonReady wrap-a)
    documentation/documentation.js  AddonReady('documentation', d => d.Item({...}))
    self/<ime>.js        addon.Item(...) sopstveni itemi
    layout/<ime>.js      AddonReady('layouts', l => l.Item({...})) kači u shell

addon.Fn = globalna; item.Fn = nad jednim itemom (item prvi arg).
Element je TANAK: zove funkcije, ne drži inline logiku.
```

## Layouts (addons/layouts)

Shell workspace-a. `<e-layout>` renderuje 5 slotova: top, left, center, right, bottom. Zone (`root` default), ugnježdene preko `<e-layout zone="...">`.

Layout item polja: `id, order, active, app[], mode[], zone, slot, width, height, resizable, config, data, render`.

Filteri (item se vidi kad SVE prolazi):
- `active` true
- `app` prazan ili sadrži aktivnu app (`*` = sve)
- `mode` prazan ili sadrži aktivni mod (`*` = sve)
- `zone` odgovara

Funkcije: `layouts.Fn('slots', zone)`, `item.Fn('visible')`, `item.Fn('render')`.
Komande: `layouts:open` / `layouts:close` (primaju id ILI app ILI mode, + open prima data).
Emitteri: `layouts.open`, `layouts.close` (nose `ids` niz).

**Config + data:** layout item deklariše `config` (schema props), render ih čita kao `this.X` (NE `this.data.X`). Otvori sa `layouts:open {id, data:{...}}`, render fn raširi `...item.data` u props, render koristi `this.Compute(() => ...)`.

**Persistencija:** `layouts.Fn('persist')` čuva `{active, data}` po item id u settings (`layouts.state`). `layouts.Fn('restore')` na `@document.ready` vraća. Open/close zovu persist.

**Reaktivnost:** layout sluša semantičke evente, NE `@addon.item.modified` (dupli re-render): `layouts.open/close`, `apps.switch`, `modes.switch`, + `@addon.item.added/removed`.

## Apps (addons/applications, addon ime `apps`)

Rail launcher. Element `e-bar`. Polja: `id(string), order, position(top/bottom), icon, label, onOpen, onClose`.
- Aktivna app u settings `apps.active` (persist).
- Komanda `apps:switch` (validira, set settings, emit `apps.switch`).
- `apps.Fn('list')` modularno.
- Bar sluša `@addon.item.added/modified/removed` + `apps.switch`.

## Modes (addons/modes)

Editor modovi. Element `e-modes-bar`. Polja: `id, order, app(string), default(bool), icon, label, onActivate, onDeactivate, active(computed)`.
- Mod pripada TAČNO jednoj app (`app` je string).
- Aktivni mod PER-APP: settings `modes.active` = objekat `{app: modeId}` (persist).
- `modes.Fn('active', app)` — vraća mod iz mape ili `default:true` mod kao fallback.
- `modes.Fn('list')` filtrira po aktivnoj app.
- Komanda `modes:switch`, emitter `modes.switch`.
- Builder modovi: design(default)/content/responsive/preview/ai. Documentation modovi: developer(default)/api.

## Settings (framework modul, koristimo ga)

`settings.Fn('get', id, fallback)`, `settings.Fn('set', id, value)`. Persist flag po itemu (localStorage `onetype.settings`). Sync u `State('settings')` → render ima `this.state.settings[id]`. Emituje `settings.change` sa `{id, value}`.

Stanje aplikacije ide kroz settings, NE kroz State direktno.

## Documentation app (applications/documentation)

Auto-generisana dokumentacija iz živog koda. Svaki addon se sam registruje:
`documentation.Item({id, order, group, icon, label, addon, title, description, overview})`.

- Sidebar se gradi iz `documentation.Items()` grupisano po `group` (Global/Modules).
- `documentation.Fn('inspect', name)` vraća sirove podatke: fields, items, functions, store, elements, commands, pipelines, events (+ title/description/overview iz documentation itema).
- `content.js` (layout item, app:['documentation']) zove inspect, gradi tabove (count = .length), prosleđuje pravi data tab elementima.
- `e-documentation-tabs` — traka tabova (config: inspect, ne `data` jer je rezervisano).
- Tab elementi: overview/fields/items/functions/store/elements/commands/events — svaki prima svoj niz, formatira za `e-data-table`.
- Bez ruta. Klik u sidebaru → `layouts:open {id:'documentation-content', data:{addon}}`.

## Navigacija: bez ruta

Izbacili smo routing. Samo `/`. Sve ide kroz `layouts:open` + data + settings. Klik = komanda, ne href.

## Otvoreni problemi (TODO)

- **Layout flex collapse bug:** posle re-rendera na promenu moda, slot left dobije width 0 i slot bottom height 0 (sadržaj je u DOM-u i vidljiv, ali slot collapsed na 0). Verovatno `display: contents` na `w-`/`l-` render wrapperu se gubi pri re-renderu. Treba istražiti CSS pravilo `.e-49430f40 .slot > [class^="w-"]` { display: contents }.
- `addons/workspace/items/` još drži app registracije (bridge/forms/collections/workflows/settings) i console — treba preseliti u `applications/<ime>/`.
