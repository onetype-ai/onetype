import commands from '@onetype/framework/commands';
import categories from '#categories/addon.js';

commands.Item({
    id: 'categories:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/categories/:id',
    in: {
        id: ['string', null, true]
    },
    out: {
        category: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const item = await categories.Find()
            .filter('id', properties.id)
            .one();

        if(!item)
        {
            return resolve(null, 'Not found.', 404);
        }

        resolve({ category: item.Get(['id', 'name', 'slug', 'icon', 'order', 'updated_at', 'created_at']) });
    }
});
