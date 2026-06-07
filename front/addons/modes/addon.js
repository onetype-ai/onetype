const modes = onetype.Addon('modes', (addon) =>
{
    addon.Field('id', ['string|number', null, true]);
    addon.Field('order', ['number', 1]);
    addon.Field('app', ['string', null, true]);
    addon.Field('default', ['boolean', false]);
    addon.Field('icon', ['string', null, true]);
    addon.Field('label', ['string', null, true]);
    addon.Field('onActivate', ['function', null]);
    addon.Field('onDeactivate', ['function', null]);

    addon.Field('active', ['boolean', false], (active, item) =>
    {
        return modes.Fn('active', item.Get('app')) === item.Get('id');
    });
});
