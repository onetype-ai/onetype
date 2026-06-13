onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'canvas',
		active: true,
		app: ['builder'],
		zone: 'root',
		slot: 'center',
		render: `<e-canvas></e-canvas>`
	});
});
