onetype.EmitOn('settings.ready', () =>
{
	for(const item of Object.values(shortcuts.Items()))
	{
		const entry = explorer.ItemGet('shortcut-' + item.Get('id'));

		if(entry)
		{
			entry.Set('hint', item.Fn('hint'));
		}
	}
});
