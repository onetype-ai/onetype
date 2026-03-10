import commands from '@onetype/framework/commands';
import pages from '#pages/addon.js';

commands.Item({
    id: 'pages:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/pages',
    in: {
        team_id: ['string', null, true],
        site_id: ['string', null, true],
        title: ['string', null, true],
        route: ['string', null, true]
    },
    out: {
        page: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const page = pages.Item({
            team_id: properties.team_id,
            site_id: properties.site_id,
            title: properties.title,
            route: properties.route
        });

        await page.Create();

        resolve({
            page: page.Get(['id', 'team_id', 'site_id', 'title', 'route', 'updated_at', 'created_at'])
        });
    }
});
