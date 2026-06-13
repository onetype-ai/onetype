commands.Item({
	id: 'apps:switch',
	exposed: true,
	description: 'Switch the active app. Closes the current app, persists the new one as active, runs its open hook and emits apps.switch. Does nothing when the app is already active.',
	metadata: { addon: 'apps' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the app to switch to. Must match a registered app item.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the app that is now active.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = apps.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'App ' + properties.id + ' not found.', 404);
		}

		const active = settings.Fn('get', 'apps.active', 'builder');

		if(active === properties.id)
		{
			return resolve({ id: properties.id }, 'App ' + properties.id + ' is already active.');
		}

		const previous = apps.ItemGet(active);

		if(previous && previous.Get('onClose'))
		{
			previous.Get('onClose')(previous);
		}

		settings.Fn('set', 'apps.active', item.Get('id'));

		if(item.Get('onOpen'))
		{
			item.Get('onOpen')(item);
		}

		onetype.Emit('apps.switch', { id: item.Get('id') });

		resolve({ id: item.Get('id') }, 'App ' + item.Get('id') + ' is now active.');
	}
});
