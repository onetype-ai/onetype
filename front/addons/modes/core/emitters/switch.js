onetype.EmitRegister('modes.switch', {
	description: 'Fired when the active editor mode changes.',
	metadata: { addon: 'modes' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the mode that was switched to.'
		}
	}
});
