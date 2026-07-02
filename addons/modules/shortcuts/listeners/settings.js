onetype.EmitOn('settings.ready', () =>
{
	for(const item of Object.values(modules.shortcuts.Items()))
	{
		const entry = ui.explorer.ItemGet('shortcut-' + item.Get('id'));

		if(entry)
		{
			entry.Set('hint', item.Fn('hint'));
		}
	}
});
