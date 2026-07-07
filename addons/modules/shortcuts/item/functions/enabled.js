modules.shortcuts.Fn('item.enabled', function(item)
{
	const settings = onetype.AddonGet('modules.settings');
	const entry = settings && $ot.modules.settings.get('modules.shortcuts.state', {})[item.Get('id')];

	return entry && 'enabled' in entry ? entry.enabled : item.Get('enabled');
});
