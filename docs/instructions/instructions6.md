# Instructions 6 — Workflows v2 agentni (finalno), benchmark mašina, Explorer, Shortcuts

Nastavak na instructions5. Workflows engine REBUILDOVAN u agentni sistem i ispeglan kroz brze benchmarke, dodat Explorer (universal search) i Shortcuts integracija.

## ai.workflows V2 FINALNO (framework/addons/ai/addons/workflows)

Plan-unapred sistem (steps/loop/each/lint) ZAMENJEN agentnim. Arhitektura:

- **workflow-tasks** (items/agents/tasks.js): goal → 2-8 taskova `{id, goal, needs[], agents[]}`. Pravila: grupisanje po ISHODU (cela stranica = 1 task), bez preklapanja (svaki entitet pripada jednom tasku), bez gold-platinga (samo što goal traži), bez verify taskova (verifikacija ugrađena), worker kombinuje VIŠE agenata (achievable false samo kad akcija nema agenta), svaki zahtev goala mora u tačno jedan task. tokens 2000.
- **workflow-next** (items/agents/next.js): po JEDAN korak — input {goal, task, agents(subset!), log[]} → `{reasoning, achieved, goal, agent, input, as}`. reasoning je PRVO polje u šemi (model prvo razmišlja — bitan redosled generisanja!). Pravila: čitaj log, ne ponavljaj uspešno, posle FAILED menjaj nešto, dugi tekstovi SAMO kroz $ref, achieved tek kad je SVAKI zahtev dokazan u logu, max 40 reči reasoning. tokens 3000.
- **Scheduler** (modes/action.js): paralelni taskovi po `needs` (concurrency polje na workflow itemu, default 3, cap 5), dependency-failed → skipped, safety net za pending. Po tasku: cap 30 iteracija (final-check 60), 3 uzastopne greške ILI 3 idle = fail.
- **Konvergencijska mašinerija** (sve deterministički u engine-u, ključ uspeha!):
  - dedupe sa unchanged detekcijom: isti agent+input ponovo → izvrši pa ako je rezultat identičan → idle++ + nudge sa NEISKORIŠĆENIM stored imenima ("USE what you have: $x, $y")
  - greška = OPSERVACIJA u logu (i greška iz next poziva!), ne rušenje; recovery mod: posle prve greške worker dobija PUN spisak agenata
  - confirm pass: achieved važi tek kad drugi prolaz dokaže svaki zahtev
  - final-check talas: kad su svi taskovi done, dodatni worker proverava CEO goal protiv stvarnog stanja i dovršava rupe
  - truncation budžeti: input 200, result 600 karaktera u logu — KRITIČNO, sečenje rezultata je krilo dokaz verifikatoru (lister sa 9 stranica)
  - `as` se normalizuje (skida $), input unwrap (ceo objekat → istoimeno polje ili jedino polje)
- Emitteri: workflows.start/plan/task/step/done (task: running/done/failed/skipped → UI checklist mapira 1:1).
- `agents` subset po tasku (tasks agent dodeljuje) → manji prompt za next = brže i tačnije.

## Benchmark mašina (brzi loop — ~60s za ceo paket!)

- FAST mock content agenti (instant tool verzije copywriter/translator/seo/section/form agenata) — model ostaje SAMO u mozgu. PAZI: mock mora biti REALISTIČAN (translator vraća pravi francuski/srpski canned tekst, form-designer poštuje purpose) — nerealan mock truje benchmark!
- Paralelni scenariji u jednom prolazu (vLLM batchuje): /tmp/wf-fast-bench.js (5 sajt scenarija: prosta stranica, opis, 3 stranice+tidy, recovery, mini ULTRA), /tmp/wf-prod-bench.js (8 prod domena: plugini install/uninstall, custom kod, REST endpointi, tagovi, boje, automatizacije, kombo, nemoguće — sa REALITY proverama protiv window.__site stora, ne samo statusa!).
- Rezultat na kraju sesije: prod suite 8/8, fast suite varira 2-5/5 (final-check + worker fiksacija = poslednje slabosti).
- vLLM za paralelu: --max-model-len 16384 --max-num-seqs 16 --enable-prefix-caching --kv-cache-dtype fp8.
- ZAKLJUČAK (potvrđen sa Dejanom): preostale greške su protokolske (9B knjigovodstvo) → put do 100% je TRENING: bench tragovi sa reality labelima = besplatan SFT/DPO dataset, LoRA za workflow-next prvo.

