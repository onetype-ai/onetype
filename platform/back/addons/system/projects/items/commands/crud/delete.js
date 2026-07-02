import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';

commands.Item({
	id: 'projects:delete',
	exposed: true,
	method: 'DELETE',
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

		const result = await onetype.PipelineRun('projects:delete', {
			id: properties.id,
			team_id: this.http.state.user.team.id
		}, { state: this.http.state });

		if(result.code !== 200)
		{
			return resolve(null, result.message, result.code);
		}

		resolve(result.data.project.GetData());
	}
});
