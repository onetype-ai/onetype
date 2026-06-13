# Instructions 3 — Addon sređivanje, Terminal, Settings app, Scope, Canvas

Nastavak na instructions2.md. Ogromna sesija: prošli smo addon po addon, izgradili terminal, settings aplikaciju sa scope sistemom i canvas v2.

## Uspostavljeni standardi (važe svuda)

- Polja u addon.js: multiline objekti sa `description` na SVAKOM polju (AI trening). `id` je uvek `string`, nikad `string|number`. Nizovi uvek sa `each`.
- Wildcard `*` izbačen: prazan `app`/`mode` niz znači "svuda".
- Komande: pun opis šta rade i šta NE rade, opisne poruke rezultata ("App builder is now active.", "Setting X expects one of: ..."), guard za no-op (već aktivno = bez emita), 404/400 sa imenom krivca. `resolve(data, message, code)` — 4. arg je `end`, NE template params (`:id:` u porukama NIKAD nije radio, gradi se konkatenacijom).
- Emit payload = objekat koji config opisuje (`{id}`, `{ids}`, `{id, app}`), nikad gol string.
- Element tanak: logika u `addon.Fn()`/item `Fn`, element zove. Bez `AddonReady('elements')` wrapa.
- Render catch: `item/catch/add.js` (RenderAdd + Define(config)) i `remove.js` (RenderRemove).
- `events/` folder ne postoji, koristi se `core/listeners/`.
- `core/metadata.js` je MRTAV pattern (docs ga ne čita), sve ide u documentation item sa title/description/overview.
- Settings registracije: `label`, `type` = kontrola, `metadata: {addon}`.
- **FRAMEWORK SE NE DIRA BEZ DEJANOVE DOZVOLE** (sačuvano i u memoriji).

## Po addonima

**navbar**: each na nizovima, `@addon.item.modified` listener, `$ot.float.modal`, remove catch, logo hardkodovan u elementu (slika sa images.onetype.ai), entry/panel `display: contents` pattern (full height custom renderi, `margin-block: auto` za manje), pun docs overview.

**apps**: onOpen/onClose hookovi se POZIVAJU iz apps:switch (pre emita), guard, payload `{id}`, bar DRY.

**modes**: obrisan debug MutationObserver i mrtav metadata.js, bar sluša semantičke evente (modes.switch/apps.switch + item evente) umesto settings.change, payload `{id, app}`, out je `id` (ne mode).

**status**: kompletno refaktorisan na layouts. Panel = JEDAN layout item `status-panel` sa `config: {tab}`, tab putuje kroz `layouts:open data: {tab}` (kao docs pattern). Komande/settings/emitteri statusa OBRISANI. `e-status-panel` (e-62866281) je chrome (naslov + X → layouts:close). Bar čita stanje iz layout itema. Bottom slot je kolona (modes bar + paneli), modes bar lebdi preko canvasa (height 0 + margin-top -60 trik).

