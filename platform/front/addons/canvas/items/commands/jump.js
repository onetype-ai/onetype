commands.Item({
	id: 'canvas:jump',
	exposed: true,
	description: 'Fly the camera to one canvas item and center it in the viewport. The item only gets centered, nothing is focused, use canvas:focus to enter an item.',
	metadata: { addon: 'canvas' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the canvas item to center on.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the centered item.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = canvas.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Canvas item ' + properties.id + ' does not exist.', 404);
		}

		if(!item.Fn('visible'))
		{
			return resolve(null, 'Canvas item ' + properties.id + ' is hidden in the current app and mode.', 400);
		}

		const placed = (canvas.StoreGet('placed') || []).find((entry) => entry.id === properties.id) || {
			x: item.Get('x'),
			y: item.Get('y'),
			width: item.Get('width'),
			height: item.Get('height')
		};

		const viewport = canvas.StoreGet('viewport') || { width: 1200, height: 800 };
		const camera = settings.Fn('get', 'canvas.camera', { x: 0, y: 0, z: 1 });
		const level = Math.min(2, Math.max(1, camera.z));

		settings.Fn('set', 'canvas.camera', {
			x: viewport.width / 2 - (placed.x + placed.width / 2) * level,
			y: viewport.height / 2 - (placed.y + placed.height / 2) * level,
			z: level
		});

		onetype.Emit('canvas.jump', { id: properties.id });

		resolve({ id: properties.id }, 'Canvas jumped to item ' + properties.id + '.');
	}
});
