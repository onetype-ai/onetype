onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'developer-pageviews',
		title: 'Page views',
		description: 'Per day',
		icon: 'show_chart',
		color: 'blue',
		type: 'line',
		section: 'developer-traffic',
		span: 6,
		condition: { app: ['developer'] },
		data: {
			labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			series: [
				{ name: 'Views', color: 'blue', points: [3200, 4100, 3800, 5200, 6100, 4800, 5600] },
				{ name: 'Sessions', color: 'green', points: [2100, 2800, 2500, 3600, 4200, 3300, 3900] }
			]
		}
	});
});
