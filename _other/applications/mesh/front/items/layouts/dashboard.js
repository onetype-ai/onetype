onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'mesh-dashboard',
		isActive: true,
		condition: { app: ['mesh'], mode: ['overview'] },
		zone: 'root',
		slot: 'center',
		render: `<e-dashboard></e-dashboard>`
	});
});
