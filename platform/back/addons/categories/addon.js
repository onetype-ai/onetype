import onetype from '@onetype/framework';

const categories = onetype.Addon('categories', (addon) =>
{
    addon.Table('sites_categories');

    addon.Field('id', ['string', null, true]);
    addon.Field('name', ['string', null, true]);
    addon.Field('slug', ['string', null, true]);
    addon.Field('icon', ['string', null, true]);
    addon.Field('order', ['number', 0, true]);
    addon.Field('updated_at', ['string']);
    addon.Field('created_at', ['string']);
});

export default categories;
