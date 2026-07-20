$ot.modules.shortcuts.ItemOn('removed', (item) =>
{
	$ot.ui.explorer.ItemRemove('shortcut-' + item.Get('id'));
});
