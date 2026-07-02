import commands from '@onetype/framework/commands';
import permissions from '#shared/system/permissions/addon.js';

commands.Item({
	id: 'permissions:list',
	exposed: true,
	method: 'GET',
	endpoint: '/api/permissions',
	in: 'database.query',
	out: {
		items: {
			type: 'array',
			value: [],
			each: { type: 'object', config: 'permission' }
		},
		total: ['number', 0, true]
	},
	callback: async function(properties, resolve)
	{
		const query = permissions.Find().filter('deleted_at', null, 'NULL');

		for(const filter of properties.filters || [])
		{
			query.filter(filter.field, filter.value, filter.operator);
		}

		if(properties.sort_field)
		{
			query.sort(properties.sort_field, properties.sort_direction);
		}
		else
		{
			query.sort('name', 'ASC');
		}

		const [items, total] = await Promise.all([
			query.many(),
			permissions.Find().filter('deleted_at', null, 'NULL').count()
		]);

		resolve({ items: items.map((item) => item.GetData()), total });
	}
});
