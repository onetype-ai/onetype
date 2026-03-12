import commands from '@onetype/framework/commands';

commands.Item({
    id: 'editor:selection:deselect',
    callback: async function(properties, resolve)
    {
        editor.selection.ItemGet()?.Remove();

        resolve();
    }
});
