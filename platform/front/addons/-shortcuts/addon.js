const shortcuts = onetype.Addon('shortcuts', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique shortcut id.'
	});

	addon.Field('name', {
		type: 'string',
		description: 'Human readable name, shown in search and listings.'
	});

	addon.Field('group', {
		type: 'string',
		description: 'Group label for organizing shortcuts in listings.'
	});

	addon.Field('description', {
		type: 'string',
		description: 'What the shortcut does.'
	});

	addon.Field('key', {
		type: 'string',
		required: true,
		description: 'Key combination: modifiers and key joined with +, like meta+shift+k or ctrl+1.'
	});

	addon.Field('app', {
		type: 'array',
		value: [],
		each: { type: 'string' },
		description: 'App ids the shortcut belongs to. Empty means every app.'
	});

	addon.Field('mode', {
		type: 'array',
		value: [],
		each: { type: 'string' },
		description: 'Mode ids the shortcut belongs to. Empty means every mode.'
	});

	addon.Field('callback', {
		type: 'function',
		required: true,
		description: 'Function to run when the shortcut fires. Receives the trigger properties.'
	});

	addon.Field('condition', {
		type: 'function',
		description: 'Extra check before firing. Receives the keyboard event, returns a boolean.'
	});

	addon.Field('enabled', {
		type: 'boolean',
		value: true,
		description: 'Disabled shortcuts never fire.'
	});

	addon.Field('prevent', {
		type: 'boolean',
		value: true,
		description: 'Calls preventDefault on the keyboard event when the shortcut fires.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Run position when multiple shortcuts match the same key. Lower runs first.'
	});
});
