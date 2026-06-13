const assistants = onetype.Addon('assistants', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		description: 'Unique assistant id.'
	});

	addon.Field('name', {
		type: 'string',
		value: 'Assistant',
		description: 'Human readable assistant name.'
	});

	addon.Field('messages', {
		type: 'array',
		value: [],
		each: {
			type: 'object',
			config: {
				role: {
					type: 'string',
					required: true,
					options: ['user', 'assistant', 'error'],
					description: 'Who wrote the message. error marks a failed run.'
				},
				content: {
					type: 'string',
					required: true,
					description: 'Message text.'
				}
			}
		},
		description: 'Conversation messages in order.'
	});

	addon.Field('preferences', {
		type: 'array',
		value: [],
		each: { type: 'string' },
		description: 'What the assistant learned about the user, short facts in plain language.'
	});
});
