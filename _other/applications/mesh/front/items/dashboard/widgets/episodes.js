onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'mesh-episodes',
		title: 'Episodes',
		description: 'Last 24 hours',
		icon: 'timeline',
		color: 'green',
		type: 'numbers',
		section: 'system',
		span: 3,
		condition: { app: ['mesh'] },
		data: {
			metrics: [
				{ label: 'Episodes run', value: '1,284', delta: '+18%', direction: 'up' }
			]
		}
	});
});
