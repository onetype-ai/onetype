onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'mesh-resources',
		title: 'Resources',
		description: 'Live usage',
		icon: 'stacked_bar_chart',
		type: 'progress',
		section: 'cloud',
		span: 5,
		condition: { app: ['mesh'] },
		data: {
			bars: [
				{ label: 'VRAM', value: '21 / 24 GB', percent: 88, color: 'orange' },
				{ label: 'System RAM', value: '38 / 64 GB', percent: 59, color: 'blue' },
				{ label: 'Disk', value: '412 / 1000 GB', percent: 41, color: 'green' }
			]
		}
	});
});
