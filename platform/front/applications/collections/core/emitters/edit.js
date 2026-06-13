onetype.EmitRegister('collections.edit', {
	description: 'Fired after the item open in the editor changes through the collections:edit command.',
	metadata: { addon: 'collections' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the item that is now open in the editor.'
		}
	}
});
