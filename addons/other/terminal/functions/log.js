terminal.Fn('log', function(entry)
{
	this.Item({
		command: entry.id,
		input: entry.input || {},
		output: entry.data,
		message: entry.message,
		code: entry.code,
		time: entry.time,
		at: new Date().toLocaleTimeString()
	});

	const limit = $ot.modules.settings.get('terminal.limit', 200);
	const ids = Object.keys(this.Items());

	if(ids.length > limit)
	{
		ids.slice(0, ids.length - limit).forEach((id) => this.ItemRemove(id));
	}
});
