modules.shortcuts.ItemOn('removed', (item) =>
{
	ui.explorer.ItemRemove('shortcut-' + item.Get('id'));
});
