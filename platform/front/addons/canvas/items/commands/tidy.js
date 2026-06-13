commands.Item({
	id: 'canvas:tidy',
	exposed: true,
	description: 'Arrange every visible canvas item into a clean layout. The tidier agent lays the cards out by their names, groups and links, the mesh algorithm takes over when the agent fails. The camera fits the result. Ends focus if an item was focused.',
	metadata: { addon: 'canvas' },
	out: {
		ids: {
			type: 'array',
			each: { type: 'string' },
			description: 'IDs of the items that were arranged.'
		},
		level: {
			type: 'number',
			description: 'Zoom level after the camera fit the tidied layout.'
		}
	},
	callback: async function(properties, resolve)
	{
		const items = canvas.Fn('list');

		if(!items.length)
		{
			return resolve(null, 'Canvas has no items to tidy.', 400);
		}

		const released = canvas.Fn('release');
		const { positions, source } = await canvas.Fn('arrange', items);
		const ids = Object.keys(positions);

		ids.forEach((id) =>
		{
			const item = canvas.ItemGet(id);

			item.Set('x', positions[id].x, false);
			item.Set('y', positions[id].y, false);
		});

		canvas.Fn('persist');

		onetype.Emit('canvas.tidy', { ids });
		onetype.Emit('canvas.move', { ids });

		const level = canvas.Fn('frame', items.map((item) => ({ ...item, ...positions[item.id] })));

		resolve({ ids, level }, 'Canvas tidied by the ' + (source === 'agent' ? 'tidier agent' : 'mesh fallback') + ', ' + ids.length + ' items arranged.' + (released ? ' Item ' + released + ' lost focus.' : ''));
	}
});
