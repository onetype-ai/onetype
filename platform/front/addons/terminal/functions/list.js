terminal.Fn('list', function()
{
	return Object.values(this.Items()).map((item) =>
	{
		return {
			id: item.Get('id'),
			command: item.Get('command'),
			input: item.Get('input'),
			output: item.Get('output'),
			message: item.Get('message'),
			code: item.Get('code'),
			time: item.Get('time'),
			at: item.Get('at')
		};
	});
});
