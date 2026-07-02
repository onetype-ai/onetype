commands.Item({
	id: 'collections:version',
	exposed: true,
	description: 'Open a version of the active collection in the history diff panel. Emits collections.version. Does nothing when the version is already open.',
	metadata: { addon: 'collections' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the version to open. Must belong to the active collection.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the version open in the diff panel.'
		}
	},
	callback: function(properties, resolve)
	{
		const active = $ot.settings.get('collections.active', '');
		const version = collections.Fn('versions', active).find((entry) => entry.id === properties.id);

		if(!version)
		{
			return resolve(null, 'Version ' + properties.id + ' not found in collection ' + active + '.', 404);
		}

		if($ot.settings.get('collections.version', '') === properties.id)
		{
			return resolve({ id: properties.id }, 'Version ' + properties.id + ' is already open.');
		}

		$ot.settings.set('collections.version', properties.id);

		onetype.Emit('collections.version', { id: properties.id });

		resolve({ id: properties.id }, 'Version ' + properties.id + ' is now open.');
	}
});
