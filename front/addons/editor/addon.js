const editor = onetype.Addon('editor', (editor) =>
{
    editor.Field('site', ['object', null, true]);

    editor.selection = onetype.Addon('editor.selection', (addon) =>
    {
        addon.Field('id', ['string|number', null, true]);
        addon.Field('type', ['string', null, true]);
    });

    editor.tabs = onetype.Addon('editor.tabs', (addon) =>
    {
        addon.Field('id', ['string|number', null, true]);
        addon.Field('order', ['number', 1]);
        addon.Field('active', ['boolean', false]);
        addon.Field('title', ['string', null, true]);
        addon.Field('icon', ['string', null, true]);
        addon.Field('position', ['string', null, true]);
        addon.Field('render', ['string|function', null, true]);
    });

    editor.toolbar = onetype.Addon('editor.toolbar', (addon) =>
    {
        addon.Field('id', ['string|number', null, true]);
        addon.Field('order', ['number', 1]);
        addon.Field('active', ['boolean', false]);
        addon.Field('icon', ['string', null, true]);
        addon.Field('label', ['string', null, true]);
        addon.Field('position', ['string', null, true]);
        addon.Field('raw', ['boolean', false, true]);
        addon.Field('render', ['string|function', null, true]);
    });

    editor.pages = onetype.Addon('editor.pages', (addon) =>
    {
        addon.Field('id', ['string']);
        addon.Field('title', ['string', null, true]);
        addon.Field('slug', ['string', null, true]);
        addon.Field('order', ['number', 0, true]);
        addon.Field('route', ['string', null, true]);
        addon.Field('active', ['boolean', false, true]);
    });

    editor.sections = onetype.Addon('editor.sections', (addon) =>
    {
        addon.Field('id', ['string']);
        addon.Field('page_id', ['string', null, true]);
        addon.Field('order', ['number', 0, true]);
        addon.Field('columns', ['array', [], true]);
        addon.Field('padding', ['object', null, true]);
        addon.Field('margin', ['object', null, true]);
        addon.Field('gap', ['number', 16, true]);
        addon.Field('background', ['string', null, true]);
        addon.Field('border', ['object', null, true]);
        addon.Field('container', ['boolean', true, true]);
    });

    editor.canvas = onetype.Addon('editor.canvas', (addon) =>
    {
        addon.Field('label', ['string', null, true]);
        addon.Field('width', ['number', null, true]);
        addon.Field('scale', ['number', null, true]);
        addon.Field('render', ['string|function', null, true]);
    });
});