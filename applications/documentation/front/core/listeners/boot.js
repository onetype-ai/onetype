onetype.MiddlewareIntercept('boot', async (context) =>
{
	const [categories, articles] = await Promise.all([
		$ot.command('documentation:categories:list', { query: { limit: 500 } }, true),
		$ot.command('documentation:articles:list', { query: { limit: 500 } }, true)
	]);

	for(const item of categories.data?.items || [])
	{
		documentation.categories.ItemAdd(item);
	}

	for(const item of articles.data?.items || [])
	{
		documentation.articles.ItemAdd(item);
	}

	await context.next();
});
