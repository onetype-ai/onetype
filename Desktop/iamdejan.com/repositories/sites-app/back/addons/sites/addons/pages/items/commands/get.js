import commands from '@onetype/framework/commands';
import pages from '#pages/addon.js';

commands.Item({
    id: 'pages:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/pages/:id',
    in: {
        id: ['string', null, true]
    },
    out: {
        page: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const item = await pages.Find()
            .filter('id', properties.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({ page: item.Get(['id', 'team_id', 'site_id', 'title', 'route', 'updated_at', 'created_at']) });
    }
});
