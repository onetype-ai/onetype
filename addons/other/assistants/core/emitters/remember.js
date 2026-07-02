onetype.EmitRegister('assistants.remember', {
	description: 'Fired after an assistant learns a new fact about the user.',
	metadata: { addon: 'assistants' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the assistant that learned it.'
		},
		preference: {
			type: 'string',
			description: 'The learned fact, one short sentence.'
		}
	}
});
