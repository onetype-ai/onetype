presets.Fn('list', function(group)
{
	return Object.values(this.Items()).filter((item) =>
	{
		return item.Fn('visible') && (!group || item.Get('group') === group);
	}).sort((a, b) => (a.Get('group') > b.Get('group') ? 1 : -1) || (a.Get('order') - b.Get('order'))).map((item) =>
	{
		return {
			id: item.Get('id'),
			group: item.Get('group'),
			app: item.Get('app'),
			mode: item.Get('mode'),
			name: item.Get('name'),
			icon: item.Get('icon'),
			description: item.Get('description'),
			config: item.Get('config')
		};
	});
});
