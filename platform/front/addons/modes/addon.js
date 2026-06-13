const modes = onetype.Addon('modes', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique mode id.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Sort position in the modes bar.'
	});

	addon.Field('app', {
		type: 'string',
		required: true,
		description: 'ID of the app the mode belongs to. A mode belongs to exactly one app.'
	});

	addon.Field('default', {
		type: 'boolean',
		value: false,
		description: 'Marks the mode the app starts in when none is saved.'
	});

	addon.Field('icon', {
		type: 'string',
		required: true,
		description: 'Material Symbols icon name.'
	});

	addon.Field('label', {
		type: 'string',
		required: true,
		description: 'Mode name, shown as the icon tooltip.'
	});

	addon.Field('onActivate', {
		type: 'function',
		description: 'Called with the mode item when the mode becomes active.'
	});

	addon.Field('onDeactivate', {
		type: 'function',
		description: 'Called with the mode item when another mode takes over.'
	});

	addon.Field('active', {
		type: 'boolean',
		value: false,
		description: 'Computed. True when this mode is the active one of its app.'
	}, (active, item) =>
	{
		return modes.Fn('active', item.Get('app')) === item.Get('id');
	});
});
