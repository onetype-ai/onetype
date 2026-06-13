onetype.EmitRegister('collections.export', {
	description: 'Fired after collections are exported as a file download.',
	metadata: { addon: 'collections' },
	config: {
		collections: {
			type: 'number',
			description: 'How many collections went into the export.'
		},
		rows: {
			type: 'number',
			description: 'How many items went into the export.'
		}
	}
});
