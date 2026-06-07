commands.Item({
	id: 'editor:mode',
	exposed: true,
	description: 'Set the active editor mode',
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'Mode ID to activate'
		}
	},
	out: {
		mode: ['string']
	},
	callback: function(properties, resolve)
	{
		const item = editor.modes.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Mode :id: not found.', 404, {id: properties.id});
		}

		onetype.StateSet('editor.mode', item.Get('id'));

		resolve({ mode: item.Get('id') });
	}
});
