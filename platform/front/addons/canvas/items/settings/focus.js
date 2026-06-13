onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'canvas.focus',
		label: 'Canvas focus',
		default: null,
		metadata: { addon: 'canvas' },
		description: 'Focused canvas item and the camera to fly back to when focus ends.'
	});
});
