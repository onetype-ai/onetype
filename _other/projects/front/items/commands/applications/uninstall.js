commands.Item({
	id: 'projects:applications:uninstall',
	description: 'Uninstall an application from the active project and update the local store. Calls the back command, replaces the stored project with the result and emits projects.applications.',
	metadata: { addon: 'projects' },
	in: {
		slug: {
			type: 'string',
			required: true,
			description: 'Slug of the application to uninstall.'
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
	out: 'project',
	callback: async function(properties, resolve)
	{
		const { slug, options } = properties;

		const result = await $ot.command('projects:applications:uninstall', { slug }, true);

		if(result.code !== 200)
		{
			options.toast && $ot.float.toast({ title: 'Applications', message: result.message, type: 'error' });
			return resolve(null, result.message, result.code);
		}

		projects.ItemAdd(result.data);

		onetype.Emit('projects.applications', { id: result.data.id, slug });

		options.toast && $ot.float.toast({ title: 'Applications', message: 'Application "' + slug + '" uninstalled.', type: 'success' });

		resolve(result.data, 'Application "' + slug + '" uninstalled.');
	}
});
