import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';

commands.Item({
	id: 'projects:applications:install',
	exposed: true,
	method: 'POST',
	endpoint: '/api/projects/applications',
	in: {
		slug: ['string', null, true],
		data: ['object', {}, true]
	},
	out: 'project',
	condition: function()
	{
		if(!this.http.state.user)
		{
			return 'Login required.';
		}

		if(!this.http.state.project)
		{
			return 'No project is open.';
		}
	},
	callback: async function(properties, resolve)
	{
		const result = await onetype.PipelineRun('projects:applications:install', {
			id: this.http.state.project.id,
			team_id: this.http.state.user.team.id,
			slug: properties.slug,
			data: properties.data
		}, { state: this.http.state });

		if(result.code !== 200)
		{
			return resolve(null, result.message, result.code);
		}

		resolve(result.data.project.GetData());
	}
});
