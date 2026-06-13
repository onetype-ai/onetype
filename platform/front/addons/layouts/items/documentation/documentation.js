onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'layouts',
		order: 3,
		group: 'Global',
		icon: 'space_dashboard',
		label: 'Layouts',
		addon: 'layouts',
		title: 'Layouts',
		description: 'The workspace shell. Slots and zones that everything renders into.',
		overview: `
## Layouts

Layouts are the shell of the workspace. The e-layout element renders five slots, top, left, center, right and bottom, and anything can drop a render into any of them. The whole editor is assembled this way, the rail, the sidebar, the canvas, the panels, all of it is just layout items.

Register an item from anywhere:

\`\`\`js
onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'my-sidebar',
		app: ['builder'],
		slot: 'left',
		render: '<e-my-sidebar></e-my-sidebar>'
	});
});
\`\`\`

### Open and close

Items start closed. Opening and closing goes through commands, never by touching the item directly:

\`\`\`js
$ot.command('layouts:open', { id: 'my-sidebar' });
$ot.command('layouts:close', { app: 'builder' });
\`\`\`

Both accept an id for a single item, or app and mode to hit a whole group. They emit layouts.open and layouts.close with the ids that actually changed, items already in the right state are skipped. The open state survives reloads, it is persisted per item in settings under layouts.state and restored on boot.

layouts:toggle flips a single item by id, or sets it explicitly through the open input, and rides the same open and close machinery. Use it for buttons that show and hide a panel.

### Visibility

An item renders when all of it holds: it is active, its app list is empty or includes the active app, its mode list is empty or includes the active mode of that app, and its zone matches the layout instance. So a panel can be open in Design mode of the builder and gone everywhere else without anyone closing it.

### Passing data

A render usually needs input. Declare the props as a config schema on the item, pass values through the open command, the render reads them as plain properties on this:

\`\`\`js
layouts.Item({
	id: 'inspector',
	slot: 'right',
	config: { element: { type: 'string', value: '' } },
	render: function()
	{
		return '<span>{{ element }}</span>';
	}
});

$ot.command('layouts:open', { id: 'inspector', data: { element: 'hero' } });
\`\`\`

The same panel shows different content depending on what opened it. This replaces routing, there are no routes in the editor, just commands opening layouts with data.

### Zones

One layout instance is one zone, root by default. A layout item can itself render another e-layout with its own zone name, and items target it through their zone field. That is how a workspace within the shell gets its own five slots.
		`.trim()
	});
});
