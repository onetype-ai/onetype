onetype.EmitRegister('canvas.move', {
	description: 'Fired after canvas items move, through the canvas:move command or the restore on boot.',
	metadata: { addon: 'canvas' },
	config: {
		ids: {
			type: 'array',
			each: { type: 'string' },
			description: 'IDs of the items that moved.'
		}
	}
});
