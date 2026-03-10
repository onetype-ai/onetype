import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'sites:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/sites/:id',
    in: {
        id: ['string', null, true]
    },
    out: {
        site: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const item = await sites.Find()
            .filter('id', properties.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({ site: item.Get(['id', 'team_id', 'name', 'category_id', 'description', 'color', 'font_ids', 'extension_ids', 'method', 'is_theme', 'domains', 'updated_at', 'created_at']) });
    }
});
