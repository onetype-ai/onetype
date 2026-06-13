extensions.Fn('list', function(filters = {})
{
	const query = (filters.query || '').trim().toLowerCase();
	const category = filters.category || 'all';

	return Object.values(this.Items()).sort((a, b) => (b.Get('rating') - a.Get('rating')) || (a.Get('order') - b.Get('order'))).filter((item) =>
	{
		if(query)
		{
			return (item.Get('name') + ' ' + item.Get('description') + ' ' + item.Get('category')).toLowerCase().includes(query);
		}

		if(category === 'all')
		{
			return true;
		}

		if(category === 'featured')
		{
			return item.Get('featured');
		}

		if(category === 'trending')
		{
			return item.Get('trending');
		}

		if(category === 'installed')
		{
			return item.Get('installed');
		}

		return item.Get('category') === category;
	}).map((item) =>
	{
		return {
			id: item.Get('id'),
			name: item.Get('name'),
			icon: item.Get('icon'),
			color: item.Get('color'),
			description: item.Get('description'),
			author: item.Get('author'),
			official: item.Get('official'),
			category: item.Get('category'),
			rating: item.Get('rating'),
			reviews: item.Get('reviews'),
			price: item.Get('price'),
			featured: item.Get('featured'),
			trending: item.Get('trending'),
			installed: item.Get('installed')
		};
	});
});
