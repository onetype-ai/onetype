import commands from '@onetype/framework/commands';
import fonts from '#fonts/addon.js';

commands.Item({
    id: 'fonts:list',
    exposed: true,
    method: 'GET',
    endpoint: '/api/fonts',
    in: {
        filters: {
            type: 'array',
            each: {
                type: 'object',
                config: 'filter'
            }
        },
        limit: ['number'],
        offset: ['number']
    },
    out: {
        fonts: ['array', null, true]
    },
    callback: async function(properties, resolve)
    {
        let query = fonts.Find();

        if(properties.filters)
        {
            properties.filters.forEach(filter =>
            {
                query = query.filter(filter.field, filter.value, filter.operator || 'EQUALS');
            });
        }

        if(properties.limit)
        {
            query = query.limit(properties.limit);
        }

        if(properties.offset)
        {
            query = query.offset(properties.offset);
        }

        const items = await query.many();

        resolve({ fonts: items.map(item => item.Get(['id', 'name', 'slug', 'category', 'popular', 'weights', 'styles', 'updated_at', 'created_at'])) });
    }
});
