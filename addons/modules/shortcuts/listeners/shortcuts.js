onetype.EmitOn('modules.shortcuts.rebind', (change) =>
{
	const item = modules.shortcuts.ItemGet(change.id);
	const entry = ui.explorer.ItemGet('shortcut-' + change.id);

	if(item && entry)
	{
		entry.Set('hint', item.Fn('hint'));
	}
});
