import commands from '@onetype/framework/commands';

commands.Item({
	id: 'editor:toolbar:activate',
	exposed: true,
	description: 'Activate a toolbar item by ID',
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'Toolbar item ID to activate'
		}
	},
	out: {
		item: {
			type: 'object',
			config: {
				id: ['string'],
				label: ['string'],
				icon: ['string'],
				position: ['string']
			}
		}
	},
	callback: function(properties, resolve)
	{
		const item = editor.toolbar.Fn('activate', properties.id);

		if(!item)
		{
			resolve(null, 'Toolbar item not found', 404);
			return;
		}

		resolve({
			item: {
				id: item.Get('id'),
				label: item.Get('label'),
				icon: item.Get('icon'),
				position: item.Get('position')
			}
		});
	}
});
