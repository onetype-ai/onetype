onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'collections-import',
		active: true,
		app: ['collections'],
		mode: ['collections-import'],
		zone: 'root',
		slot: 'center',
		render: `<e-collections-import></e-collections-import>`
	});
});
