import onetype from '@onetype/framework';

onetype.DataSchema('project', {
	id: {
		type: 'string',
		description: 'Unique project id, the database primary key.'
	},
	team_id: {
		type: 'string',
		description: 'Id of the team that owns the project.'
	},
	name: {
		type: 'string',
		required: true,
		description: 'Project name shown in the switcher and headers.'
	},
	description: {
		type: 'string',
		description: 'Short human description of what the project is.'
	},
	color: {
		type: 'string',
		description: 'Accent color of the project as an rgba string.'
	},
	config: {
		type: 'object',
		value: {},
		required: true,
		description: 'Free-form project settings, anything without its own column.'
	},
	applications: {
		type: 'array',
		value: [],
		required: true,
		description: 'Applications installed on the project, each with its own saved config.',
		each: {
			type: 'object',
			description: 'One installed application entry.',
			config: {
				slug: {
					type: 'string',
					required: true,
					description: 'Slug of the installed application.'
				},
				data: {
					type: 'object',
					value: {},
					required: true,
					description: 'Per-project config for this application.'
				}
			}
		}
	},
	updated_at: {
		type: 'string',
		description: 'ISO timestamp of the last update.'
	},
	created_at: {
		type: 'string',
		description: 'ISO timestamp of when the project was created.'
	},
	deleted_at: {
		type: 'string',
		description: 'ISO timestamp of soft deletion, null while active.'
	}
});
