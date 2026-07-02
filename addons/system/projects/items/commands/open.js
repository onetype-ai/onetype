commands.Item({
	id: 'projects:open',
	exposed: true,
	description: 'Open a project, making it the active one. Persists the active project and emits projects.open. Does nothing when the project is already active.',
	metadata: { addon: 'projects' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the project to open. Must match a loaded project item.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the project that is now active.'
		}
	},
	callback: async function(properties, resolve)
	{
		const item = projects.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Project ' + properties.id + ' not found.', 404);
		}

		if($ot.projects.active()?.Get('id') === properties.id)
		{
			return resolve({ id: properties.id }, 'Project "' + item.Get('name') + '" is already open.');
		}

		$ot.settings.set('projects.active', item.Get('id'));

		onetype.Emit('projects.open', { id: item.Get('id') });

		resolve({ id: item.Get('id') }, 'Project "' + item.Get('name') + '" is now open.');
	}
});
