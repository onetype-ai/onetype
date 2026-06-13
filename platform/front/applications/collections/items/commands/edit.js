commands.Item({
	id: 'collections:edit',
	exposed: true,
	description: 'Open an item of the active collection in the editor panel. Emits collections.edit. Does nothing when the item is already open.',
	metadata: { addon: 'collections' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the item to open. Must belong to the active collection.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the item open in the editor.'
		}
	},
	callback: function(properties, resolve)
	{
		const active = settings.Fn('get', 'collections.active', '');
		const row = collections.Fn('rows', active).find((entry) => entry.id === properties.id);

		if(!row)
		{
			return resolve(null, 'Item ' + properties.id + ' not found in collection ' + active + '.', 404);
		}

		if(settings.Fn('get', 'collections.item', '') === properties.id)
		{
			return resolve({ id: properties.id }, 'Item ' + properties.id + ' is already open.');
		}

		settings.Fn('set', 'collections.item', properties.id);

		onetype.Emit('collections.edit', { id: properties.id });

		resolve({ id: properties.id }, 'Item ' + properties.id + ' is now open in the editor.');
	}
});
