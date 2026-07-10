developer.addons.Item({
	id: 'ui.dashboard',
	group: 'ui',
	name: 'Dashboard',
	description: 'Widget dashboard system: sections group widgets, widgets pick a type and feed it a payload.',
	content: [
		'## What it does',
		'',
		'Dashboard turns items into overview screens. Sections define the rows, widgets register into a section, pick a type and pass a payload. Types delegate to the global element library, rendered bare inside the widget frame.',
		'',
		'## Registries',
		'',
		'- `ui.dashboard.sections` — row groups with a title and order',
		'- `ui.dashboard` — the widgets, each with `section`, `type`, `payload`, `size` and `color`',
		'',
		'## Types',
		'',
		'`line`, `bar`, `donut` and `gauge` map to the chart elements, `timeline`, `list`, `status` and `table` to the data elements, `actions` composes action cards. `numbers` and `progress` render their own layout.',
		'',
		'```js',
		'ui.dashboard.Item({',
		'	section: \'traffic\',',
		'	type: \'line\',',
		'	payload: { series: [...] }',
		'});',
		'```'
	].join('\n')
});
