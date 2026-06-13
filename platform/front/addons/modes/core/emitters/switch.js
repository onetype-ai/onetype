onetype.EmitRegister('modes.switch', {
	description: 'Fired after the active mode of an app changes. Not fired when switching to the mode that is already active.',
	metadata: { addon: 'modes' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the mode that became active.'
		},
		app: {
			type: 'string',
			description: 'ID of the app the mode belongs to.'
		}
	}
});
