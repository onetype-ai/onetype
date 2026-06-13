onetype.EmitRegister('assistants.forget', {
	description: 'Fired after an assistant forgets a fact about the user.',
	metadata: { addon: 'assistants' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the assistant that forgot it.'
		},
		preference: {
			type: 'string',
			description: 'The forgotten fact.'
		}
	}
});
