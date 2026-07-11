import onetype from '@onetype/framework';

onetype.DataSchema('workspace.project', {
	id: {
		type: 'number',
		description: 'Unique project id.'
	},
	team_id: {
		type: 'number',
		description: 'Id of the team the project belongs to.'
	},
	name: {
		type: 'string',
		description: 'Project name shown across the platform.'
	},
	description: {
		type: 'string',
		description: 'Short text about what the project is.'
	},
	color: {
		type: 'string',
		description: 'Accent color as a hex or rgba string.'
	},
	config: {
		type: 'object',
		description: 'Free form project configuration keyed by package.'
	},
	applications: {
		type: 'array',
		each: {
			type: 'string',
			description: 'Slug of a package enabled on the project.'
		},
		description: 'Packages enabled on the project.'
	},
	created_at: {
		type: 'string',
		description: 'Timestamp of when the project was created.'
	},
	updated_at: {
		type: 'string',
		description: 'Timestamp of the last change.'
	}
});
