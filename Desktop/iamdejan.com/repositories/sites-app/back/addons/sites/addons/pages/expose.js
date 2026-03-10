import pages from '#pages/addon.js';

pages.Expose({
    filter: ['id', 'team_id', 'site_id'],
    sort: ['title', 'route', 'updated_at', 'created_at'],
    select: [
        'id', 'team_id', 'site_id', 'title', 'route', 'updated_at', 'created_at'
    ]
});
