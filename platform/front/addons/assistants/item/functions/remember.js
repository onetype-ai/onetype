assistants.Fn('item.remember', function(item, preference)
{
	const preferences = item.Get('preferences');

	if(preferences.includes(preference))
	{
		return false;
	}

	preferences.push(preference);
	item.Set('preferences', preferences);
	item.Fn('persist');

	onetype.Emit('assistants.remember', { id: item.Get('id'), preference });

	return true;
});
