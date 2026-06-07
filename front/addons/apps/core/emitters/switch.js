onetype.EmitRegister('apps.switch', {
	description: 'Fired when the active app changes.',
	metadata: { addon: 'apps' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the app that was switched to.'
		}
	}
});
