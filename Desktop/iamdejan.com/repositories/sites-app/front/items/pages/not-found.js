pages.Item({
    id: 'not-found',
    route: '/404',
    title: '404 - OneType',
    404: true,
    grid: {
        template: '"navbar" "content"',
        columns: '1fr',
        rows: 'auto 1fr',
        gap: '0'
    },
    areas: {
        navbar: function()
        {
            return `<e-navbar></e-navbar>`;
        },
        content: function()
        {
            return `
                <div class="ot-flex ot-justify-center ot-items-center" style="min-height: calc(100vh - 48px);">
                    <e-status-code></e-status-code>
                </div>
            `;
        }
    }
});
