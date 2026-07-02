import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';

commands.Item({
	id: 'projects:applications:uninstall',
	exposed: true,
	method: 'DELETE',
	endpoint: '/api/projects/applications/:slug',
	in: {
		slug: ['string', null, true]
	},
	out: 'project',
	condition: function(properties)
	{
		if(!this.http.state.user)
		{
			return 'Login required.';
		}

		if(!this.http.state.project)
		{
			return 'No project is open.';
		}

		if(!this.http.state.project.applications.find((entry) => entry.slug === properties.slug))
		{
			return 'Application "' + properties.slug + '" is not installed on this project.';
		}
	},
	callback: async function(properties, resolve)
	{
		const result = await onetype.PipelineRun('projects:applications:uninstall', {
			id: this.http.state.project.id,
			team_id: this.http.state.user.team.id,
			slug: properties.slug
		}, { state: this.http.state });

		if(result.code !== 200)
		{
			return resolve(null, result.message, result.code);
		}

		resolve(result.data.project.GetData());
	}
});
