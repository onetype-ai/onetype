commands.Item({
	id: 'terminal:clear',
	exposed: true,
	description: 'Clear the terminal log. Removes all stored command executions.',
	metadata: { addon: 'terminal' },
	out: {
		removed: {
			type: 'number',
			description: 'Number of entries that were removed.'
		}
	},
	callback: function(properties, resolve)
	{
		const ids = Object.keys(terminal.Items());

		ids.forEach((id) => terminal.ItemRemove(id));

		resolve({ removed: ids.length }, 'Terminal log cleared, ' + ids.length + ' entries removed.');
	}
});
