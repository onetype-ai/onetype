commands.Item({
	id: 'layouts:open',
	exposed: true,
	description: 'Open layout items by id, app or mode, optionally passing data to their renders. Persists the state and emits layouts.open with the ids that actually changed. Items that are already open are left alone unless new data is passed.',
	metadata: { addon: 'layouts' },
	in: {
		id: {
			type: 'string',
			description: 'A single layout item ID.'
		},
		app: {
			type: 'string',
			description: 'Open all items registered for this app.'
		},
		mode: {
			type: 'string',
			description: 'Open all items registered for this mode.'
		},
		data: {
			type: 'object',
			description: 'Prop values passed to the opened item render.'
		}
	},
	out: {
		ids: {
			type: 'array',
			each: { type: 'string' },
			description: 'IDs of the items that changed state or received new data.'
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

			let touched = false;

			if(properties.data && JSON.stringify(item.Get('data')) !== JSON.stringify(properties.data))
			{
				item.Set('data', properties.data);
				touched = true;
			}

			if(!item.Get('active'))
			{
				item.Set('active', true);
				touched = true;
			}

			if(touched)
			{
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
			return resolve({ ids: [] }, 'Layout ' + matched.join(', ') + ' already open.');
		}

		layouts.Fn('persist');

		onetype.Emit('layouts.open', { ids: changed });

		resolve({ ids: changed }, 'Layout ' + changed.join(', ') + ' opened.');
	}
});
