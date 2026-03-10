import onetype from '@onetype/framework';

const extensions = onetype.Addon('extensions', (addon) =>
{
    addon.Table('sites_extensions');

    addon.Field('id', ['string', null, true]);
    addon.Field('name', ['string', null, true]);
    addon.Field('slug', ['string', null, true]);
    addon.Field('icon', ['string', null, true]);
    addon.Field('description', ['string']);
    addon.Field('categories', ['array']);
    addon.Field('order', ['number', 0, true]);
    addon.Field('updated_at', ['string']);
    addon.Field('created_at', ['string']);
});

export default extensions;
