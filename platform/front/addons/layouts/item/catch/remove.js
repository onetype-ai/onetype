layouts.ItemOn('remove', (item) =>
{
	if(item.Get('render'))
	{
		layouts.RenderRemove(item.Get('id'));
	}
});
