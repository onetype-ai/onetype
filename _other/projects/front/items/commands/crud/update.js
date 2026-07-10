commands.Item({
	id: 'projects:update',
	description: 'Update a project and sync the change into the local store.',
	metadata: { addon: 'projects' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the project to update.'
		},
		name: {
			type: 'string',
			description: 'Project name.'
		},
		description: {
			type: 'string',
			description: 'Short project description.'
		},
		color: {
			type: 'string',
			description: 'Accent color of the project.'
		},
		options: {
			type: 'object',
			value: {},
			config: {
				toast: {
					type: 'boolean',
					value: false,
					description: 'Show a toast notification on success or failure.'
				}
			},
			description: 'Command options.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the updated project.'
		}
	},
	callback: async function(properties, resolve)
	{
		const { id, name, description, color, options } = properties;

		const { data, code, message } = await $ot.command('projects:update', { id, name, description, color }, true);

		if(code !== 200)
		{
			options.toast && $ot.float.toast({ title: 'Projects', message, type: 'error' });
			return resolve(null, message, code);
		}

		projects.ItemAdd(data);

		options.toast && $ot.float.toast({ title: 'Projects', message: 'Project "' + data.name + '" updated.', type: 'success' });

		resolve({ id: data.id }, 'Project "' + data.name + '" updated.');
	}
});
