onetype.MiddlewareIntercept('boot', async (context) =>
{
	await applications.Find().many(true);
	await context.next();
});
