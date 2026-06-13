onetype.EmitRegister('canvas.jump', {
	description: 'Fired after the camera centers on one canvas item, through the canvas:jump command or the quick jump search.',
	metadata: { addon: 'canvas' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the centered item.'
		}
	}
});
