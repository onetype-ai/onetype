onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'collections-types',
		active: true,
		app: ['collections'],
		mode: ['collections-build'],
		zone: 'root',
		slot: 'right',
		render: `<e-collections-types></e-collections-types>`
	});
});
