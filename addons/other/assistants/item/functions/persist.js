assistants.Fn('item.persist', function(item)
{
	const map = $ot.settings.get('assistants.preferences', {});

	map[item.Get('id')] = item.Get('preferences');
	$ot.settings.set('assistants.preferences', map);
});
