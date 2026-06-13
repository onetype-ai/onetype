commands.Item({
	id: 'layouts:close',
	exposed: true,
	description: 'Close layout items by id, app or mode. Persists the state and emits layouts.close with the ids that actually closed. Items that are already closed are left alone.',
	metadata: { addon: 'layouts' },
	in: {
		id: {
			type: 'string',
			description: 'A single layout item ID.'
		},
		app: {
			type: 'string',
			description: 'Close all items registered for this app.'
		},
		mode: {
			type: 'string',
			description: 'Close all items registered for this mode.'
		}
	},
	out: {
		ids: {
			type: 'array',
			each: { type: 'string' },
			description: 'IDs of the items that actually closed.'
		}
	},
	callback: function(properties, resolve)
	{
		const matched = [];
		const changed = [];

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

			matched.push(item.Get('id'));

			if(item.Get('active'))
			{
				item.Set('active', false);
				changed.push(item.Get('id'));
			}
		});

		if(properties.id && !matched.length)
		{
			return resolve(null, 'Layout item ' + properties.id + ' not found.', 404);
		}

		if(!matched.length)
		{
			return resolve({ ids: [] }, 'No layout items matched.');
		}

		if(!changed.length)
		{
			return resolve({ ids: [] }, 'Layout ' + matched.join(', ') + ' already closed.');
		}

		layouts.Fn('persist');

		onetype.Emit('layouts.close', { ids: changed });

		resolve({ ids: changed }, 'Layout ' + changed.join(', ') + ' closed.');
	}
});
