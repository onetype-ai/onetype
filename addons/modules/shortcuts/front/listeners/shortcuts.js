onetype.EmitOn('modules.shortcuts.rebind', (change) =>
{
	const item = $ot.modules.shortcuts.ItemGet(change.id);
	const entry = $ot.ui.explorer.ItemGet('shortcut-' + change.id);

	if(item && entry)
	{
		entry.Set('hint', item.Fn('hint'));
	}
});
