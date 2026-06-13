assistants.Fn('item.forget', function(item, preference)
{
	const preferences = item.Get('preferences');
	const index = preferences.indexOf(preference);

	if(index === -1)
	{
		return false;
	}

	preferences.splice(index, 1);
	item.Set('preferences', preferences);
	item.Fn('persist');

	onetype.Emit('assistants.forget', { id: item.Get('id'), preference });

	return true;
});
