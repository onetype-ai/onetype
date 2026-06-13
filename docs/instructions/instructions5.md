# Instructions 5 — AI sloj: agents, assistants, workflows v2 (agentni)

Nastavak na instructions4 (ako ne postoji, na instructions3). Ogromna sesija: sređen ai.agents, izgrađen assistants addon (persona + memorija + dataset), orchestrators preimenovan u workflows pa REBUILDOVAN u agentni sistem, tidier na canvasu, ultra testovi.

## ai.agents (framework/addons/ai/addons/agents)

- `execute` i `messages` spojeni/presloženi: run vraća UVEK `{content, meta}` (nema više `_meta` u objektu). content = validirani objekat (json) ili string (text format).
- `schema`, `describe`, `messages` su GLOBALNE addon funkcije u `functions/` (prime fields/vrednosti, ne item). `messages(instructions, input, output, format, state, history)` pozicioni.
- run.js: sve u jednom item fn sa `this.methods.tool/payload/execute`. Input validacija STRICT (nepoznata polja 400). Agent bez user poruke dobija `Proceed.` (vLLM odbija system-only).
- Novo polje `state` (object|function) — razrešava se svež po run-u, ide u system kao "Current state:".
- `onSuccess`/`onFail` polja OBRISANA (mrtva). `options` postaje enum za svaki tip, object+config se rekurzivno gradi u JSON šemu.
- data.js (lib/src/mixins): strict sad baca i na POGREŠAN TIP sa defaultom (ranije tiha zamena); defaulti i dalje važe za nedostajuća polja.
- Skriveni system agenti: `condition: () => false` → ne vide ih ni workflow ni assistant liste. VAŽNO PRAVILO: svaki interni agent (tidier!) MORA biti skriven, inače ga planner bira umesto pravog toola (silent no-op bug).

## assistants (front/addons/assistants, bivši assistant)

- Item = ASISTENT: `id, name, messages[{role: user|assistant|error, content}], preferences[]`. Self item `main`.
- Emitteri: `assistants.message/clear/remember/forget`. Item fns: `message, remember, forget, persist, memorize, sample, work`.
- `assistant` agent (persona, skriven): ćaska, NE zna komande. Output `{message, workflow}` — workflow = precizan self-contained goal na engleskom kad korisnik hoće akciju (imena verbatim, preference utkane, jezik sadržaja naveden), null za ćaskanje. State: user/app/mode/layouts/preferences/agents(ime+opis dostupnih)/time. Temperatura 0.4. Pravila: [system] poruke ne diktiraju jezik; van-editor zahtevi (naruči, pošalji...) = uvek nemoguće; announce u budućem vremenu.
- `memory` agent (skriven, ops dizajn): prima preferences + poruku → `{add[], remove[]}`, UVEK engleski. Zove se DETACHED posle svakog odgovora (`memorize`). Testiran vs full-rewrite — ops pouzdaniji.
- Preferences: persist u settings `assistants.preferences` (mapa po asistentu), restore na settings.ready, state ih vraća modelu.
- `assistants:ask {id, prompt}` → assistant agent → ako workflow goal: `item.Fn('work', goal)` → ai.workflows run (steps: 100) → ishod kroz assistant glas ([system] poruka, jezik korisnika) kao novi message + `report` u out.
- `assistants:rate {verdict good|bad, reason}` → uzorak (instructions+state+messages+verdict+reason) download kao JSON = dataset. Corrector NAMERNO izbačen — ispravke offline jačim modelom.
- `assistants:forget {preference|prazno=sve}`, `assistants:clear`.
- Chat element: workflow progress kartica — sluša `workflows.start/plan/task/step/done`, checklist taskova (pending/active/done/failed ikone), current ticker. Rate traka na dnu (reason + 👍👎).

## ai.workflows V2 — AGENTNI (framework/addons/ai/addons/workflows)

STARI sistem (plan svih koraka unapred + loop/each + lint/repair) ZAMENJEN agentnim:

