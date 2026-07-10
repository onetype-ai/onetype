onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'mesh-success',
		title: 'Success rate',
		icon: 'target',
		color: 'blue',
		type: 'numbers',
		section: 'system',
		span: 3,
		condition: { app: ['mesh'] },
		data: {
			metrics: [
				{ label: 'Verifier passed', value: '61%', delta: '+4%', direction: 'up' }
			]
		}
	});
});
