onetype.EmitRegister('modules.shortcuts.trigger', {
	description: 'Fired when a shortcut runs, right before its callback executes.',
	metadata: { addon: 'modules.shortcuts' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the shortcut that fired.'
		},
		key: {
			type: 'string',
			description: 'Key combination of the shortcut.'
		}
	}
});