- **workflow-tasks** agent: goal → 2-8 taskova `{id, goal, needs[]}`. Pravila: grupisanje po ishodu (cela stranica = 1 task), bez preklapanja, bez gold-platinga, worker kombinuje više agenata (achievable false samo kad akcija nema agenta).
- **workflow-next** agent: po JEDAN korak — input {goal, task, agents(full šeme), log[]} → `{reasoning, achieved, goal, agent, input, as}`. reasoning PRVI u šemi (model prvo razmisli). Pravila: čitaj log, ne ponavljaj uspešno, posle FAILED menjaj nešto, dugi tekstovi SAMO kroz $ref, verifikuj read agentom pre achieved, bez ekstra posla.
- **Scheduler** (modes/action.js): nezavisni taskovi paralelno (`concurrency` polje, default 3, cap 5), `needs` zavisnosti, dependency-failed → skipped. Po tasku: max 20 iteracija, 3 uzastopne greške = failed, greške (i iz next poziva!) su OPSERVACIJE u logu, ne rušenje. Globalni `steps` limit baca (jedini terminalni throw).
- Task ima SVOJ data scope i log. `as` se normalizuje (skida $). Input unwrap: ceo objekat → istoimeno polje ILI jedino polje. Resolve: $izraz nad task.data (+`data` alias).
- Emitteri: `workflows.start/plan/task/step/done` (task: running/done/failed/skipped — UI mapira direktno).
- summary na kraju (workflow-summary, history input sa punom šemom), state.summary; nedostižno → conclusion.
- run.js: bez gutanja grešaka, status completed samo ako su SVI taskovi done, emit done u oba ishoda.

## Demo agenti (front/addons/assistants/items/agents/demo.js — TEMP)

REALNI: page-creator/updater/lister (lister vraća i seo/sections/form — ZA VERIFIKACIJU), seo-writer+seo-setter, section-designer+section-coder(html+css)+section-adder, form-designer+form-setter, collection-creator, copywriter, translator, canvas-tidy (tool → canvas:tidy komanda). Podaci žive u canvas item `data` (hint/seo/sections/form), kartica renderuje sve. ~25 dummy ostalo za assistant testove (NE-preklapajući sa realnim!).

## canvas tidier

`items/agents/tidier.js` (SKRIVEN) — vraća RED/KOLONU po kartici (ne piksele — 9B ne drži aritmetiku!), `functions/arrange.js` računa geometriju (širina kolone = najšira kartica, 48px gap, snap 24), validira pokrivenost+kolizije slotova, fallback na mesh `tidy`. `canvas:tidy` komanda kaže ko je složio. Flow se čita kao flowchart.

## Benchmark stanje (kraj sesije)

- Assistant odluke: 12/12 + jezik 12/12 (baterija /tmp/assistant-battery.js, 2 uzastopna prolaza).
- Workflows: B1 stranica 3/3, B2 stranica+opis 3/3, B3 tri stranice+tidy paralelno 3/3 (peak 3), B4 recovery (nepostojeća stranica → lister → kreira) 2/2.
- B5 ULTRA (ceo sajt: 4 stranice × seo+sekcije html/css + forma + kolekcija + tidy): NIJE 100% — najbolji run 4/6 taskova, 8 sekcija, kolekcija da; varijansa po runu (5-9 min, 60-80 koraka). 
- Bench harness: /tmp/wf-bench.js (scenariji + ponavljanja + statusi/koraci/logovi).

## Sledeće poluge za ULTRA 100%

1. Task-level RETRY: failed task → jednom ceo ispočetka (svež log) pre konačnog fail.
2. Verifikacija kao HARD GATE u engine-u (ne instrukcija): pre mark done, ako postoji read agent, engine sam pozove i ubaci u log.
3. workflow-next je usko grlo kvaliteta — kandidat za jači model (pipeline `model` param po agentu već postoji u request pipeline-u).
4. Summary kvalitet utiče na report (loš summary = loš goal feedback) — proveriti.
5. Failed workflow state se gubi (work.js Remove) — čuvati poslednji run za debug/UI.

## Test alati

CDP (docs/devtools): cdp.mjs eval, screenshot.mjs [region], Chrome na 9222, editor localhost:3000, vLLM qwen3.5 na 192.168.1.3:8000. NAPOMENA: stare greške se replay-uju u konzoli pri konekciji. Posle izmene framework-a: location.reload() + sleep 4 (server rebuilduje). PAZI: posle `cd` u framework za python edit, vrati se u sites-app pre cdp poziva!
