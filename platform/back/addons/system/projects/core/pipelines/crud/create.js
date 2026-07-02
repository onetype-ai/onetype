import onetype from '@onetype/framework';
import database from '@onetype/framework/database';
import projects from '#shared/system/projects/addon.js';

onetype.Pipeline('projects:create', {
	description: 'Create a project for a team.',
	wrap: (run) => database.Fn('transaction', (transaction) => run({ transaction })),
	in: {
		team_id: ['string', null, true],
		name: ['string', null, true],
		description: ['string', ''],
		color: ['string', '']
	},
	out: {
		project: ['object', null, true]
	}
})

.Join('validate', 10, {
	description: 'Verify the project has a name.',
	callback: async ({ name }, resolve) =>
	{
		if(!name || !name.trim())
		{
			return resolve(null, 'Project must have a name.', 400);
		}
	}
})

.Join('create', 20, {
	description: 'Create the project record.',
	out: {
		project: ['object']
	},
	callback: async function({ team_id, name, description, color })
	{
		const project = projects.Item({
			team_id,
			name,
			description,
			color
		});

		await project.Create({ connection: this.wrap.transaction });

		return { project };
	}
});
