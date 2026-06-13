commands.Item({
	id: 'modes:switch',
	exposed: true,
	description: 'Switch the active mode of an app. Deactivates the current mode of the same app, persists the new one, runs its activate hook and emits modes.switch. Does nothing when the mode is already active. The mode is saved per app, every app remembers its own.',
	metadata: { addon: 'modes' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the mode to switch to. Must match a registered mode item.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the mode that is now active.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = modes.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Mode ' + properties.id + ' not found.', 404);
		}

		const app = item.Get('app');

		if(modes.Fn('active', app) === properties.id)
		{
			return resolve({ id: properties.id }, 'Mode ' + properties.id + ' is already active in app ' + app + '.');
		}

		const map = {...settings.Fn('get', 'modes.active', {})};
		const previous = modes.ItemGet(map[app]);

		if(previous && previous.Get('onDeactivate'))
		{
			previous.Get('onDeactivate')(previous);
		}

		map[app] = item.Get('id');
		settings.Fn('set', 'modes.active', map);

		if(item.Get('onActivate'))
		{
			item.Get('onActivate')(item);
		}

		onetype.Emit('modes.switch', { id: item.Get('id'), app });

		resolve({ id: item.Get('id') }, 'Mode ' + item.Get('id') + ' is now active in app ' + app + '.');
	}
});
