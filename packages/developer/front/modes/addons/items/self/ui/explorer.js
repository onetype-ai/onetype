developer.addons.Item({
	id: 'ui.explorer',
	group: 'ui',
	name: 'Explorer',
	description: 'The command palette. Searchable actions with shortcuts, opened with Cmd K.',
	content: [
		'## What it does',
		'',
		'Explorer is the palette every action plugs into. Entries register with a name, icon and keywords, the user opens the palette, types, and runs the entry — from anywhere in the workspace.',
		'',
		'## Item essentials',
		'',
		'- `name` and `keywords` — what the search matches',
		'- `run` — the callback executed on pick',
		'- `condition` — entries follow the active app and mode',
		'',
		'## Commands',
		'',
		'| Command | What it does |',
		'| --- | --- |',
		'| `ui:explorer:open` | Opens the palette |',
		'| `ui:explorer:close` | Closes it |',
		'| `ui:explorer:toggle` | The Cmd K binding |',
		'| `ui:explorer:run` | Executes an entry by id |'
	].join('\n')
});
