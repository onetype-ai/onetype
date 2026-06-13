layouts.Fn('restore', function()
{
	const state = settings.Fn('get', 'layouts.state', {});
	const opened = [];

	Object.entries(state).forEach(([id, saved]) =>
	{
		const item = this.ItemGet(id);

		if(!item)
		{
			return;
		}

		item.Set('active', saved.active, false);
		item.Set('data', saved.data, false);

		if(saved.active)
		{
			opened.push(id);
		}
	});

	onetype.Emit('layouts.open', { ids: opened });

	return state;
});
