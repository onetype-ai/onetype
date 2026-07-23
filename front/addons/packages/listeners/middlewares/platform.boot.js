onetype.middlewares.intercept('platform.boot', async (context) =>
{
    platform.packages.ItemsAdd(Object.values($ot.get('packages')));

    await context.next();
});
