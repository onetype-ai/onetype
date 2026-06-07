const editor = onetype.Addon('editor', (editor) =>
{
    editor.modes = onetype.Addon('editor.modes', (addon) =>
    {
        addon.Field('id', ['string|number', null, true]);
        addon.Field('order', ['number', 1]);
        addon.Field('icon', ['string', null, true]);
        addon.Field('label', ['string', null, true]);

        addon.Field('active', ['boolean', false], (active, item) =>
        {
            return onetype.StateGet('editor.mode', 'design') === item.Get('id');
        });
    });
});
