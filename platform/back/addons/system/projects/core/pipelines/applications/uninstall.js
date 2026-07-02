import onetype from '@onetype/framework';
import database from '@onetype/framework/database';
import projects from '#shared/system/projects/addon.js';

onetype.Pipeline('projects:applications:uninstall', {
	description: 'Uninstall an application from a project by slug.',
	wrap: (run) => database.Fn('transaction', (transaction) => run({ transaction })),
	in: {
		id: ['string', null, true],
		team_id: ['string', null, true],
		slug: ['string', null, true]
	},
	out: {
		project: ['object', null, true]
	}
})

.Join('project', 10, {
	description: 'Load the project and verify it belongs to the team.',
	out: {
		project: ['object']
	},
	callback: async ({ id, team_id }, resolve) =>
	{
		const project = await projects.Find()
			.filter('id', id)
			.filter('team_id', team_id)
			.filter('deleted_at', null, 'NULL')
			.one();

		if(!project)
		{
			return resolve(null, 'Project not found.', 404);
		}

		return { project };
	}
})

.Join('uninstall', 20, {
	description: 'Remove the application entry from the project.',
	requires: ['project'],
	out: {
		project: ['object']
	},
	callback: async function({ project, slug }, resolve)
	{
		const list = project.Get('applications') || [];

		if(!list.some((entry) => entry.slug === slug))
		{
			return resolve(null, 'Application "' + slug + '" is not installed on this project.', 404);
		}

		project.Set('applications', list.filter((entry) => entry.slug !== slug));

		await project.Update({ connection: this.wrap.transaction, whitelist: ['applications'] });

		return { project };
	}
});
