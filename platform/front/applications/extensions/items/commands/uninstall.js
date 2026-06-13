commands.Item({
	id: 'extensions:uninstall',
	exposed: true,
	description: 'Uninstall an installed extension by id.',
	metadata: { addon: 'extensions' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the extension to uninstall.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the uninstalled extension.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = extensions.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Extension ' + properties.id + ' does not exist.', 404);
		}

		if(!item.Get('installed'))
		{
			return resolve({ id: properties.id }, 'Extension ' + item.Get('name') + ' is not installed.');
		}

		item.Set('installed', false, false);
		extensions.Fn('persist');

		onetype.Emit('extensions.uninstall', { id: properties.id });

		resolve({ id: properties.id }, 'Extension ' + item.Get('name') + ' uninstalled.');
	}
});
