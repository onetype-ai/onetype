onetype.EmitRegister('assistants.clear', {
	description: 'Fired after an assistant conversation is emptied.',
	metadata: { addon: 'assistants' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the assistant whose conversation was cleared.'
		}
	}
});
