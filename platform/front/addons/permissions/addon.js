const permissions = onetype.Addon('permissions', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique permission id, like pages:delete.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Human readable permission name.'
	});

	addon.Field('app', {
		type: 'string',
		required: true,
		description: 'ID of the app the permission belongs to.'
	});
});
