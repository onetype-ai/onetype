canvas.ItemOn('removed', (item) =>
{
	if(item.Get('render'))
	{
		canvas.RenderRemove(item.Get('id'));
	}
});
