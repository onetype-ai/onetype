onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'documentation-sidebar',
		isActive: true,
		condition: { app: ['documentation'] },
		zone: 'root',
		slot: 'left',
		render: `<e-documentation-sidebar></e-documentation-sidebar>`
	});
});
