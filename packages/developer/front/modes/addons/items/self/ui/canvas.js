developer.addons.Item({
	id: 'ui.canvas',
	group: 'ui',
	name: 'Canvas',
	description: 'The infinite workspace surface with pannable, zoomable, arrangeable frames.',
	content: [
		'## What it does',
		'',
		'Canvas hosts free floating frames on an infinite surface. The user pans and zooms, frames can be focused, linked and arranged, and the whole state persists between sessions.',
		'',
		'## Functions',
		'',
		'- `fit` — zoom to show every frame',
		'- `focus` / `jump` — center one frame',
		'- `move`, `link`, `pulse`, `reset` — spatial toolkit',
		'- `arrange` — the AI tidier agent lays frames out',
		'',
		'## State',
		'',
		'Zoom and position live in `modules.settings`, so the canvas restores exactly where it was left.'
	].join('\n')
});
