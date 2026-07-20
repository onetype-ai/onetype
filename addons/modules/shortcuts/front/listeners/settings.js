onetype.EmitOn('modules.settings.ready', () =>
{
	for(const item of Object.values($ot.modules.shortcuts.Items()))
	{
		const entry = $ot.ui.explorer.ItemGet('shortcut-' + item.Get('id'));

		if(entry)
		{
			entry.Set('hint', item.Fn('hint'));
		}
	}
});
