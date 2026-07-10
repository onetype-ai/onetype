developer.addons.Item({
	id: 'ui.modes',
	group: 'ui',
	name: 'Modes',
	description: 'Modes inside an app, switched from the segmented bar at the bottom of the shell.',
	content: [
		'## What it does',
		'',
		'A mode splits an app into workspaces — the developer app has `elements`, `addons` and `styles`. The bottom bar renders the switcher, layouts filter on the active mode.',
		'',
		'## Item essentials',
		'',
		'- `condition.app` — which app the mode belongs to',
		'- `isDefault` — activates when the app opens',
		'- `order`, `icon`, `name` — how the switcher renders it',
		'',
		'## Commands',
		'',
		'| Command | What it does |',
		'| --- | --- |',
		'| `ui:modes:switch` | Switches the active mode, emits `ui.modes.switch` |',
		'',
		'```js',
		'$ot.ui.modes.switch(\'styles\');',
		'$ot.ui.modes.active(); // the active mode item',
		'```'
	].join('\n')
});
