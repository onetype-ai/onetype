onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'shortcuts',
		order: 10,
		group: 'Global',
		icon: 'keyboard',
		label: 'Shortcuts',
		addon: 'shortcuts',
		title: 'Shortcuts',
		description: 'Keyboard shortcuts that run callbacks, scoped by app and mode, rebindable.',
		overview: `
## Shortcuts

Shortcuts map key combinations to behavior. The addon listens for keydown globally, finds every shortcut whose combination matches the pressed keys, checks that each one applies right now, and runs its callback.

A shortcut is an addon item. Register one from anywhere:

\`\`\`js
onetype.AddonReady('shortcuts', (shortcuts) =>
{
	shortcuts.Item({
		id: 'explorer-open',
		name: 'Open Explorer',
		group: 'Explorer',
		description: 'Opens the universal search.',
		key: 'meta+k',
		callback: () => $ot.command('explorer:open')
	});
});
\`\`\`

### Keys

The key field is modifier names and the final key joined with +, like meta+k, ctrl+shift+p or alt+1. Modifiers are ctrl, alt, shift and meta. The final key is whatever the keyboard event reports, lowercased. A combination has to end with a real key, modifiers alone are not valid.

### Matching

On every keydown the addon parses the pressed combination, collects the shortcuts whose key matches and runs them sorted by order, lower first. Before firing, every candidate has to pass item.Fn(active):

- enabled has to be true
- app, when set, has to include the active app. Empty means every app.
- mode, when set, has to include the active mode of the active app. Empty means every mode.
- condition, when set, receives the keyboard event and has to return true

The app and mode filters work exactly like on layout and navbar items, so a shortcut scopes itself the same way every other extension point does. When a shortcut fires, prevent controls preventDefault on the event, on by default.

While focus sits in an input, textarea, select or contenteditable element, combinations without ctrl, alt or meta never fire, so typing stays typing. Modifier combinations keep working everywhere.

### Trigger

The callback is the only thing a shortcut runs. The shortcuts:trigger command runs one from anywhere: it emits shortcuts.trigger with the id and key, awaits the callback and resolves with the usual message and code. Unknown id resolves 404, disabled 403, a throwing callback 500. The keydown handler runs the same command, so every shortcut press is a regular action like any other.

### Enable and disable

The shortcuts:toggle command flips a shortcut, or sets it explicitly through the enabled input. It persists the state, emits shortcuts.toggle on change and does nothing when the state already matches. Disabled shortcuts never fire, are skipped by search, and stay disabled after a reload.

### Rebinding

Anyone can replace a key with their own. The shortcuts:rebind command validates the new combination, stores it and emits shortcuts.rebind. Calling rebind without a key restores the default combination and drops the override.

The item always keeps what the code registered, user changes never touch it. Custom keys and toggled states live in settings under shortcuts.state, one entry per shortcut, holding only the deviations. The effective values resolve at runtime through item.Fn(key) and item.Fn(enabled), so everything survives reloads with nothing to restore, and rebinding back to the default simply removes the entry.

### Panel

The keyboard icon in the navbar opens the shortcuts panel: every shortcut grouped, with a toggle per row. Click the key chip, press the new combination and it sticks. Escape cancels the recording, the history icon on a row restores its default key.

### Functions

- parse(event) turns a keyboard event into a combination string
- format(key) turns a combination into display form, like ⌘ Shift K
- valid(key) checks that a combination ends with a real key and uses known modifiers
- match(key) returns the items bound to a combination, sorted by order
- list(query) returns groups for the UI, one row per shortcut, optionally filtered
- save(id, changes) writes a deviation entry into shortcuts.state, dropping fields set to undefined and empty entries
- register() and unregister() attach and detach the global keydown listener

Per item: item.Fn(key) and item.Fn(enabled) resolve the effective values, registered defaults plus any stored deviation, and item.Fn(active, event) checks whether the shortcut may fire right now.
		`.trim()
	});
});
