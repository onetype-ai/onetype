commands.Item({
	id: 'extensions:install',
	exposed: true,
	description: 'Install an extension from the marketplace by id.',
	metadata: { addon: 'extensions' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the extension to install.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the installed extension.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = extensions.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Extension ' + properties.id + ' does not exist.', 404);
		}

		if(item.Get('installed'))
		{
			return resolve({ id: properties.id }, 'Extension ' + item.Get('name') + ' is already installed.');
		}

		item.Set('installed', true, false);
		extensions.Fn('persist');

		onetype.Emit('extensions.install', { id: properties.id });

		resolve({ id: properties.id }, 'Extension ' + item.Get('name') + ' installed.');
	}
});
