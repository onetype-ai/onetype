onetype.EmitRegister('collections.import', {
	description: 'Fired after an import finishes, with how many collections were added and skipped.',
	metadata: { addon: 'collections' },
	config: {
		added: {
			type: 'number',
			description: 'How many collections the import created.'
		},
		skipped: {
			type: 'number',
			description: 'How many collections already existed and were skipped.'
		}
	}
});
