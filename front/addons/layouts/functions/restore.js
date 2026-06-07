layouts.Fn('restore', function()
{
	const state = settings.Fn('get', 'layouts.state', {});


	Object.entries(state).forEach(([id, saved]) =>
	{
		const item = this.ItemGet(id);

		if(!item)
		{
			return;
		}

		item.Set('active', saved.active, false);
		item.Set('data', saved.data, false);
	});

	onetype.Emit('layouts.open', Object.keys(state));

	return state;
});
