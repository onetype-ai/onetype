const apps = onetype.Addon('apps', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique app id.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Sort position on the rail.'
	});

	addon.Field('position', {
		type: 'string',
		value: 'top',
		options: ['top', 'bottom'],
		description: 'Rail group the app icon goes into.'
	});

	addon.Field('icon', {
		type: 'string',
		required: true,
		description: 'Material Symbols icon name.'
	});

	addon.Field('label', {
		type: 'string',
		required: true,
		description: 'App name, shown as the icon tooltip.'
	});

	addon.Field('onOpen', {
		type: 'function',
		description: 'Called with the app item when the app becomes active.'
	});

	addon.Field('onClose', {
		type: 'function',
		description: 'Called with the app item when another app takes over.'
	});
});
