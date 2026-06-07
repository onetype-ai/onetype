const layouts = onetype.Addon('layouts', (addon) =>
{
    addon.Field('id', ['string|number', null, true]);
    addon.Field('order', ['number', 1]);
    addon.Field('active', ['boolean', false]);
    addon.Field('app', ['array', []]);
    addon.Field('mode', ['array', []]);
    addon.Field('zone', ['string', 'root']);
    addon.Field('slot', {
        type: 'string',
        required: true,
        options: ['top', 'bottom', 'left', 'right', 'center']
    });
    addon.Field('width', ['string', null]);
    addon.Field('height', ['string', null]);
    addon.Field('resizable', ['object', {x: false, y: false}]);
    addon.Field('config', ['object', {}]);
    addon.Field('data', ['object', {}]);
    addon.Field('render', ['string|function', null, true]);
});
