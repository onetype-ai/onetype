editor.toolbar.ItemOn('add', (item) =>
{
	const render = item.Get('render');

	if(render)
	{
		editor.toolbar.RenderAdd(item.Get('id'), function()
		{
			if(typeof render === 'function')
			{
				return render.call(this);
			}

			return render;
		});
	}
});