shortcuts.Fn('item.active', function(item, event)
{
	if(!item.Fn('enabled'))
	{
		return false;
	}

	const app = settings.Fn('get', 'apps.active', 'builder');
	const apps = item.Get('app');

	if(apps.length && !apps.includes(app))
	{
		return false;
	}

	const list = item.Get('mode');

	if(list.length && !list.includes(modes.Fn('active', app)))
	{
		return false;
	}

	const condition = item.Get('condition');

	if(condition && !condition(event))
	{
		return false;
	}

	return true;
});
