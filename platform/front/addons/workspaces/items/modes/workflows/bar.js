onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'workflows-modes-bar',
		active: true,
		app: ['workflows'],
		zone: 'root',
		slot: 'bottom',
		order: 1000,
		render: `<e-modes-bar></e-modes-bar>`
	});
});
