shortcuts.Fn('item.enabled', function(item)
{
	const settings = onetype.AddonGet('settings');
	const entry = settings && settings.Fn('get', 'shortcuts.state', {})[item.Get('id')];

	return entry && 'enabled' in entry ? entry.enabled : item.Get('enabled');
});
