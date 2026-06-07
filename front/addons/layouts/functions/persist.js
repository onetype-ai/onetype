layouts.Fn('persist', function()
{
	const state = {};

	Object.values(this.Items()).forEach((item) =>
	{
		state[item.Get('id')] = {
			active: item.Get('active'),
			data: item.Get('data')
		};
	});

	settings.Fn('set', 'layouts.state', state);

	return state;
});
