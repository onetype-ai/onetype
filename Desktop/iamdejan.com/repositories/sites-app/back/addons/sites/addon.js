import onetype from '@onetype/framework';

const sites = onetype.Addon('sites', (addon) =>
{
    addon.Table('sites');

    addon.Field('id', ['string']);
    addon.Field('team_id', ['string']);
    addon.Field('name', ['string', null, true]);
    addon.Field('category_id', ['string']);
    addon.Field('category', ['object']);
    addon.Field('description', ['string']);
    addon.Field('color', ['string']);
    addon.Field('font_ids', ['array']);
    addon.Field('fonts', ['array']);
    addon.Field('extension_ids', ['array']);
    addon.Field('extensions', ['array']);
    addon.Field('method', ['string']);
    addon.Field('is_theme', ['boolean', false, true]);
    addon.Field('domains', ['array']);
    addon.Field('updated_at', ['string']);
    addon.Field('created_at', ['string']);
    addon.Field('deleted_at', ['string']);
});

export default sites;
