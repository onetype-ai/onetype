import sections from '#sections/addon.js';

sections.Expose({
    filter: ['id', 'team_id', 'page_id'],
    sort: ['order', 'updated_at', 'created_at'],
    select: [
        'id', 'team_id', 'page_id', 'order', 'updated_at', 'created_at'
    ]
});
