commands.Item({
	id: 'canvas:blur',
	exposed: true,
	description: 'End canvas focus and fly the camera back to the view it had before the item was focused.',
	metadata: { addon: 'canvas' },
	out: {
		id: {
			type: 'string',
			description: 'ID of the item that lost focus.'
		}
	},
	callback: function(properties, resolve)
	{
		const focused = settings.Fn('get', 'canvas.focus', null);

		if(!focused)
		{
			return resolve(null, 'Canvas has no focused item.', 400);
		}

		settings.Fn('set', 'canvas.focus', null);
		settings.Fn('set', 'canvas.camera', { ...focused.back });

		onetype.Emit('canvas.blur', { id: focused.id });

		resolve({ id: focused.id }, 'Canvas item ' + focused.id + ' is no longer focused, view restored.');
	}
});
