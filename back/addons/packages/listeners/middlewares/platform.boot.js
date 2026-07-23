import platform from '#platform/addon.js';

onetype.middlewares.intercept('platform.boot', async (middleware) =>
{
    await platform.packages.Fn('sync');
    await platform.packages.Fn('load');

    await middleware.next();
});
