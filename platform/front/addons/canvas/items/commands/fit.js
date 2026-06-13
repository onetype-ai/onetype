commands.Item({
	id: 'canvas:fit',
	exposed: true,
	description: 'Fit every visible canvas item into the viewport, centering the layout and adjusting the zoom. Ends focus if an item was focused.',
	metadata: { addon: 'canvas' },
	out: {
		level: {
			type: 'number',
			description: 'Zoom level after the fit.'
		}
	},
	callback: function(properties, resolve)
	{
		const items = canvas.Fn('list');

		if(!items.length)
		{
			return resolve(null, 'Canvas has no items to fit.', 400);
		}

		const released = canvas.Fn('release');
		const level = canvas.Fn('frame', items);

		resolve({ level }, 'Canvas fit to ' + items.length + ' items at ' + Math.round(level * 100) + ' percent.' + (released ? ' Item ' + released + ' lost focus.' : ''));
	}
});
