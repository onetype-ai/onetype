apps.Fn('list', function()
{
	const active = settings.Fn('get', 'apps.active', 'builder');

	return Object.values(this.Items()).sort((a, b) => a.Get('order') - b.Get('order')).map((item) =>
	{
		return {
			id: item.Get('id'),
			icon: item.Get('icon'),
			label: item.Get('label'),
			position: item.Get('position'),
			active: item.Get('id') === active
		};
	});
});
