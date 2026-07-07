onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'documentation-home',
		isActive: true,
		condition: { app: ['documentation'] },
		zone: 'root',
		slot: 'center',
		render: `<e-documentation-home></e-documentation-home>`
	});
});
