import platform from '#platform/addon.js';

onetype.middlewares.intercept('servers.http.request', async (middleware) =>
{
    const http = middleware.value;

    const list = {};

    const properties = ['slug', 'name', 'description', 'icon', 'color', 'core', 'depends', 'bundle', 'runtimes', 'status', 'message', 'permissions', 'features', 'config', 'limits'];

    for(const item of Object.values(platform.packages.Items()))
    {
        list[item.Get('slug')] = item.Get(properties);
    }

    http.state.packages = list;

    await middleware.next();
});
