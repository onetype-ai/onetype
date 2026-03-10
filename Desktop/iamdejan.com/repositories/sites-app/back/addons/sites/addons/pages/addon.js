import onetype from '@onetype/framework';

const pages = onetype.Addon('pages', (addon) =>
{
    addon.Table('sites_pages');

    addon.Field('id', ['string']);
    addon.Field('team_id', ['string', null, true]);
    addon.Field('site_id', ['string', null, true]);
    addon.Field('title', ['string', null, true]);
    addon.Field('route', ['string', null, true]);
    addon.Field('updated_at', ['string']);
    addon.Field('created_at', ['string']);
});

export default pages;
