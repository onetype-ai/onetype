import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';

commands.Item({
	id: 'projects:create',
	exposed: true,
	method: 'POST',
	endpoint: '/api/projects',
	in: 'project --skip=id --skip=team_id --skip=updated_at --skip=created_at --skip=deleted_at',
	out: 'project',
	callback: async function(properties, resolve)
	{
		if(!this.http.state.user)
		{
			return resolve(null, 'Login required.', 401);
		}

		const result = await onetype.PipelineRun('projects:create', {
			team_id: this.http.state.user.team.id,
			name: properties.name,
			description: properties.description,
			color: properties.color
		}, { state: this.http.state });

		if(result.code !== 200)
		{
			return resolve(null, result.message, result.code);
		}

		resolve(result.data.project.GetData());
	}
});
