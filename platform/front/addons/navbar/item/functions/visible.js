navbar.Fn('item.visible', function(item)
{
	if(!item.Get('active'))
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

	return true;
});
