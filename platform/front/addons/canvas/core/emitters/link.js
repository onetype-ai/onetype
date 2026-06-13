onetype.EmitRegister('canvas.link', {
	description: 'Fired after a connection arrow is drawn between two canvas items, through the canvas:link command or an interactive port drag.',
	metadata: { addon: 'canvas' },
	config: {
		from: {
			type: 'string',
			description: 'ID of the source item.'
		},
		to: {
			type: 'string',
			description: 'ID of the target item.'
		}
	}
});
