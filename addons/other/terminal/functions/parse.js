terminal.Fn('parse', function(line)
{
	const space = line.indexOf(' ');
	const id = space === -1 ? line : line.slice(0, space);
	const rest = space === -1 ? '' : line.slice(space + 1).trim();

	if(!rest)
	{
		return { id, properties: {} };
	}

	if(rest.startsWith('{'))
	{
		return { id, properties: JSON.parse(rest) };
	}

	const properties = {};

	rest.split(/\s+/).forEach((pair) =>
	{
		const equals = pair.indexOf('=');

		if(equals === -1)
		{
			return;
		}

		const key = pair.slice(0, equals);
		const raw = pair.slice(equals + 1);

		try
		{
			properties[key] = JSON.parse(raw);
		}
		catch(error)
		{
			properties[key] = raw;
		}
	});

	return { id, properties };
});
