onetype.EmitRegister('layouts.open', {
	description: 'Fired when a layout item is opened.',
	metadata: { addon: 'layouts' },
	config: {
		ids: {
			type: 'array',
			each: { type: 'string|number' },
			description: 'IDs of the layout items that were opened.'
		}
	}
});
