modes.Fn('list', function()
{
	const app = settings.Fn('get', 'apps.active', 'builder');

	return Object.values(this.Items()).sort((a, b) => a.Get('order') - b.Get('order')).filter((item) =>
	{
		return item.Get('app') === app;
	}).map((item) =>
	{
		return {id: item.Get('id'), icon: item.Get('icon'), label: item.Get('label'), active: item.Get('active')};
	});
});
