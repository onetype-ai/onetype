const layouts = onetype.Addon('layouts', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique item id.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Sort position inside the slot.'
	});

	addon.Field('active', {
		type: 'boolean',
		value: false,
		description: 'Whether the item is open. Toggled through the layouts:open and layouts:close commands.'
	});

	addon.Field('app', {
		type: 'array',
		value: [],
		each: { type: 'string' },
		description: 'App ids the item belongs to. Empty means every app.'
	});

	addon.Field('mode', {
		type: 'array',
		value: [],
		each: { type: 'string' },
		description: 'Mode ids the item belongs to. Empty means every mode.'
	});

	addon.Field('zone', {
		type: 'string',
		value: 'root',
		description: 'Layout instance the item renders into. Nested layouts declare their own zone.'
	});

	addon.Field('slot', {
		type: 'string',
		required: true,
		options: ['top', 'bottom', 'left', 'right', 'center'],
		description: 'Slot of the layout the item goes into.'
	});

	addon.Field('config', {
		type: 'object',
		value: {},
		description: 'Prop schema for the render.'
	});

	addon.Field('data', {
		type: 'object',
		value: {},
		description: 'Prop values passed to the render. Set through the layouts:open command.'
	});

	addon.Field('render', {
		type: 'string|function',
		required: true,
		description: 'Content of the item, an HTML string or a render function.'
	});
});
