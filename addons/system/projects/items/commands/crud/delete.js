commands.Item({
	id: 'projects:delete',
	description: 'Delete a project and remove it from the local store. Closes it when the deleted project was the active one.',
	metadata: { addon: 'projects' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the project to delete.'
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
			description: 'ID of the deleted project.'
		}
	},
	callback: async function(properties, resolve)
	{
		const { id, options } = properties;

		const { data, code, message } = await $ot.command('projects:delete', { id }, true);

		if(code !== 200)
		{
			options.toast && $ot.float.toast({ title: 'Projects', message, type: 'error' });
			return resolve(null, message, code);
		}

		const active = $ot.projects.active()?.Get('id');

		projects.ItemRemove(data.id);

		let outcome = '';

		if(active === data.id)
		{
			$ot.command('projects:close');
			outcome = ' It was the active project, now nothing is open.';
		}

		options.toast && $ot.float.toast({ title: 'Projects', message: 'Project "' + data.name + '" deleted.', type: 'success' });

		resolve({ id: data.id }, 'Project "' + data.name + '" deleted.' + outcome);
	}
});
