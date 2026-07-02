const presets = onetype.Addon('presets', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique preset id.'
	});

	addon.Field('group', {
		type: 'string',
		required: true,
		description: 'Domain the preset belongs to, like collections, tags, bridge or workflows.'
	});

	addon.Field('app', {
		type: 'array',
		value: [],
		each: { type: 'string' },
		description: 'App ids the preset belongs to. Empty means every app.'
	});

	addon.Field('mode', {
		type: 'array',
		value: [],
		each: { type: 'string' },
		description: 'Mode ids the preset belongs to. Empty means every mode.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Order inside its group.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Display name of the preset.'
	});

	addon.Field('icon', {
		type: 'string',
		value: 'dashboard_customize',
		description: 'Material Symbols icon of the preset.'
	});

	addon.Field('description', {
		type: 'string',
		value: '',
		description: 'What the preset produces.'
	});

	addon.Field('config', {
		type: 'object',
		value: {},
		description: 'Input schema in the data define format. The run input is validated against it.'
	});

	addon.Field('callback', {
		type: 'function',
		required: true,
		description: 'Receives the validated input and returns the materialized result.'
	});
});
