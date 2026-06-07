const status = onetype.Addon('status', (addon) =>
{
    addon.Field('id', ['string|number', null, true]);
    addon.Field('order', ['number', 1]);
    addon.Field('app', ['array', []]);
    addon.Field('align', {type: 'string', value: 'left', options: ['left', 'right']});
    addon.Field('icon', ['string', null]);
    addon.Field('label', ['string', null]);
    addon.Field('render', ['string|function', null]);
});
