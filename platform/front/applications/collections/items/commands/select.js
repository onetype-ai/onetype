commands.Item({
	id: 'collections:select',
	exposed: true,
	description: 'Select the active collection in the collections app. Persists the selection and emits collections.select. Does nothing when the collection is already selected.',
	metadata: { addon: 'collections' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the collection to select. Must match a registered collection.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the collection that is now active.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = collections.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Collection ' + properties.id + ' not found.', 404);
		}

		if(settings.Fn('get', 'collections.active', '') === properties.id)
		{
			return resolve({ id: properties.id }, 'Collection ' + properties.id + ' is already selected.');
		}

		settings.Fn('set', 'collections.active', properties.id);

		onetype.Emit('collections.select', { id: properties.id });

		resolve({ id: properties.id }, 'Collection ' + properties.id + ' is now selected.');
	}
});
