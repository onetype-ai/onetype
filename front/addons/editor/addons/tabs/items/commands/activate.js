import commands from '@onetype/framework/commands';

commands.Item({
	id: 'editor:tabs:activate',
	exposed: true,
	description: 'Activate an editor tab by ID',
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'Tab ID to activate'
		}
	},
	out: {
		tab: {
			type: 'object',
			config: {
				id: ['string'],
				title: ['string'],
				icon: ['string'],
				position: ['string']
			}
		}
	},
	callback: function(properties, resolve)
	{
		const item = editor.tabs.Fn('activate', properties.id);

		if(!item)
		{
			resolve(null, 'Tab not found', 404);
			return;
		}

		resolve({
			tab: {
				id: item.Get('id'),
				title: item.Get('title'),
				icon: item.Get('icon'),
				position: item.Get('position')
			}
		});
	}
});
