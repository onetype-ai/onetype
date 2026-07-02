presets.Fn('item.visible', function(item)
{
	const app = $ot.settings.get('ui.apps.active', 'builder');
	const apps = item.Get('app');

	if(apps.length && !apps.includes(app))
	{
		return false;
	}

	const list = item.Get('mode');

	if(list.length && !list.includes($ot.ui.modes.active()?.Get('id')))
	{
		return false;
	}

	return true;
});
