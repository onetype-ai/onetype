import commands from '@onetype/framework/commands';
import categories from '#categories/addon.js';

commands.Item({
    id: 'categories:list',
    exposed: true,
    method: 'GET',
    endpoint: '/api/categories',
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
        categories: ['array', null, true]
    },
    callback: async function(properties, resolve)
    {
        let query = categories.Find();

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

        resolve({ categories: items.map(item => item.Get(['id', 'name', 'slug', 'icon', 'order', 'updated_at', 'created_at'])) });
    }
});
