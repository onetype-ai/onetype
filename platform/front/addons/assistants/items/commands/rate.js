commands.Item({
	id: 'assistants:rate',
	exposed: true,
	description: 'Rate an assistant conversation and download it as a dataset sample. good when it behaved well, bad when it missed, the reason explains why.',
	metadata: { addon: 'assistants' },
	in: {
		id: {
			type: 'string',
			value: 'main',
			description: 'Which assistant conversation to rate.'
		},
		verdict: {
			type: 'string',
			required: true,
			options: ['good', 'bad'],
			description: 'The rating of the conversation.'
		},
		reason: {
			type: 'string',
			value: '',
			description: 'Why the conversation deserves the rating.'
		}
	},
	out: {
		file: {
			type: 'string',
			description: 'Name of the downloaded sample file.'
		},
		messages: {
			type: 'number',
			description: 'How many messages the sample holds.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = assistants.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Assistant ' + properties.id + ' does not exist.', 404);
		}

		const sample = item.Fn('sample', properties.verdict, properties.reason);

		if(!sample.messages.length)
		{
			return resolve(null, 'Assistant conversation is empty, nothing to rate.', 400);
		}

		const file = assistants.Fn('download', sample);

		resolve({ file, messages: sample.messages.length }, 'Conversation rated ' + properties.verdict + ', sample saved as ' + file + '.');
	}
});
