onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'collections-build',
		active: true,
		condition: { app: ['collections'], mode: ['collections-build'] },
		zone: 'root',
		slot: 'center',
		render: `<e-collections-build></e-collections-build>`
	});
});
