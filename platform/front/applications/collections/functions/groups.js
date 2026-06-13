collections.Fn('groups', function()
{
	const all = Object.values(this.Items());
	const sort = (list) => list.sort((a, b) => a.Get('order') - b.Get('order'));
	const groups = {};

	const entry = (item, depth) =>
	{
		return {
			icon: item.Get('icon'),
			label: item.Get('name'),
			value: item.Get('id'),
			count: item.Get('kind') === 'list' ? item.Get('count') : null,
			badge: item.Get('kind') === 'settings' ? 'key/value' : null,
			depth
		};
	};

	const walk = (item, depth, items) =>
	{
		items.push(entry(item, depth));

		sort(all.filter((other) => other.Get('parent') === item.Get('id'))).forEach((other) => walk(other, depth + 1, items));
	};

	for(const item of sort(all.filter((item) => !item.Get('parent'))))
	{
		const name = item.Get('group');
		const group = groups[name] = groups[name] || { title: name, items: [] };

		walk(item, 0, group.items);
	}

	return Object.values(groups);
});
