navbar.ItemOn('removed', (item) =>
{
	if(item.Get('render'))
	{
		navbar.RenderRemove(item.Get('id'));
	}
});
