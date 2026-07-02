import commands from '@onetype/framework/commands';
import projects from '#shared/system/projects/addon.js';

commands.Item({
	id: 'projects:list',
	exposed: true,
	method: 'GET',
	endpoint: '/api/projects',
	in: 'database.query',
	out: {
		items: {
			type: 'array',
			value: [],
			each: { type: 'object', config: 'project' }
		},
		total: ['number', 0, true],
		page: ['number', 1, true],
		limit: ['number', 10, true]
	},
	callback: async function(properties, resolve)
	{
		if(!this.http.state.user)
		{
			return resolve(null, 'Login required.', 401);
		}

		const query = projects.Find()
			.filter('team_id', this.http.state.user.team.id)
			.filter('deleted_at', null, 'NULL');

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
			query.sort('updated_at', 'DESC');
		}

		query.limit(properties.limit).page(properties.page);

		const [items, total] = await Promise.all([
			query.many(),
			projects.Find()
				.filter('team_id', this.http.state.user.team.id)
				.filter('deleted_at', null, 'NULL')
				.count()
		]);

		resolve({
			items: items.map((item) => item.GetData()),
			total,
			page: properties.page,
			limit: properties.limit
		});
	}
});
