onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'collections-export',
		active: true,
		app: ['collections'],
		mode: ['collections-export'],
		zone: 'root',
		slot: 'center',
		render: `<e-collections-export></e-collections-export>`
	});
});
