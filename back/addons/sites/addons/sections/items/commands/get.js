import commands from '@onetype/framework/commands';
import sections from '#sections/addon.js';

commands.Item({
    id: 'sections:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/sections/:id',
    in: {
        id: ['string', null, true]
    },
    out: {
        section: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const item = await sections.Find()
            .filter('id', properties.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({ section: item.Get(['id', 'team_id', 'page_id', 'order', 'updated_at', 'created_at']) });
    }
});
