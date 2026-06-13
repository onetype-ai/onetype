onetype.EmitRegister('explorer.toggle', {
	description: 'Fired after the explorer opens or closes through the explorer:toggle command. Not fired when the state did not change.',
	metadata: { addon: 'explorer' },
	config: {
		open: {
			type: 'boolean',
			description: 'Whether the explorer is open now.'
		}
	}
});
