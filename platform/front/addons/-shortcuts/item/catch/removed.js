shortcuts.ItemOn('removed', (item) =>
{
	explorer.ItemRemove('shortcut-' + item.Get('id'));
});