**terminal** (novo, addons/terminal): svaki command execution = log item (framework emituje `@commands.run` iz item.run — sve tri putanje uključujući invalid input i reject). Elementi: e-terminal (kompozicija) + e-terminal-log (e-77db0677) + e-terminal-prompt (e-4dcda0ff, ghost autocomplete `terminal.Fn('suggest')`, Tab pastuje, `:value` binding OBAVEZAN za žive inpute). Funkcije: parse (id key=value ili id {json}), run (vraća promise), script (multiline paste = sekvencijalno izvršavanje, # komentari). Komanda terminal:clear. Settings terminal.limit (select). Komande sa `silent: true` se ne loguju (framework polje). Auto id: framework `items.id++` kad se id ne prosledi.

**layouts**: pun tretman. id string, slots() mapira čiste props, restore emituje samo stvarno otvorene `{ids}`, open/close komande imaju matched/changed logiku (isti data = no-op preko JSON poređenja, 404 za nepostojeći id, "already open"), restore na **settings.ready** (NE @document.ready — redosled listenera nije garantovan). Mrtvo `.slot > [class^="w-"]` pravilo obrisano (deca slotova su `l-` wrapperi).

**settings** (SELJENO: framework modul obrisan → applications/settings, app poseduje addon): kontrole `input/toggle/select/transfer/table` (+ bez type = interni state, skriven iz UI). `options` array|function (select/transfer izvor, table redovi), `columns` za table, `storage` local/database/custom (custom = vlasnik drži podatke, database TODO), `onChange(value, item, instance)`, `label`. Komande settings:set (validira po kontroli + instance param) i settings:open (float panel, bound na group/scope/instance). UI: sidebar (grupe + scopes, kao docs app), content tri moda (group/scope/search preko svega sa badge-ovima), VS Code stil. **Scope sistem**: `scope.register {id, label, icon, options, active}` (store pattern), scoped setting čuva mapu `{instanca: vrednost}`, `Fn('get', id, fallback, instance)`, aktivna instanca preko scope.active. AddonReady TDZ zamka: funkcije addona ne postoje u AddonReady momentu → `queueMicrotask` u POZIVAOCU (users/items/settings/scope.js).

**permissions** (addons/permissions): registar (id, name, app) + TEMP fake itemi, settings item `permissions.granted` type transfer scope user. Srž (has/grant) NIJE počela.

**users** (addons/users, fake): id/name/email + 3 TEMP usera, registruje user scope (active: 'dejan' TEMP) i users.list tabelu (storage custom).

**canvas** (v2 kompletan): itemi = lebdeće kartice (x/y/width/height, app/mode filteri, config/data, render) sa snap na 24px mesh. `links: [{to, label, color}]` = strelice (pametno sidrenje na ivice, SVG marker, labeli, boje). Grupe: `group.register {id, name, color}` + computed regioni (auto-fit oko članova) + **group drag za labelu** (canvas:shift komanda). Layout prop: `free`/`stack` (stack = vertikalno po order, bridge demo). Kamera: pan (drag/wheel), zoom ctrl+wheel ka kursoru (0.25–2), persist `canvas.camera`, komande canvas:zoom/fit/reset (viewport u canvas store). Overlap: `collides` fn + excludes, drag pokazuje blocked i vraća na validnu, canvas:move odbija 400. Minimap (klik teleport) + HUD gore-centar (zoom, fit, broj itema; level update direktan DOM). Pozicije persist `canvas.state` na settings.ready. SVG sizing: bbox itema + 500 margin kroz :style binding + unutrašnji `g :transform` (NE :viewBox — binding završi lowercase!). TEMP: demo.js kartice, bridge.js i workflows.js layout itemi.

## Framework izmene ove sesije (sve odobrene)

- **dom.js**: `DOMSignificant` — patch poredi sibling preko whitespace text nodova; rešen gubitak focusa na prvi keystroke I stari layout collapse bug.
- **data.js**: `DataPath`/`DataPathError` — validacione greške nose putanju polja ("Field \"id\": Expected string, got undefined.", radi i `list[1]`, ugnježdeno).
- **commands**: `@commands.run` emitter (id/input/data/message/code/time, sve putanje), `silent` polje, mrtvo `meta` polje obrisano.
- **select + transfer elementi**: function options/items kroz lazy `list()` + `resolved` (UpdateData re-push sirove funkcije više ne ruši), `State.ready` guard za Update pre mounta, transfer brojači u sync().
- **500-events.js**: `ot-paste` direktiva.
- **code element**: `text` jezik dozvoljen.
- **200-for.js**: ot-for u SVG-u — red se kompajlira umotan u `<svg>` pa odmotava (namespace sačuvan).
- **methods.js/process.js**: mount lifecycle — `Mount()` setuje `State.mounted` (bio bug: nikad setovan pa Unmount mrtav), `Unmount()` resetuje, `__add` observer hook emituje mount+mounted JEDNOM za embedded rendere → **OnMounted sad radi za ot-node elemente**.
- AddonReady microtask fix je ODBIJEN (vraćen) — rešava se app-side.

## Docs aplikacija

- Fields tab: Description kolona. Items tab: funkcijska polja prikazuju ƒ/— (bez source-a). Settings tab (novi, e-documentation-settings). Tab persistencija kroz layout data (documentation.tab setting OBRISAN), sidebar šalje samo {addon} pa se tab resetuje na overview.

## DevTools

- `type.mjs` (novo): pravi CDP key eventi, `node type.mjs "tekst" --enter`.
- CDP console replay: stare greške se ponovo emituju pri svakoj konekciji — NE jurih duhove, proveri timestamp/build.
- reset.css zamka: `svg { max-width: 100% }` davi svg u 0-width roditelju (`max-width: none` override u canvas.css).

## Otvoreno / sledeće

- Servisni addoni (dogovoren katalog): **permissions srž** (has/grant API) → collaborator (socket/presence) → history (undo) → queue → shortcuts/search/palette/notifications → import/export/migrate/dummy/clipboard → billing/affiliate/usage → audit/webhooks/extensions.
- Canvas docs item (pun overview) + faza 3: portovi, spotlight, pinovi, zone sa značenjem, žive linije, semantic zoom. Vizija WOW: AI gradi uživo na platnu + canvas koji diše (live traffic pulsevi).
- Workspaces addon pun tretman (+ seliti bridge/forms/collections/workflows registracije u applications/), workspace scope za settings (kamera per workspace).
- settings storage database (back tabela), scope za kolekcije.
- Framework kandidati za razgovor: `settings.change` bez @ (jedini framework event van konvencije)... settings je sad app pa je OK; AddonReady timing (odbijen microtask — konvencija je queueMicrotask kod pozivaoca).
- Stari TODO iz instructions1 (layout collapse) REŠEN kroz DOMSignificant.
