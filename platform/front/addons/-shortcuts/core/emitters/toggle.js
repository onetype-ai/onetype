onetype.EmitRegister('shortcuts.toggle', {
	description: 'Fired after a shortcut is enabled or disabled through the shortcuts:toggle command. Not fired when the state did not change.',
	metadata: { addon: 'shortcuts' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the shortcut that changed.'
		},
		enabled: {
			type: 'boolean',
			description: 'State the shortcut ended up in.'
		}
	}
});
