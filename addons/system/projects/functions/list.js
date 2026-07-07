projects.Fn('list', function()
{
	const active = $ot.modules.settings.get('projects.active', null);

	return Object.values(this.Items()).sort((a, b) => a.Get('name').localeCompare(b.Get('name'))).map((item) =>
	{
		return {
			id: item.Get('id'),
			name: item.Get('name'),
			color: item.Get('color'),
			active: item.Get('id') === active
		};
	});
});
