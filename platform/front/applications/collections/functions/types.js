collections.Fn('types', function()
{
	const order = ['Basic', 'Value', 'Media', 'Relational', 'Structure', 'Commerce', 'Advanced'];
	const groups = {};

	for(const item of Object.values(this.types.Items()))
	{
		const name = item.Get('group');
		const group = groups[name] = groups[name] || { title: name, types: [] };

		group.types.push({
			id: item.Get('id'),
			name: item.Get('name'),
			icon: item.Get('icon'),
			description: item.Get('description')
		});
	}

	return Object.values(groups).sort((a, b) =>
	{
		const first = order.indexOf(a.title);
		const second = order.indexOf(b.title);

		if(first === -1 && second === -1)
		{
			return a.title.localeCompare(b.title);
		}

		if(first === -1 || second === -1)
		{
			return first === -1 ? 1 : -1;
		}

		return first - second;
	});
});
