canvas.Fn('restore', function()
{
	const state = settings.Fn('get', 'canvas.state', {});

	Object.entries(state).forEach(([id, saved]) =>
	{
		const item = this.ItemGet(id);

		if(!item)
		{
			return;
		}

		item.Set('x', saved.x, false);
		item.Set('y', saved.y, false);

		if(Array.isArray(saved.links))
		{
			item.Set('links', saved.links, false);
		}
	});

	onetype.Emit('canvas.move', { ids: Object.keys(state) });

	return state;
});
