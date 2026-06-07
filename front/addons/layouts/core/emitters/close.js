onetype.EmitRegister('layouts.close', {
	description: 'Fired when a layout item is closed.',
	metadata: { addon: 'layouts' },
	config: {
		ids: {
			type: 'array',
			each: { type: 'string|number' },
			description: 'IDs of the layout items that were closed.'
		}
	}
});
