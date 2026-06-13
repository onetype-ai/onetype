commands.Item({
	id: 'presets:run',
	exposed: true,
	description: 'Run a preset by id with the given input and return what it produces. The input is validated against the preset config.',
	metadata: { addon: 'presets' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the preset to run.'
		},
		input: {
			type: 'object',
			value: {},
			description: 'Input for the preset, shaped by its config.'
		}
	},
	out: {
		result: {
			type: 'object',
			description: 'What the preset produced.'
		}
	},
	callback: async function(properties, resolve)
	{
		const item = presets.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Preset ' + properties.id + ' does not exist.', 404);
		}

		try
		{
			const result = await item.Fn('run', properties.input);

			resolve({ result }, 'Preset ' + item.Get('name') + ' produced its result.');
		}
		catch(error)
		{
			resolve(null, 'Preset ' + properties.id + ' failed: ' + error.message, error.code && error.code >= 400 ? error.code : 500);
		}
	}
});
