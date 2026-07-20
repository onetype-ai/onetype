$ot.modules.shortcuts.ItemOn('modified', (item) =>
{
	const entry = $ot.ui.explorer.ItemGet('shortcut-' + item.Get('id'));

	if(entry)
	{
		entry.Set('label', item.Get('name') || item.Get('id'));
		entry.Set('hint', item.Fn('hint'));
	}
});
