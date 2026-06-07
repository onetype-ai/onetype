commands.Item({
	id: 'modes:switch',
	exposed: true,
	description: 'Switch the active editor mode',
	metadata: { addon: 'modes' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'Mode ID to switch to'
		}
	},
	out: {
		mode: ['string']
	},
	callback: function(properties, resolve)
	{
		const item = modes.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Mode :id: not found.', 404, {id: properties.id});
		}

		const app = item.Get('app');
		const map = {...settings.Fn('get', 'modes.active', {})};


		const previous = modes.ItemGet(map[app]);

		if(previous && previous.Get('id') !== item.Get('id'))
		{
			const deactivate = previous.Get('onDeactivate');

			deactivate && deactivate(previous);
		}

		map[app] = item.Get('id');
		settings.Fn('set', 'modes.active', map);

		const activate = item.Get('onActivate');

		activate && activate(item);

		onetype.Emit('modes.switch', item.Get('id'));

		resolve({ mode: item.Get('id') });
	}
});
