extensions.Fn('categories', function()
{
	const counts = {};

	Object.values(this.Items()).forEach((item) =>
	{
		const category = item.Get('category');

		counts[category] = (counts[category] || 0) + 1;
	});

	return Object.keys(counts).sort().map((category) => ({ category, count: counts[category] }));
});
