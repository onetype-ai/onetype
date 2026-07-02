const permissions = onetype.Addon('permissions', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		description: 'Unique permission id, the database primary key.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Permission slug like items.create or site.publish. The stable key checked when granting access.'
	});

	addon.Field('label', {
		type: 'string',
		description: 'Human readable permission name shown in the UI.'
	});

	addon.Field('description', {
		type: 'string',
		description: 'Explains what the permission allows.'
	});

	addon.Field('application_id', {
		type: 'string',
		description: 'Id of the application this permission belongs to. Null for global platform permissions.'
	});

	addon.Field('updated_at', {
		type: 'string',
		description: 'ISO timestamp of the last update.'
	});

	addon.Field('created_at', {
		type: 'string',
		description: 'ISO timestamp of when the permission was created.'
	});

	addon.Field('deleted_at', {
		type: 'string',
		description: 'ISO timestamp of soft deletion, null while the permission is active.'
	});
});
