onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'canvas.state',
		label: 'Canvas state',
		default: {},
		metadata: { addon: 'canvas' },
		description: 'Persisted item positions on the canvas, keyed by item id.'
	});
});
