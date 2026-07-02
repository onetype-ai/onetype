terminal.Fn('suggest', function(line)
{
	if(!line || line.includes(' '))
	{
		return null;
	}

	const ids = Object.keys(commands.Items()).filter((id) => id.startsWith(line) && id !== line).sort();

	return ids.length ? ids[0] : null;
});
