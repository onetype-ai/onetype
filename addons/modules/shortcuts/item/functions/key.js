modules.shortcuts.Fn('item.key', function(item)
{
	const entry = $ot.modules.settings.get('modules.shortcuts.state', {})[item.Get('id')];

	return entry && entry.key ? entry.key : item.Get('key');
});
