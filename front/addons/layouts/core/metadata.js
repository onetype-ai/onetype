layouts.Metadata('title', 'Layouts');
layouts.Metadata('description', 'The workspace shell, slots and zones that everything renders into.');
layouts.Metadata('overview', `
## Layouts

Layouts are the shell of the workspace. The \`<e-layout>\` element renders five slots, top, left, center, right and bottom, and anything can drop a render into any slot.

A layout item is registered from anywhere:

\`\`\`js
onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'my-sidebar',
		app: ['builder'],
		zone: 'root',
		slot: 'left',
		render: '<e-my-sidebar></e-my-sidebar>'
	});
});
\`\`\`

### Filtering

An item shows only when all of these match:

- **active** is true (open it with the layouts:open command, close it with layouts:close).
- **app** is empty or includes the active app from settings.
- **mode** is empty or includes the active mode from settings.
- **zone** matches the layout instance it belongs to (root by default). Nest \`<e-layout zone="...">\` for sub shells.

### Passing data

The open command can pass a data object to an item. The render reads it from this.data, so the same panel can show different content depending on what opened it. No routes needed.

This is how the whole editor is assembled. The rail, sidebar, canvas, panels, all just layout items dropped into slots.
`.trim());
