onetype.EmitRegister('canvas.group', {
	description: 'Fired when a canvas group is registered.',
	metadata: { addon: 'canvas' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the registered group.'
		}
	}
});
