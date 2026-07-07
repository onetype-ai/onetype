assistants.Fn('item.persist', function(item)
{
	const map = $ot.modules.settings.get('assistants.preferences', {});

	map[item.Get('id')] = item.Get('preferences');
	$ot.modules.settings.set('assistants.preferences', map);
});
