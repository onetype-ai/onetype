import commands from '@onetype/framework/commands';
import sites from '#sites/addon.js';

commands.Item({
    id: 'sites:create',
    exposed: true,
    method: 'POST',
    endpoint: '/api/sites',
    in: {
        name: ['string', null, true],
        category_id: ['string'],
        description: ['string', ''],
        color: ['string', ''],
        font_ids: ['array', []],
        extension_ids: ['array', []],
        method: ['string', 'ai']
    },
    out: {
        site: ['object', null, true]
    },
    callback: async function(properties, resolve)
    {
        const user = this.http?.state?.user;

        if(!user || !user.team)
        {
            return resolve(null, 'Not authenticated.', 401);
        }

        const site = sites.Item({
            team_id: user.team.id,
            name: properties.name,
            category_id: properties.category_id,
            description: properties.description,
            color: properties.color,
            font_ids: properties.font_ids,
            extension_ids: properties.extension_ids,
            method: properties.method
        });

        await site.Create();

        resolve({
            site: site.Get(['id', 'team_id', 'name', 'category_id', 'description', 'color', 'font_ids', 'extension_ids', 'method', 'is_theme', 'domains', 'updated_at', 'created_at'])
        });
    }
});
