onetype.EmitRegister('assistants.message', {
	description: 'Fired after a message lands in an assistant conversation, from the user, the assistant or a failed run.',
	metadata: { addon: 'assistants' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the assistant the message belongs to.'
		},
		role: {
			type: 'string',
			description: 'Who wrote the message, user, assistant or error.'
		},
		content: {
			type: 'string',
			description: 'Message text.'
		}
	}
});
