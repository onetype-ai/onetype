modules.shortcuts.Fn('item.key', function(item)
{
	const settings = onetype.AddonGet('modules.settings');
	const entry = settings && $ot.modules.settings.get('modules.shortcuts.state', {})[item.Get('id')];

	return entry && entry.key ? entry.key : item.Get('key');
});
