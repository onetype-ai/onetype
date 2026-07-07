onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'mesh-families',
		title: 'Lessons by kind',
		icon: 'category',
		color: 'blue',
		type: 'bar',
		section: 'knowledge',
		span: 4,
		condition: { app: ['mesh'] },
		data: {
			bars: [
				{ label: 'Recipe', value: 842, color: 'green' },
				{ label: 'Warning', value: 317, color: 'red' },
				{ label: 'Fact', value: 191, color: 'blue' }
			]
		}
	});
});
