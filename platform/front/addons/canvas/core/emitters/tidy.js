onetype.EmitRegister('canvas.tidy', {
	description: 'Fired after the canvas:tidy command arranges the visible items. The canvas glides the cards to their new spots on this event.',
	metadata: { addon: 'canvas' },
	config: {
		ids: {
			type: 'array',
			each: { type: 'string' },
			description: 'IDs of the items that were arranged.'
		}
	}
});
