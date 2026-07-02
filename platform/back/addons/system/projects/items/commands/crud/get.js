import commands from '@onetype/framework/commands';
import projects from '#shared/system/projects/addon.js';

commands.Item({
	id: 'projects:get',
	exposed: true,
	method: 'GET',
	endpoint: '/api/projects/:id',
	in: {
		id: ['string', null, true]
	},
	out: 'project',
	callback: async function(properties, resolve)
	{
		if(!this.http.state.user)
		{
			return resolve(null, 'Login required.', 401);
		}

		const item = await projects.Find()
			.filter('id', properties.id)
			.filter('team_id', this.http.state.user.team.id)
			.filter('deleted_at', null, 'NULL')
			.one();

		if(!item)
		{
			return resolve(null, 'Project not found.', 404);
		}

		resolve(item.GetData());
	}
});
