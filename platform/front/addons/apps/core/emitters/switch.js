onetype.EmitRegister('apps.switch', {
	description: 'Fired after the active app changes. Not fired when switching to the app that is already active.',
	metadata: { addon: 'apps' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the app that became active.'
		}
	}
});
