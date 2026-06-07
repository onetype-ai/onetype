pages.Item({
    id: 'create',
    route: '/create',
    title: 'New Site - OneType',
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
            this.submit = (form) =>
            {
                console.log('Create site:', form);
            };

            return `<e-sites-survey :_submit="submit"></e-sites-survey>`;
        }
    }
});
