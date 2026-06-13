navbar.Fn('positions', function()
{
	const positions = {left: [], center: [], right: []};

	Object.values(this.Items()).sort((a, b) => a.Get('order') - b.Get('order')).forEach((item) =>
	{
		if(!item.Fn('visible'))
		{
			return;
		}

		const type = item.Get('type');

		positions[item.Get('position')].push({
			id: item.Get('id'),
			type: typeof type === 'string' ? { id: type } : type,
			icon: item.Get('icon'),
			label: item.Get('label'),
			tooltip: item.Get('tooltip'),
			selected: item.Get('selected'),
			onClick: item.Get('onClick'),
			render: item.Get('render'),
			data: item.Get('data')
		});
	});

	return positions;
});
