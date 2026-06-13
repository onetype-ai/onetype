canvas.Fn('persist', function()
{
	const state = {};

	Object.values(this.Items()).forEach((item) =>
	{
		state[item.Get('id')] = { x: item.Get('x'), y: item.Get('y'), links: item.Get('links') };
	});

	settings.Fn('set', 'canvas.state', state);

	return state;
});
