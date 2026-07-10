import commands from '@onetype/framework/commands';
import documentation from '../../../../../shared/load.js';

commands.Item({
	id: 'documentation:articles:list',
	exposed: true,
	in: {
		filters: {
			type: 'array',
			value: [],
			each: {
				type: 'object',
				config: 'database.filter'
			}
		},
		query: {
			type: 'object',
			value: {},
			config: 'database.query'
		}
	},
	out: {
		items: {
			type: 'array',
			value: [],
			each: { type: 'object', config: 'documentation.article' }
		},
		total: ['number', 0, true]
	},
	callback: async function(properties, resolve)
	{
		const query = documentation.articles.Find().filter('deleted_at', null, 'NULL');

		for(const filter of properties.filters || [])
		{
			query.filter(filter.field, filter.value, filter.operator);
		}

		if(properties.query.sort_field)
		{
			query.sort(properties.query.sort_field, properties.query.sort_direction);
		}
		else
		{
			query.sort('order', 'ASC');
		}

		query.page(properties.query.page).limit(properties.query.limit);

		const [items, total] = await Promise.all([
			query.many(),
			documentation.articles.Find().filter('deleted_at', null, 'NULL').count()
		]);

		resolve({ items: items.map((item) => item.GetData()), total });
	}
});
