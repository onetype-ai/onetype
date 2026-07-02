terminal.Fn('run', function(line)
{
	let parsed;

	try
	{
		parsed = this.Fn('parse', line);
	}
	catch(error)
	{
		this.Fn('log', { id: line, input: {}, data: null, message: 'Invalid input: ' + error.message, code: 400, time: '0.00' });

		return Promise.resolve(null);
	}

	return $ot.command(parsed.id, parsed.properties).then((result) =>
	{
		if(result && result.code === 404 && !commands.ItemGet(parsed.id))
		{
			this.Fn('log', { id: parsed.id, input: parsed.properties, data: null, message: result.message, code: 404, time: '0.00' });
		}

		return result;
	}).catch(() => null);
});
