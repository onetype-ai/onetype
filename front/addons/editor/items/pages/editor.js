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
        template: '"content"',
        columns: '1fr',
        rows: '1fr',
        gap: '0'
    },
    areas: {
        content: function()
        {
            this.site = this.data.site;

            return `<e-editor-canvas :site="site"></e-editor-canvas>`;
        }
    }
});
