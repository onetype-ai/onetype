onetype.EmitOn('@commands.run', (result) =>
{
	const command = commands.ItemGet(result.id);

	if(command && command.Get('silent'))
	{
		return;
	}

	terminal.Fn('log', result);
});
