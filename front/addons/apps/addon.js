const apps = onetype.Addon('apps', (addon) =>
{
    addon.Field('id', ['string', null, true]);
    addon.Field('order', ['number', 1]);
    addon.Field('position', {type: 'string', value: 'top', options: ['top', 'bottom']});
    addon.Field('icon', ['string', null, true]);
    addon.Field('label', ['string', null, true]);
    addon.Field('onOpen', ['function', null]);
    addon.Field('onClose', ['function', null]);
});
