onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'developer-storage',
		title: 'Usage',
		description: 'Current plan limits',
		icon: 'stacked_bar_chart',
		type: 'progress',
		section: 'developer-operations',
		span: 4,
		condition: { app: ['developer'] },
		data: {
			bars: [
				{ label: 'Bandwidth', value: '184 / 500 GB', percent: 37, color: 'blue' },
				{ label: 'Storage', value: '9.2 / 20 GB', percent: 46, color: 'green' },
				{ label: 'Build minutes', value: '412 / 600', percent: 69, color: 'orange' }
			]
		}
	});
});
