import onetype from '@onetype/framework';
import database from '@onetype/framework/database';
import projects from '#shared/system/projects/addon.js';

onetype.Pipeline('projects:update', {
	description: 'Update a project by id, scoped to its team.',
	wrap: (run) => database.Fn('transaction', (transaction) => run({ transaction })),
	in: {
		id: ['string', null, true],
		team_id: ['string', null, true],
		data: ['object', {}, true]
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

.Join('validate', 20, {
	description: 'Keep only editable fields.',
	requires: ['item'],
	out: {
		allowed: ['object']
	},
	callback: async ({ data }) =>
	{
		const whitelist = ['name', 'description', 'color', 'config'];
		const allowed = {};

		whitelist.forEach((key) =>
		{
			if(data[key] !== undefined)
			{
				allowed[key] = data[key];
			}
		});

		return { allowed };
	}
})

.Join('save', 30, {
	description: 'Apply the changes and persist.',
	requires: ['item', 'allowed'],
	out: {
		project: ['object']
	},
	callback: async function({ item, allowed })
	{
		for(const [key, value] of Object.entries(allowed))
		{
			item.Set(key, value);
		}

		await item.Update({ connection: this.wrap.transaction, whitelist: Object.keys(allowed) });

		return { project: item };
	}
});
