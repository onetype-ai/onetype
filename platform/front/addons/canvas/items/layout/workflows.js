/* TEMP DEMO — shows a flow design until the workflows app gets its real canvas. */

onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'workflows-canvas',
		active: true,
		app: ['workflows'],
		zone: 'root',
		slot: 'center',
		render: `<e-canvas></e-canvas>`
	});
});
