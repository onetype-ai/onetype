import platform from '#platform/addon.js';

platform.runtimes.Fn('find.match', function(hostname, pathname)
{
    let matched = null;
    let score = -1;

    for(const item of Object.values(platform.runtimes.Items()))
    {
        const domain = item.Get('domain');
        const path = item.Get('path');

        if(!domain)
        {
            continue;
        }

        if(domain !== '*' && domain !== hostname)
        {
            continue;
        }

        if(!onetype.route.match(path === '/' ? '/*' : path + '/*', pathname).match)
        {
            continue;
        }

        const specificity = (domain !== '*' ? 1000 : 0) + path.length;

        if(specificity > score)
        {
            matched = item;
            score = specificity;
        }
    }

    return matched;
});
