commands.Item({
	id: 'projects:list',
	exposed: true,
	description: 'List every loaded project of the team, marking which one is active. Reads the local store, does not hit the server.',
	metadata: { addon: 'projects' },
	in: {},
	out: {
		projects: {
			type: 'array',
			value: [],
			each: {
				type: 'object',
				config: {
					id: {
						type: 'string',
						description: 'Project id.'
					},
					name: {
						type: 'string',
						description: 'Project name.'
					},
					description: {
						type: 'string',
						description: 'Project description.'
					},
					color: {
						type: 'string',
						description: 'Project accent color.'
					},
					active: {
						type: 'boolean',
						description: 'True when this is the active project.'
					}
				}
			}
		}
	},
	callback: function(properties, resolve)
	{
		const current = $ot.projects.active();
		const active = current?.Get('id');

		const list = Object.values(projects.Items()).map((item) =>
		{
			return {
				id: item.Get('id'),
				name: item.Get('name'),
				description: item.Get('description'),
				color: item.Get('color'),
				active: item.Get('id') === active
			};
		});

		const summary = current ? ' Active project is "' + current.Get('name') + '".' : ' No project is open.';

		resolve({ projects: list }, list.length + ' project' + (list.length === 1 ? '' : 's') + ' available.' + summary);
	}
});
