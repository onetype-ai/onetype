onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'modes',
		order: 4,
		group: 'Global',
		icon: 'tune',
		label: 'Modes',
		addon: 'modes',
		title: 'Modes',
		description: 'The working modes of an app, one active at a time.',
		overview: `
## Modes

Modes are the different ways you work inside an app. The builder ships with Design for building and styling, Content for text and images, Responsive for breakpoints, Preview for a clean look and AI for talking to the site. Only one mode is active at a time, per app.

A mode is just an addon item. It belongs to exactly one app and shows up in that app's modes bar:

\`\`\`js
onetype.AddonReady('modes', (modes) =>
{
	modes.Item({
		id: 'design',
		app: 'builder',
		order: 1,
		default: true,
		icon: 'space_dashboard',
		label: 'Design'
	});
});
\`\`\`

Mark one mode per app as default, that is where the app starts before anything is saved.

### Switching

Switch with the command:

\`\`\`js
$ot.command('modes:switch', { id: 'content' });
\`\`\`

The command deactivates the current mode of the same app, saves the new one and emits modes.switch with the mode and app id. Switching to the already active mode does nothing. The active mode is stored per app in settings under modes.active, so every app remembers where you left it, even across reloads.

### Lifecycle

A mode can react to being entered and left. onActivate runs when the mode becomes active, onDeactivate runs when another mode of the same app takes over. Both receive the mode item. The hooks run before the UI re-renders, so anything you set up in onActivate is already in place when the workspace draws.

### Why it matters

Layout items and navbar items can target a mode the same way they target an app. An item with mode set to design only shows in Design mode. Combined with the active app, this decides what the whole workspace shows at any moment.
		`.trim()
	});
});
