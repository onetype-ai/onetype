sites.sections = onetype.Addon('sites.sections', (addon) =>
{
    addon.Field('id', ['string']);
    addon.Field('team_id', ['string', null, true]);
    addon.Field('page_id', ['string', null, true]);
    addon.Field('order', ['number', 0, true]);
    addon.Field('updated_at', ['string']);
    addon.Field('created_at', ['string']);
});
