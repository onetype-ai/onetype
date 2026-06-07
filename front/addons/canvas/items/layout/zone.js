onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'canvas',
		active: true,
		app: ['builder'],
		zone: 'root',
		slot: 'center',
		render: `<e-layout zone="canvas" #style="width: 100%; height: 100%; background: var(--ot-bg-1);"></e-layout>`
	});
});
