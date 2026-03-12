commands.ItemOn('remove', (item) =>
{
	agents.ItemGet(item.Get('id'))?.Remove();
});