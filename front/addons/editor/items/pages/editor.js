pages.Item({
    id: 'editor',
    route: '/editor/:site',
    title: 'Editor - OneType',
    data: async function(parameters)
    {
        const item = await sites.Find().filter('id', parameters.site).one();

        if(!item)
        {
            return $ot.page('/404');
        }

        return {
            site: item.data
        };
    },
    grid: {
        template: '"toolbar toolbar toolbar" "left content right"',
        columns: 'auto 1fr auto',
        rows: 'auto 1fr',
        gap: '0'
    },
    areas: {
        toolbar: function()
        {
            return `<e-editor-toolbar></e-editor-toolbar>`;
        },
        left: function()
        {
            return `<e-editor-tabs position="left"></e-editor-tabs>`;
        },
        content: function()
        {
            return `
                <e-editor-canvas></e-editor-canvas>
            `;
        },
        right: function()
        {
            return `<e-editor-tabs position="right"></e-editor-tabs>`;
        }
    }
});