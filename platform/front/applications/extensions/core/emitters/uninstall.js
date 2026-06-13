onetype.EmitRegister('extensions.uninstall', {
	description: 'Fired after an extension is uninstalled.',
	metadata: { addon: 'extensions' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the uninstalled extension.'
		}
	}
});
