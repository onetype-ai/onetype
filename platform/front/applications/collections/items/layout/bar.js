onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'collections-modes-bar',
		active: true,
		app: ['collections'],
		zone: 'root',
		slot: 'bottom',
		order: 1000,
		render: `<e-modes-bar></e-modes-bar>`
	});
});
