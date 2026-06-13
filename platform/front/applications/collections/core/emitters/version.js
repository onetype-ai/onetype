onetype.EmitRegister('collections.version', {
	description: 'Fired after the version open in the history diff panel changes through the collections:version command.',
	metadata: { addon: 'collections' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the version that is now open.'
		}
	}
});
