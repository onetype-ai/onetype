onetype.EmitRegister('collections.select', {
	description: 'Fired after the active collection changes through the collections:select command. Not fired when the collection is already selected.',
	metadata: { addon: 'collections' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the collection that became active.'
		}
	}
});
