import onetype from '@onetype/framework';

onetype.DataSchema('permission', {
	id: {
		type: 'string',
		description: 'Unique permission id, the database primary key.'
	},
	name: {
		type: 'string',
		required: true,
		description: 'Permission slug like items.create or site.publish, the stable key checked when granting access.'
	},
	label: {
		type: 'string',
		description: 'Human readable permission name shown in the UI.'
	},
	description: {
		type: 'string',
		description: 'Explains what the permission allows.'
	},
	application_id: {
		type: 'string',
		description: 'Id of the application this permission belongs to. Null for global platform permissions.'
	},
	updated_at: {
		type: 'string',
		description: 'ISO timestamp of the last update.'
	},
	created_at: {
		type: 'string',
		description: 'ISO timestamp of when the permission was created.'
	},
	deleted_at: {
		type: 'string',
		description: 'ISO timestamp of soft deletion, null while active.'
	}
});
