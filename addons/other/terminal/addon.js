const terminal = onetype.Addon('terminal', (addon) =>
{
	addon.Field('id', {
		type: 'number',
		description: 'Auto-assigned entry id.'
	});

	addon.Field('command', {
		type: 'string',
		required: true,
		description: 'ID of the command that ran.'
	});

	addon.Field('input', {
		type: 'object',
		value: {},
		description: 'Input properties the command received.'
	});

	addon.Field('output', {
		type: 'any',
		description: 'Data the command resolved with.'
	});

	addon.Field('message', {
		type: 'string',
		description: 'Result message of the run.'
	});

	addon.Field('code', {
		type: 'number',
		value: 200,
		description: 'Status code of the result, HTTP style. 2xx is success.'
	});

	addon.Field('time', {
		type: 'string',
		description: 'Execution duration in milliseconds.'
	});

	addon.Field('at', {
		type: 'string',
		description: 'Clock time when the command ran.'
	});
});
