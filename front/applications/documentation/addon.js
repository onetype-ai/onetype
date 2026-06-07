const documentation = onetype.Addon('documentation', (addon) =>
{
    addon.Field('id', ['string|number', null, true]);
    addon.Field('order', ['number', 1]);
    addon.Field('group', ['string', 'Global']);
    addon.Field('icon', ['string', null, true]);
    addon.Field('label', ['string', null, true]);
    addon.Field('addon', ['string', null, true]);
    addon.Field('title', ['string', null, true]);
    addon.Field('description', ['string', null]);
    addon.Field('overview', ['string', null]);
});
