import onetype from '@onetype/framework';
import database from '@onetype/framework/database';
import projects from '#shared/system/projects/addon.js';
import applications from '#shared/system/applications/addon.js';

onetype.Pipeline('projects:applications:install', {
	description: 'Install an application onto a project, validating the passed data against the application config.',
	wrap: (run) => database.Fn('transaction', (transaction) => run({ transaction })),
	in: {
		id: ['string', null, true],
		team_id: ['string', null, true],
		slug: ['string', null, true],
		data: ['object', {}, true]
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

.Join('application', 20, {
	description: 'Load the application from the catalog by slug.',
	out: {
		application: ['object']
	},
	callback: async ({ slug }, resolve) =>
	{
		const application = await applications.Find()
			.filter('slug', slug)
			.filter('is_active', true)
			.filter('deleted_at', null, 'NULL')
			.one();

		if(!application)
		{
			return resolve(null, 'Application "' + slug + '" not found.', 404);
		}

		return { application };
	}
})

.Join('validate', 30, {
	description: 'Validate the passed data against the application config.',
	requires: ['application'],
	callback: async ({ application, data }, resolve) =>
	{
		try
		{
			onetype.DataDefine(data, application.Get('config'), true);
		}
		catch(error)
		{
			return resolve(null, 'Invalid config for "' + application.Get('slug') + '": ' + error.message, 400);
		}
	}
})

.Join('install', 40, {
	description: 'Add the application to the project, replacing any existing entry for the same slug.',
	requires: ['project', 'application'],
	out: {
		project: ['object']
	},
	callback: async function({ project, application, data })
	{
		const slug = application.Get('slug');
		const list = (project.Get('applications') || []).filter((entry) => entry.slug !== slug);

		list.push({ slug, data });

		project.Set('applications', list);

		await project.Update({ connection: this.wrap.transaction, whitelist: ['applications'] });

		return { project };
	}
});
