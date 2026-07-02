import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';

commands.Item({
	id: 'projects:update',
	exposed: true,
	method: 'PUT',
	endpoint: '/api/projects/:id',
	in: 'project --optional --pick=id --pick=name --pick=description --pick=color --pick=config',
	out: 'project',
	callback: async function(properties, resolve)
	{
		if(!this.http.state.user)
		{
			return resolve(null, 'Login required.', 401);
		}

		const { id, ...data } = properties;

		const result = await onetype.PipelineRun('projects:update', {
			id,
			team_id: this.http.state.user.team.id,
			data
		}, { state: this.http.state });

		if(result.code !== 200)
		{
			return resolve(null, result.message, result.code);
		}

		resolve(result.data.project.GetData());
	}
});
