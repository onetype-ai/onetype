onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'documentation-sidebar',
		isActive: true,
		condition: { app: ['documentation'], callback: function() { return !!this.documentationItem; } },
		zone: 'root',
		slot: 'left',
		render: `<e-documentation-sidebar></e-documentation-sidebar>`
	});

	layouts.Item({
		id: 'documentation-item',
		isActive: true,
		condition: { app: ['documentation'], callback: function() { return !!this.documentationItem; } },
		zone: 'root',
		slot: 'left',
		config: {
			documentationItem: {
				type: 'string',
				value: ''
			}
		},
		render: `<e-documentation-sidebar></e-documentation-sidebar>`
	});
});
