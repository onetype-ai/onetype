const navbar = onetype.Addon('navbar', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique item id.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Sort position inside the area.'
	});

	addon.Field('active', {
		type: 'boolean',
		value: true,
		description: 'Turns the item off entirely when false.'
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

	addon.Field('position', {
		type: 'string',
		required: true,
		options: ['left', 'center', 'right'],
		description: 'Area of the bar the item goes into.'
	});

	addon.Field('type', {
		type: 'string|object',
		value: 'default',
		description: 'How the item behaves: default, dropdown, popup or panel. Pass an object with id and options instead of the string to customize the surface, panel options go to $ot.float.panel.'
	});

	addon.Field('icon', {
		type: 'string',
		description: 'Material Symbols icon name.'
	});

	addon.Field('label', {
		type: 'string',
		description: 'Button text.'
	});

	addon.Field('tooltip', {
		type: 'string',
		description: 'Hover tooltip, useful for icon only items.'
	});

	addon.Field('selected', {
		type: 'boolean',
		value: false,
		description: 'Shows the active pill on the item.'
	});

	addon.Field('onClick', {
		type: 'function',
		description: 'Called when a default item is clicked.'
	});

	addon.Field('config', {
		type: 'object',
		value: {},
		description: 'Prop schema for the render.'
	});

	addon.Field('data', {
		type: 'object',
		value: {},
		description: 'Prop values passed to the render.'
	});

	addon.Field('render', {
		type: 'string|function',
		description: 'Inline content, dropdown panel or modal content, depending on type.'
	});
});
