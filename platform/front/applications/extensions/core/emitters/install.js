onetype.EmitRegister('extensions.install', {
	description: 'Fired after an extension is installed.',
	metadata: { addon: 'extensions' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the installed extension.'
		}
	}
});
