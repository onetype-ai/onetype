commands.Item({
	id: 'apps:switch',
	exposed: true,
	description: 'Switch the active app',
	metadata: { addon: 'apps' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'App ID to switch to'
		}
	},
	out: {
		id: ['string']
	},
	callback: function(properties, resolve)
	{
		const item = apps.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'App :id: not found.', 404, {id: properties.id});
		}

		settings.Fn('set', 'apps.active', item.Get('id'));

		onetype.Emit('apps.switch', item.Get('id'));

		resolve({ id: item.Get('id') });
	}
});
