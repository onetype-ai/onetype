onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'canvas.camera',
		label: 'Canvas camera',
		default: { x: 0, y: 0, z: 1 },
		metadata: { addon: 'canvas' },
		description: 'Persisted camera position and zoom of the canvas.'
	});
});
