developer.addons.Item({
	id: 'ui.dock',
	group: 'ui',
	name: 'Dock',
	description: 'The slim icon rail on the left edge, with separators, badges, tooltips and floating side panels.',
	content: [
		'## What it does',
		'',
		'Dock items live on the left rail, top or bottom. An item is an icon with a tooltip and badge, and it can carry a `render` — then opening it slides out a floating, resizable side panel.',
		'',
		'## Item essentials',
		'',
		'- `placement` — `top` or `bottom` end of the rail',
		'- `badge` — dot, count or short label on the icon',
		'- `render` — panel content, string or function',
		'- `condition` — when the item shows at all',
		'',
		'## Commands',
		'',
		'| Command | What it does |',
		'| --- | --- |',
		'| `ui:dock:open` | Opens the panel of an item by id |',
		'| `ui:dock:close` | Closes the open panel |'
	].join('\n')
});
