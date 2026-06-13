status.ItemOn('removed', (item) =>
{
	if(item.Get('render'))
	{
		status.RenderRemove(item.Get('id'));
	}
});
