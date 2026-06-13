onetype.AddonReady('ai.agents', (agents) =>
{
	agents.Item({
		id: 'memory',
		name: 'Memory',
		description: 'Maintains what an assistant knows about the user, decides what to remember and what to forget.',
		condition: () => false,
		temperature: 0.1,
		tokens: 400,
		instructions: 'You maintain a short list of facts about the user. You receive the current list and the latest user message. '
			+ 'Return add, new lasting facts the message reveals, and remove, existing facts the message retracts or contradicts, copied exactly as written in the list. '
			+ 'Facts are short third person sentences, ALWAYS in English no matter what language the user writes in, like "Likes blue". Casual chatter means both arrays are empty.',
		input: {
			preferences: {
				type: 'array',
				each: { type: 'string' },
				description: 'Current facts about the user.'
			},
			message: {
				type: 'string',
				required: true,
				description: 'Latest user message.'
			}
		},
		output: {
			add: {
				type: 'array',
				each: { type: 'string' },
				description: 'New facts to store.'
			},
			remove: {
				type: 'array',
				each: { type: 'string' },
				description: 'Existing facts to delete, exact text from the list.'
			}
		}
	});
});
