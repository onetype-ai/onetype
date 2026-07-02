import onetype from '@onetype/framework';
import database from '@onetype/framework/database';
import projects from '#shared/system/projects/addon.js';

onetype.Pipeline('projects:delete', {
	description: 'Soft delete a project by id, scoped to its team.',
	wrap: (run) => database.Fn('transaction', (transaction) => run({ transaction })),
	in: {
		id: ['string', null, true],
		team_id: ['string', null, true]
	},
	out: {
		project: ['object', null, true]
	}
})

.Join('load', 10, {
	description: 'Load the project and verify it belongs to the team.',
	out: {
		item: ['object']
	},
	callback: async ({ id, team_id }, resolve) =>
	{
		const item = await projects.Find()
			.filter('id', id)
			.filter('team_id', team_id)
			.one();

		if(!item)
		{
			return resolve(null, 'Project not found.', 404);
		}

		return { item };
	}
})

.Join('delete', 20, {
	description: 'Mark the project as deleted.',
	requires: ['item'],
	out: {
		project: ['object']
	},
	callback: async function({ item })
	{
		item.Set('deleted_at', new Date().toISOString());

		await item.Update({ connection: this.wrap.transaction, whitelist: ['deleted_at'] });

		return { project: item };
	}
});
