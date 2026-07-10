commands.Item({
	id: 'projects:create',
	description: 'Create a project for the active team and add it to the local store. Opens it when options.open is true.',
	metadata: { addon: 'projects' },
	in: {
		name: {
			type: 'string',
			required: true,
			value: 'New Project',
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
				},
				open: {
					type: 'boolean',
					value: true,
					description: 'Open the created project, making it active.'
				}
			},
			description: 'Command options.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the created project.'
		}
	},
	callback: async function(properties, resolve)
	{
		const { name, description, color, options } = properties;

		const { data, code, message } = await $ot.command('projects:create', { name, description, color }, true);

		if(code !== 200)
		{
			options.toast && $ot.float.toast({ title: 'Projects', message, type: 'error' });
			return resolve(null, message, code);
		}

		projects.ItemAdd(data);

		if(options.open)
		{
			$ot.modules.settings.set('projects.active', data.id);
			onetype.Emit('projects.open', { id: data.id });
		}

		options.toast && $ot.float.toast({ title: 'Projects', message: 'Project "' + data.name + '" created.', type: 'success' });

		resolve({ id: data.id }, 'Project "' + data.name + '" created' + (options.open ? ' and opened.' : '.'));
	}
});
