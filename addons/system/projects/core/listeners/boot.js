onetype.MiddlewareIntercept('boot', async (context) =>
{
	if(!$ot.get('user'))
	{
		return await context.next();
	}

	await projects.Find().many(true);
});
