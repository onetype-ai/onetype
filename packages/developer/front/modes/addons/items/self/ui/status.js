developer.addons.Item({
	id: 'ui.status',
	group: 'ui',
	name: 'Status',
	description: 'The status bar at the bottom of the shell, small indicators and toggles left and right.',
	content: [
		'## What it does',
		'',
		'Status is the quiet strip at the bottom. Items are compact indicators — the terminal toggle, sync state, environment info — aligned to the left or right side.',
		'',
		'## Item essentials',
		'',
		'- `side` — left or right group',
		'- `render` or `icon` + `name` — how the item shows',
		'- `onClick` — toggles and quick actions',
		'- `condition` — packages surface their own state here'
	].join('\n')
});
