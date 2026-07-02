onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'collections-workflows',
		active: true,
		condition: { app: ['collections'], mode: ['collections-workflows'] },
		zone: 'root',
		slot: 'center',
		render: `<e-canvas></e-canvas>`
	});
});
