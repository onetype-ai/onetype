onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'builder-modes-bar',
		active: true,
		condition: { app: ['builder'] },
		zone: 'root',
		slot: 'bottom',
		order: 1000,
		render: `<e-modes-bar></e-modes-bar>`
	});
});
