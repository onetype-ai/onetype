import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'sites:delete',
    exposed: true,
    method: 'DELETE',
    endpoint: '/api/sites/:id',
    in: {
        id: ['string', null, true]
    },
    out: {},
    callback: async function(properties, resolve)
    {
        const site = await sites.Find()
            .filter('id', properties.id)
            .one();

        if(!site)
        {
            return resolve(null, 'Not found.', 404);
        }

        site.Set('deleted_at', new Date().toISOString());
        await site.Update();

        resolve({});
    }
});
