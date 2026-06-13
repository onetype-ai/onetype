onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'status',
		order: 5,
		group: 'Global',
		icon: 'bottom_panel_open',
		label: 'Status',
		addon: 'status',
		title: 'Status',
		description: 'The bottom bar of the editor. Plain segments show state, tabs open a panel through layouts.',
		overview: `
## Status

The status bar is the thin strip at the bottom of the editor. Like the navbar, everything in it is an addon item, your plugin uses the same API we do. Items sit on the left or right side and come in two flavors, depending on whether they have a render.

A plain item is a passive segment, an icon and a label showing some piece of state:

\`\`\`js
onetype.AddonReady('status', (status) =>
{
	status.Item({
		id: 'ready',
		align: 'right',
		icon: 'check_circle',
		label: 'Ready'
	});
});
\`\`\`

Give the item a render and it becomes a tab. All tabs share one panel, a layout item called status-panel in the bottom slot, and the open tab travels through its data, exactly like the documentation content works. One panel, one active tab, clicking another tab swaps the content, clicking the active one closes it. Everything layouts already do, persistence across reloads, commands, the trace in the terminal, applies for free. The terminal is the typical example:

\`\`\`js
status.Item({
	id: 'console',
	align: 'left',
	icon: 'terminal',
	label: 'Console',
	render: function()
	{
		return '<div class="ot-p-m">...</div>';
	}
});
\`\`\`

Open and close it like any layout item, the tab in the bar follows:

\`\`\`js
$ot.command('layouts:open', { id: 'status-panel', data: { tab: 'console' } });
$ot.command('layouts:close', { id: 'status-panel' });
\`\`\`

### Visibility

The usual three fields. active turns the item off, app and mode list where it shows, empty means everywhere. The bar re-evaluates on every app and mode switch, and the panel hides content whose tab is not visible in the current app.

### Runtime behavior

The bar watches its items, adding, removing or changing one updates it immediately. When an item with a render is removed, its registered render is cleaned up too.
		`.trim()
	});
});
