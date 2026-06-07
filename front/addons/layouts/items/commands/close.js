commands.Item({
	id: 'layouts:close',
	exposed: true,
	description: 'Close layout items by id or app',
	metadata: { addon: 'layouts' },
	in: {
		id: {
			type: 'string|number',
			required: false,
			default: null,
			description: 'A single layout item ID'
		},
		app: {
			type: 'string',
			required: false,
			default: null,
			description: 'All items registered for this app'
		},
		mode: {
			type: 'string',
			required: false,
			default: null,
			description: 'All items registered for this mode'
		}
	},
	out: {
		ids: ['array']
	},
	callback: function(properties, resolve)
	{
		const ids = [];

		Object.values(layouts.Items()).forEach((item) =>
		{
			if(properties.id && item.Get('id') !== properties.id)
			{
				return;
			}

			if(properties.app && !item.Get('app').includes(properties.app))
			{
				return;
			}

			if(properties.mode && !item.Get('mode').includes(properties.mode))
			{
				return;
			}

			item.Set('active', false);
			ids.push(item.Get('id'));
		});

		layouts.Fn('persist');

		onetype.Emit('layouts.close', ids);

		resolve({ ids });
	}
});
