onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'apps',
		order: 1,
		group: 'Global',
		icon: 'apps',
		label: 'Apps',
		addon: 'apps',
		title: 'Apps',
		description: 'Top-level products on the workspace rail.',
		overview: `
## Apps

Apps are the top level products of the workspace, like Builder, Forms, Bridge or Collections. Each one registers itself on the left rail as a launcher.

An app is just an addon item. Register one from anywhere:

\`\`\`js
onetype.AddonReady('apps', (apps) =>
{
	apps.Item({
		id: 'forms',
		order: 4,
		icon: 'list_alt',
		label: 'Forms'
	});
});
\`\`\`

### How it works

Apps render as icons on the rail, split into top and bottom groups through the position field. Clicking an icon runs the apps:switch command, which stores the new app in settings under apps.active so it survives reloads, then emits apps.switch with the new app id. Switching to the app that is already active does nothing, no events, no re-renders.

Layout items, navbar items and status tabs all filter by the active app, so each app brings its own panels and tools. There is no privileged code, anything we ship a third party can register the same way.

### Lifecycle

An app can react to being opened and closed. onOpen runs when the app becomes active, onClose runs when another app takes over. Both receive the app item. Use them to prepare or tear down whatever the app needs, the hooks run before the UI re-renders, so anything you register in onOpen is already there when the app draws.

\`\`\`js
apps.Item({
	id: 'forms',
	icon: 'list_alt',
	label: 'Forms',
	onOpen: (item) => console.log('forms opened'),
	onClose: (item) => console.log('forms closed')
});
\`\`\`
		`.trim()
	});
});
