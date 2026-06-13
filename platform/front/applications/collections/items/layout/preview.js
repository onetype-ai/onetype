onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'collections-preview',
		active: true,
		app: ['collections'],
		mode: ['collections-preview'],
		zone: 'root',
		slot: 'center',
		render: `<e-collections-preview></e-collections-preview>`
	});
});
