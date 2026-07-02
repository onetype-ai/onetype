import applications from '#shared/system/applications/addon.js';

applications.Expose({
	filter: ['id', 'slug', 'is_active', 'is_global'],
	sort: ['order', 'name', 'updated_at', 'created_at'],
	select: [
		'id', 'slug', 'name', 'icon', 'color', 'description', 'overview',
		'cover', 'images', 'order', 'is_active', 'is_global', 'depends', 'config',
		'updated_at', 'created_at'
	]
});
