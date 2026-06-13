commands.Item({
	id: 'assistants:forget',
	exposed: true,
	description: 'Remove a learned preference from an assistant, or every preference when none is given.',
	metadata: { addon: 'assistants' },
	in: {
		id: {
			type: 'string',
			value: 'main',
			description: 'Which assistant forgets.'
		},
		preference: {
			type: 'string',
			value: '',
			description: 'The exact preference to forget. Empty forgets everything.'
		}
	},
	out: {
		removed: {
			type: 'number',
			description: 'How many preferences were removed.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = assistants.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Assistant ' + properties.id + ' does not exist.', 404);
		}

		if(properties.preference)
		{
			if(!item.Fn('forget', properties.preference))
			{
				return resolve(null, 'Assistant does not know "' + properties.preference + '".', 404);
			}

			return resolve({ removed: 1 }, 'Assistant forgot "' + properties.preference + '".');
		}

		const preferences = [...item.Get('preferences')];

		preferences.forEach((preference) => item.Fn('forget', preference));

		resolve({ removed: preferences.length }, preferences.length ? 'Assistant forgot ' + preferences.length + ' preferences.' : 'Assistant has nothing to forget.');
	}
});
