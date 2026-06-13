onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'navbar',
		order: 6,
		group: 'Global',
		icon: 'toolbar',
		label: 'Navbar',
		addon: 'navbar',
		title: 'Navbar',
		description: 'The top bar of the editor. Three areas, left, center and right, filled entirely by addon items.',
		overview: `
## Navbar

The navbar is the horizontal bar at the top of the editor. It has three areas, left, center and right. Everything in it is an addon item, including our own buttons, so your plugin places content into the bar with the same API we use ourselves.

Register an item from anywhere:

\`\`\`js
onetype.AddonReady('navbar', (navbar) =>
{
	navbar.Item({
		id: 'preview',
		position: 'right',
		icon: 'visibility',
		label: 'Preview',
		onClick: () => $ot.command('preview:open')
	});
});
\`\`\`

Give it an icon, a label, or both. For icon only items set a tooltip so people still know what they are looking at. Items inside an area are sorted by order.

### Types

The type field decides how an item behaves. Pass a string for the defaults, or an object with id and options when you want to customize the surface.

**default** is a button. It draws the standard pill and fires onClick. If you give it a render instead of icon and label, the button chrome is skipped and your markup goes straight into the bar, see custom renders below.

**dropdown** keeps the button look, but render becomes a panel that opens anchored under the trigger and follows it. Use it for menus and quick settings.

**popup** keeps the button too, but render opens as a centered modal with a backdrop. Use it when the content needs room.

**panel** opens render inside a chrome panel through $ot.float.panel: header with title, description and close, scrollable body, backdrop. The options object is passed straight to the panel, so position center, right, left, bottom or top, width, actions, everything the float panel supports. Your render stays pure content, the chrome is on the house.

\`\`\`js
navbar.Item({
	id: 'shortcuts',
	position: 'right',
	icon: 'keyboard',
	tooltip: 'Shortcuts',
	type: { id: 'panel', title: 'Shortcuts', position: 'right' },
	render: () => '<e-shortcuts-panel></e-shortcuts-panel>'
});
\`\`\`

Notice that render means something different per type. Inline content for default, the anchored panel for dropdown, the modal for popup, the panel body for panel. The float layer underneath is handled by the navbar, you never touch it.

### Custom renders

A default item with a render owns its spot in the bar. Every wrapper between the bar and your markup is flattened out, so your root element sits directly in the flex row and stretches to the full navbar height by default. Size the inside however you want, a logo, a search field, a whole tab strip. The workspace tabs in the center are exactly this, one navbar item with a render.

If your content should be smaller than the bar, give your root its own height and add margin-block auto to keep it vertically centered:

\`\`\`html
<div style="height: 28px; margin-block: auto;">...</div>
\`\`\`

### Passing data to a render

When a render needs input, declare its props as a config schema and pass the values through data. The render reads them as plain properties on this, never through a data object.

\`\`\`js
navbar.Item({
	id: 'status',
	position: 'right',
	config: { state: { type: 'string', value: 'idle' } },
	data: { state: 'publishing' },
	render: function()
	{
		return '<span>{{ state }}</span>';
	}
});
\`\`\`

### Visibility

Three fields decide when an item is shown. active turns it off entirely. app lists the app ids the item belongs to, an empty list means every app. mode does the same against the active mode of the current app. The bar re-evaluates on every app and mode switch, so each app brings its own navbar without any extra wiring.

### Runtime behavior

The bar watches its items. Adding or removing one updates it immediately, and so does changing a field. Toggling the active pill is just:

\`\`\`js
navbar.ItemGet('preview').Set('selected', true);
\`\`\`

When an item with a render is removed, its registered render is cleaned up with it.
		`.trim()
	});
});
