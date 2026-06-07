onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'documentation-modes-bar',
		active: true,
		app: ['documentation'],
		zone: 'root',
		slot: 'bottom',
		order: 1000,
		render: `<e-modes-bar></e-modes-bar>`
	});
});
