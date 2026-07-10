onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'developer-dashboard',
		isActive: true,
		condition: { app: ['developer'], mode: ['dashboard'] },
		zone: 'root',
		slot: 'center',
		render: `<e-dashboard></e-dashboard>`
	});
});
