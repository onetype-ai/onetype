import commands from '@onetype/framework/commands';

commands.Item({
    id: 'editor:selection:select',
    in: {
        id: ['string|number', null, true],
        type: {
            type: 'string',
            required: true,
            options: ['page', 'section', 'element']
        }
    },
    out: {
        id: ['string|number'],
        type: ['string']
    },
    callback: async function(properties, resolve)
    {
        editor.selection.Item({
            id: properties.id,
            type: properties.type
        });

        resolve({
            id: properties.id,
            type: properties.type
        });
    }
});
