import onetype from '@onetype/framework';

onetype.DataSchema('workspace.team', {
	id: {
		type: 'number',
		description: 'Unique team id.'
	},
	name: {
		type: 'string',
		description: 'Team name shown across the platform.'
	},
	description: {
		type: 'string',
		description: 'Short text about what the team is.'
	},
	created_at: {
		type: 'string',
		description: 'Timestamp of when the team was created.'
	},
	updated_at: {
		type: 'string',
		description: 'Timestamp of the last change.'
	}
});
