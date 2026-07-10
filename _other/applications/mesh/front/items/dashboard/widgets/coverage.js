onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'mesh-coverage',
		title: 'Command coverage',
		icon: 'donut_small',
		type: 'donut',
		section: 'knowledge',
		span: 4,
		condition: { app: ['mesh'] },
		data: {
			label: 'commands',
			segments: [
				{ name: 'Covered', value: 68, color: 'green' },
				{ name: 'Partial', value: 21, color: 'orange' },
				{ name: 'Untouched', value: 11, color: 'red' }
			]
		}
	});
});
