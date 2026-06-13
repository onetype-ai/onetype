commands.Item({
	id: 'layouts:toggle',
	exposed: true,
	description: 'Toggle a layout item by id. Flips the current state unless open is passed explicitly, then behaves like layouts:open or layouts:close, including persistence and events.',
	metadata: { addon: 'layouts' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the layout item to toggle.'
		},
		open: {
			type: 'boolean',
			description: 'Explicit state to set. Omit to flip the current state.'
		},
		data: {
			type: 'object',
			description: 'Prop values passed to the render when opening.'
		}
	},
	out: {
		open: {
			type: 'boolean',
			description: 'Whether the item is open now.'
		}
	},
	callback: async function(properties, resolve)
	{
		const item = layouts.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Layout item ' + properties.id + ' not found.', 404);
		}

		const open = properties.open === undefined ? !item.Get('active') : properties.open;

		if(open)
		{
			await $ot.command('layouts:open', properties.data ? { id: properties.id, data: properties.data } : { id: properties.id });
		}
		else
		{
			await $ot.command('layouts:close', { id: properties.id });
		}

		resolve({ open }, 'Layout ' + properties.id + ' is now ' + (open ? 'open' : 'closed') + '.');
	}
});
