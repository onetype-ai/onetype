onetype.MiddlewareIntercept('boot', async (context) =>
{
	await context.next();
});
