modules.shortcuts.Fn('item.enabled', function(item)
{
	const entry = $ot.modules.settings.get('modules.shortcuts.state', {})[item.Get('id')];

	return entry && 'enabled' in entry ? entry.enabled : item.Get('enabled');
});
