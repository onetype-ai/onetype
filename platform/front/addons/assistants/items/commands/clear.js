commands.Item({
	id: 'assistants:clear',
	exposed: true,
	description: 'Clear an assistant conversation.',
	metadata: { addon: 'assistants' },
	in: {
		id: {
			type: 'string',
			value: 'main',
			description: 'Which assistant conversation to clear.'
		}
	},
	out: {
		removed: {
			type: 'number',
			description: 'How many messages were removed.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = assistants.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Assistant ' + properties.id + ' does not exist.', 404);
		}

		const count = item.Get('messages').length;

		if(!count)
		{
			return resolve({ removed: 0 }, 'Assistant conversation is already empty.');
		}

		item.Set('messages', []);

		onetype.Emit('assistants.clear', { id: item.Get('id') });

		resolve({ removed: count }, 'Assistant conversation cleared, ' + count + ' messages removed.');
	}
});
