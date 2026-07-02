onetype.MiddlewareIntercept('boot', async (context) =>
{
	await permissions.Find().many(true);

	await context.next();
});
