onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'collections-diff',
		active: true,
		app: ['collections'],
		mode: ['collections-history'],
		zone: 'root',
		slot: 'right',
		render: `<e-collections-diff></e-collections-diff>`
	});
});
