import categories from '#categories/addon.js';

categories.Expose({
    filter: ['id', 'name'],
    sort: ['name', 'order', 'updated_at', 'created_at'],
    select: [
        'id', 'name', 'slug', 'icon', 'order', 'updated_at', 'created_at'
    ]
});
