commands.Item({
	id: 'canvas:reset',
	exposed: true,
	description: 'Reset the canvas camera to the origin at 100 percent zoom. Ends focus if an item was focused.',
	metadata: { addon: 'canvas' },
	out: {
		level: {
			type: 'number',
			description: 'Zoom level after the reset, always 1.'
		}
	},
	callback: function(properties, resolve)
	{
		const released = canvas.Fn('release');

		settings.Fn('set', 'canvas.camera', { x: 0, y: 0, z: 1 });

		resolve({ level: 1 }, 'Canvas camera reset.' + (released ? ' Item ' + released + ' lost focus.' : ''));
	}
});
