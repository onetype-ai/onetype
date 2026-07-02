import permissions from '#shared/system/permissions/addon.js';

permissions.Expose({
	filter: ['id', 'name', 'application_id'],
	sort: ['name', 'created_at', 'updated_at'],
	select: [
		'id', 'name', 'label', 'description', 'application_id', 'updated_at', 'created_at'
	]
});
