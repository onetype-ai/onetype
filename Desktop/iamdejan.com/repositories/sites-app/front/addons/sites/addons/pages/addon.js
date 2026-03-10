sites.pages = onetype.Addon('sites.pages', (addon) =>
{
    addon.Field('id', ['string']);
    addon.Field('team_id', ['string', null, true]);
    addon.Field('site_id', ['string', null, true]);
    addon.Field('title', ['string', null, true]);
    addon.Field('route', ['string', null, true]);
    addon.Field('updated_at', ['string']);
    addon.Field('created_at', ['string']);
});
