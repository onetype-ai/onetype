# CSS Craft — Premium Builder Design

Ovaj fajl je trajni standard za dizajn u OneTypeu. Cilj: **najjači builder ikad, premium nivo, fokus na detalje.** Linear/Figma/Vercel klasa. Svaki piksel namerno.

Pre svakog CSS-a pročitaj ovo. Pravi se kao da Linear tim radi review.

---

## 0. Filozofija

- **Wow kroz minimalizam.** Mir > gustina. Mnogo praznog prostora, tanke linije, suptilna dubina.
- **Restraint.** Manje boje, manje efekata, više preciznosti. Premium se vidi u tome šta NISI stavio.
- **Detalji su proizvod.** Hover, focus, active, disabled, empty, loading — svako stanje je dizajnirano, nijedno default.
- **Namerno poravnanje.** Svaki element se poravnava na grid, baseline ili ivicu. Ako izgleda nasumično, jeste greška.
- **Optička korekcija pre geometrije.** Kad oko vidi drugačije od matematike, pomeri ±1px za oko (ikone u krugu, glyph centriranje).

---

## 1. Dubina (depth) — BEZ box-shadow u UI-ju

Naš sistem je tamni. U tami senke slabo rade; dubina ide kroz **boju, border i glass**, ne kroz shadow. Tokeni `--ot-shadow-*` postoje ali se u shell/editor UI-ju NE koriste (samo eventualno za floating na svetlim površinama).

**Strategija slojevitosti (commit na jednu):** mi koristimo **surface-color shift + 1px border.**
- `--ot-bg-1` (najdublje, body) → `--ot-bg-2` (paneli) → `--ot-bg-3` (ugnježdeno) → `--ot-bg-4` (inputi). Po par % svetlosti razlike — jedva vidljivo, ali se hijerarhija slaže.
- Svaki nivo ima `-border` (1px) za jasnu ivicu. `border: 1px solid var(--ot-bg-{n}-border)`.
- Elevaciju nagoveštavaš, ne objavljuješ. Single-pixel border + minimalan surface shift = premium.

**Glass (floating/overlay):** `*-opacity` bg + `backdrop-filter: var(--ot-blur)`. NIKAD box-shadow. To je naš znak za "lebdi iznad".

**Ako baš treba senka** (npr. dropdown na svetloj slici): slojevita, 3–5 slojeva, eksponencijalni offset (1/2/4/8/16px), opacity 0.075–0.3 po sloju, vertikalni offset = 2× horizontalni (konzistentan izvor svetla), tintovana ka hue pozadine — nikad čisto crna. Ali to je izuzetak, ne pravilo.

---

## 2. Active state (naš potpis)

- Pozadina: `--ot-brand-opacity` (12% brand). Boja teksta/ikone: `--ot-brand`. NIKAD pun brand background.
- Ikona se popuni: `font-variation-settings: 'FILL' 1, 'wght' 400` (override globalnog `wght 300`).
- Indikator raste iz 0 (npr. bočna crtica `height: 0 → 50%` na transition), ne pojavljuje se naglo.
- Hover ≠ active. Hover je suptilan `-hover` bg + `--ot-text-1`. Active je brand.

---

## 3. Tranzicije i animacija

- **NIKAD `transition: all`.** Uvek nabroji property: `transition: background var(--ot-transition), color var(--ot-transition), transform var(--ot-transition)`.
- Animiraj samo `transform` i `opacity` (GPU). Izbegavaj animiranje `width/height/top/left` (layout thrash).
- Tajming: `--ot-transition-fast` (120ms) za hover; `--ot-transition` (180ms) za state; `--ot-transition-slow` (280ms) za veće prelaze. Svi su `cubic-bezier(0.4, 0, 0.2, 1)`.
- Suptilno. Indikator raste iz 0. `:active { transform: scale(0.94); transition-duration: 100ms; }` daje "klik" osećaj.
- Animacija je prekidiva i reaguje na korisnika — bez autoplay. Poštuj `prefers-reduced-motion`.

---

## 4. Stanja (svako je dizajnirano)

- **Hover:** veći kontrast od mirovanja. `-hover` bg + `text-1`.
- **Focus:** `:focus-visible` daje vidljiv ring (`outline: 2px solid var(--ot-brand); outline-offset: 2px`). Miš-focus bez ringa. Grupisane kontrole → `:focus-within`.
- **Active/pressed:** `scale(0.94)` ili inset.
- **Disabled:** ne disejbluj submit preventivno — pusti validaciju da iskoči. Vizuelno: `text-3` + smanjen opacity, `cursor: not-allowed`.
- **Loading:** spinner uz zadržan original label (dugme ne menja širinu).
- **Empty:** dizajniran prazan state (ikona + poruka + akcija), nikad gola praznina.

