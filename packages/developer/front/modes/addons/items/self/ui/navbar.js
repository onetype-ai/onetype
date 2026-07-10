developer.addons.Item({
	id: 'ui.navbar',
	group: 'ui',
	name: 'Navbar',
	description: 'The top toolbar with left, center and right zones, buttons, dropdowns and drawers.',
	content: [
		'## What it does',
		'',
		'Navbar items compose the top bar. An item picks a zone, renders as a button, separator or custom node, and can open a floating surface on click.',
		'',
		'## Item essentials',
		'',
		'- `position` — `left`, `center` or `right` zone',
		'- `popup` — dropdown anchored to the button, or a drawer through the float system',
		'- `render` — inline content instead of the default button',
		'- `badge`, `tooltip`, `active` — button chrome',
		'',
		'## Commands',
		'',
		'| Command | What it does |',
		'| --- | --- |',
		'| `ui:navbar:open` | Opens the popup of an item by id |',
		'| `ui:navbar:close` | Closes it |'
	].join('\n')
});
