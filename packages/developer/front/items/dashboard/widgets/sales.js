onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'developer-sales',
		title: 'Sales by plan',
		icon: 'bar_chart',
		color: 'blue',
		type: 'bar',
		section: 'developer-traffic',
		span: 4,
		condition: { app: ['developer'] },
		data: {
			bars: [
				{ label: 'Starter', value: 412, color: 'blue' },
				{ label: 'Pro', value: 268, color: 'green' },
				{ label: 'Business', value: 94, color: 'orange' }
			]
		}
	});
});
