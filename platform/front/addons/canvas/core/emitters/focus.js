onetype.EmitRegister('canvas.focus', {
	description: 'Fired after a canvas item takes focus and the camera flies in until the item fills the viewport.',
	metadata: { addon: 'canvas' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the focused item.'
		}
	}
});
