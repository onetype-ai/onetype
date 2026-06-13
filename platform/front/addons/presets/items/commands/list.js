commands.Item({
	id: 'presets:list',
	exposed: true,
	description: 'List the registered presets, all of them or one group.',
	metadata: { addon: 'presets' },
	in: {
		group: {
			type: 'string',
			value: '',
			description: 'Group to filter by, like collections or tags. Empty lists everything.'
		}
	},
	out: {
		presets: {
			type: 'array',
			each: {
				type: 'object',
				config: {
					id: {
						type: 'string',
						description: 'Preset id.'
					},
					group: {
						type: 'string',
						description: 'Domain the preset belongs to.'
					},
					name: {
						type: 'string',
						description: 'Display name.'
					},
					description: {
						type: 'string',
						description: 'What the preset produces.'
					}
				}
			},
			description: 'The registered presets.'
		}
	},
	callback: function(properties, resolve)
	{
		const list = presets.Fn('list', properties.group || null).map((entry) =>
		{
			return { id: entry.id, group: entry.group, name: entry.name, description: entry.description };
		});

		resolve({ presets: list }, list.length + ' presets registered.');
	}
});
