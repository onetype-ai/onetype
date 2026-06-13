assistants.Fn('item.persist', function(item)
{
	const map = settings.Fn('get', 'assistants.preferences', {});

	map[item.Get('id')] = item.Get('preferences');
	settings.Fn('set', 'assistants.preferences', map);
});
