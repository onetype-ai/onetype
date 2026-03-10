const fonts = onetype.Addon('fonts', (addon) =>
{
    addon.Field('id', ['string', null, true]);
    addon.Field('name', ['string', null, true]);
    addon.Field('slug', ['string', null, true]);
    addon.Field('category', ['string', null, true]);
    addon.Field('popular', ['boolean', false, true]);
    addon.Field('weights', ['array']);
    addon.Field('styles', ['array']);
    addon.Field('updated_at', ['string']);
    addon.Field('created_at', ['string']);
});
