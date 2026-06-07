modes.Fn('active', function(app)
{
	const map = settings.Fn('get', 'modes.active', {});

	if(map[app])
	{
		return map[app];
	}

	const fallback = Object.values(this.Items()).find((item) => item.Get('app') === app && item.Get('default'));

	return fallback ? fallback.Get('id') : null;
});
