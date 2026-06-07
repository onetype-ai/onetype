commands.Item({
	id: 'layouts:open',
	exposed: true,
	description: 'Open layout items by id or app, optionally passing data',
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
		},
		data: {
			type: 'object',
			required: false,
			default: null,
			description: 'Data passed to the opened item render'
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

			if(properties.data)
			{
				item.Set('data', properties.data);
			}

			item.Set('active', true);
			ids.push(item.Get('id'));
		});

		layouts.Fn('persist');

		onetype.Emit('layouts.open', ids);

		resolve({ ids });
	}
});