---

## 5. Hit targets i pointer

- Min hit target: 24px desktop, 44px mobile. Vizuelno manje od 24px → proširi klik zonu (padding/pseudo).
- Sve što izgleda interaktivno MORA biti interaktivno. Nema mrtvih zona. `cursor: pointer` na sve klikabilno (posebno `<div>` koji nije `<a>`/`<button>`).
- `touch-action: manipulation` da nema double-tap zoom.

---

## 6. Tipografija

- Tabularni brojevi za podatke/poređenja: `font-variant-numeric: tabular-nums`.
- Pravi tri-tačka `…`, ne `...`. Kovrdžavi navodnici gde ima teksta.
- Bez udovica/siročića u dužem tekstu; `&nbsp;` lepi jedinice (`10&nbsp;MB`).
- Headings: `--ot-font-secondary`, weight 500, `letter-spacing: -0.02em`, `line-height: 1.1`. Body 13px (`--ot-size-m`), line-height 1.5.

---

## 7. Border radius — koncentričnost

- Ugnježdeni radius ≤ roditeljev. Dete uvek manje zaobljeno (ili `parent - padding`). Koncentrično poravnati centri lukova.
- Skala: `--ot-radius-s/m/l` = 4/8/12. Krug = `100px`/`50%` za badge/avatar.

---

## 8. Boja

- Samo `--ot-*` tokeni. NIKAD hardkodovane boje/spacing/senke.
- 5 akcija: `--ot-brand` (coral, primarna akcija), `--ot-blue` (info), `--ot-red` (greška), `--ot-orange` (upozorenje), `--ot-green` (uspeh). Svaka ima `-border/-opacity(12%)/-hover`.
- Na obojenoj pozadini, tintuj border/tekst/senku ka istom hue-u (konzistentnost).
- Za dinamičke varijacije razmisli o `color-mix(in oklch, ...)` umesto ručnih vrednosti — perceptivno ujednačeno.

---

## 9. Moderni CSS arsenal (koristi kad pojednostavljuje)

- `:has()` — roditelj reaguje na dete (npr. panel sa aktivnim itemom) bez JS-a.
- Container queries — komponenta se prilagođava svom kontejneru, ne viewport-u. Za builder elemente koji žive u raznim zonama je idealno.
- `color-mix()` / `oklch()` — derivacija hover/disabled boja, perceptivno ujednačen sjaj.
- `content-visibility: auto` / virtualizacija za duge liste (canvas, layeri).
- Gradient/conic border preko pseudo-elementa + `@property` — samo za namerne akcente (npr. AI/premium oznaka), ne svuda.
- `env()` safe-area za notch.

---

## 10. Element CSS konvencije (naše)

- Scoped pod hash: `.e-{GenerateHash('elements-' + id)}`. Render wrapper `w-{hash}` ima `display: contents`.
- Root `.e-{hash}`, glavni wrapper `.box`. Ugnježdeni isti elementi → `>` child selektori da CSS ne curi kroz nivoe.
- Stil na `<e->` wrapperu ide preko `#style` (jer `display: contents`); na običnom divu običan `style`.
- Allman braces, tabovi. JSON config takođe Allman (svaki property u svom redu kad se gnezdi).

---

## 11. Performanse

- Mutacije/CRUD odgovaraju <500ms; UI optimistički menja pa reconcile.
- Eksplicitne dimenzije za slike (rezerviši prostor, bez layout shift).
- Pusti browser da radi layout (flex/grid), ne JS merenje.
- Preload kritičnih fontova; subset preko `unicode-range`.

---

## Checklist pre nego što kažem "gotovo"

1. Svako interaktivno stanje (hover/focus/active/disabled) dizajnirano?
2. `transition` nabraja property-je (ne `all`), animira samo transform/opacity?
3. Dubina kroz boju/border/glass, bez box-shadow?
4. Active = brand-opacity bg + brand boja + FILL 1 ikona?
5. Samo `--ot-*` tokeni, ništa hardkodovano?
6. Radius koncentričan (dete ≤ roditelj)?
7. `cursor: pointer` na sve klikabilno, hit target ≥ 24px?
8. focus-visible ring postoji, miš-focus čist?
9. Poravnanje namerno (grid/baseline/ivica), optička korekcija gde treba?

---

Izvori (jun 2026): [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines), [Mantlr — How Stripe/Linear/Vercel ship premium UI](https://mantlr.com/blog/stripe-linear-vercel-premium-ui), [Josh W. Comeau — Designing Shadows](https://www.joshwcomeau.com/css/designing-shadows/), [CSS in 2026 techniques](https://dev.to/armorbreak/css-in-2026-modern-techniques-you-might-not-know-2026-1lf7). Linear "Details Matter" (jan 2026).