## Assistant promene

- `assistants:ask` → goal → workflow run (steps 100) → report kroz assistant glas na jeziku korisnika ([system] poruke ne diktiraju jezik). UI workflow kartica u chatu: checklist taskova (workflows.task event), spinner, ticker, failed crveno.
- DEMO AGENTI OBRISANI (front/addons/assistants/items/agents/demo.js više ne postoji) — assistant trenutno nema sposobnosti (iskreno odbija), navigaciju pokriva explorer. Kad krenu pravi agenti, pattern: model agent (sadržaj) + tool agent (upis) + read agent (verifikacija!) + idempotencija po prirodnom ključu.
- Lekcije za agente: interni agenti UVEK condition:false (planner inače bira pogrešnog — tidier silent no-op bug), read agent mora vraćati SVE što verifikacija proverava (lister sa seo/sections/form).

## Explorer (front/addons/explorer) — universal search

- Addon: item = IZVOR `{id, order, group, icon, prefix, search(query) → [{icon, label, hint, command, input}]}`. `explorer.Fn('search')` rutira prefikse (apps:, modes:, pages:, settings:, commands:, shortcuts:) i grupiše (5 rezultata po grupi, 15 sa prefiksom).
- Izvori SVAKI U SVOM addonu kroz AddonReady('explorer'): apps (apps:switch), modes (modes:switch — modes.Fn('list') vraća PLAIN objekte!), canvas pages (canvas:jump), settings (settings:open), commands + shortcuts (u explorer items/self).
- Element e-explorer (hash e-2abdbfab): glass modal (bg-2-opacity + blur), autofocus, strelice/Enter/klik, aktivni red brand-opacity. Selekcija IZVRŠAVA komandu; shortcut rezultat ide kroz shortcuts.Fn('trigger').
- AI ŠLAG: poslednji red uvek "Ask the assistant: query" — Enter otvara assistants panel i šalje upit. Search bez dead-enda.
- Navbar: pill trigger e-explorer-trigger (hash e-32dcabc0) — ⌘ ikonica (keyboard_command_key) + "Search...", izgleda kao input, klik → explorer:open komanda. PAZI: render fn elementa NE SME da zove this.Update() pre mounta (top-level dodele su same reaktivne).
- Komanda explorer:open (guard duplog otvaranja preko querySelector).

## Shortcuts (framework modul, sad uključen)

- DODAT u bundle: back/items/assets/assets.js import lista + 'shortcuts' — MANIFEST SE ČITA NA BOOT, treba restart `node back`!
- Framework modul kompletan: key parsing (ctrl/alt/shift/meta+key), context/target/condition, priority, trigger → callback/command/action, enable/disable.
- Cmd+K i Ctrl+K → explorer:open (front/addons/explorer/items/shortcuts/open.js).
- TEMP demo prečice (front/items/shortcuts/demo.js): Ctrl+1/2/3 apps, ⌘⇧A assistant, ⌘⇧X tidy. Callback umesto command jer framework `command: {id, ...input}` oblik KOLIDIRA kad se input polje zove `id` — kandidat za framework razgovor.
- Explorer shortcuts izvor: lep prikaz tastera (⌘ K), dedupe meta/ctrl varijanti po imenu.

## Workflows app modovi

- Site (id front, default) i Server (id back) — front/addons/workspaces/items/modes/workflows/{front,back}.js + workflows-modes-bar layout item (bar.js na istom mestu). Modes bar layout item ide PO APP-u.

## Otvoreno / plan

- Sledeće dogovoreno: notifications + queue/runs panel (workflows.done već emituje), pa context menu, clipboard, permissions srž, trash; schedules i bugs framework moduli takođe na listi za uključivanje; history/versioning NA KRAJU (komplikovan).
- Webflow/Framer import: dogovoreno da je izvodljivo i strateški bitno — CMS preko API-ja (lako), struktura crawl + AI segmentacija kao WORKFLOW (back već ima crawl/html komande), 70-90% vernost realna.
- Trening pipeline: noćni skupljač bench tragova → LoRA workflow-next/tasks/assistant.
- Pravi builder data sloj (stranice/sekcije kao entiteti sa komandama) — najveća rupa između demo-a i proizvoda.
