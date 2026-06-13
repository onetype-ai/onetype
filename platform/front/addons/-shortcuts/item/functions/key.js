shortcuts.Fn('item.key', function(item)
{
	const settings = onetype.AddonGet('settings');
	const entry = settings && settings.Fn('get', 'shortcuts.state', {})[item.Get('id')];

	return entry && entry.key ? entry.key : item.Get('key');
});
