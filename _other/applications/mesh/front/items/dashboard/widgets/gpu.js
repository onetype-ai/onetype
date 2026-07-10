onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'mesh-gpu',
		title: 'GPU utilization',
		icon: 'memory',
		color: 'orange',
		type: 'gauge',
		section: 'cloud',
		span: 3,
		condition: { app: ['mesh'] },
		data: {
			value: 87,
			max: 100,
			display: '87%',
			caption: 'RTX 4090'
		}
	});
});
