onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'mesh-throughput',
		title: 'Throughput',
		description: 'Episodes per hour',
		icon: 'show_chart',
		color: 'green',
		type: 'line',
		section: 'system',
		span: 3,
		condition: { app: ['mesh'] },
		data: {
			labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'now'],
			series: [
				{ name: 'Episodes', points: [40, 62, 55, 78, 90, 84, 120] }
			]
		}
	});
});
