import commands from '@onetype/framework/commands';
import applications from '#shared/system/applications/addon.js';

commands.Item({
	id: 'applications:list',
	exposed: true,
	method: 'GET',
	endpoint: '/api/applications',
	in: 'database.query',
	out: {
		items: {
			type: 'array',
			value: [],
			each: { type: 'object', config: 'application' }
		},
		total: ['number', 0, true]
	},
	callback: async function(properties, resolve)
	{
		const query = applications.Find().filter('is_active', true);

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
			query.sort('order', 'ASC');
		}

		const [items, total] = await Promise.all([
			query.many(),
			applications.Find().filter('is_active', true).count()
		]);

		resolve({ items: items.map((item) => item.GetData()), total });
	}
});
