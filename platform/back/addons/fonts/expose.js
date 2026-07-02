import fonts from '#fonts/addon.js';

fonts.Expose({
	filter: ['id', 'name', 'category', 'popular'],
	sort: ['name', 'category', 'updated_at', 'created_at'],
	select: [
		'id', 'name', 'slug', 'category', 'popular', 'weights', 'styles', 'updated_at', 'created_at'
	]
});
