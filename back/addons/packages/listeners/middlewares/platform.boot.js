import platform from '#platform/addon.js';

onetype.MiddlewareIntercept('platform.boot', async (middleware) =>
{
    await platform.packages.Fn('sync');
    await platform.packages.Fn('load');

    await middleware.next();
});
