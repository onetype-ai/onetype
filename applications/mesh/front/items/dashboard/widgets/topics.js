onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'mesh-topics',
		title: 'Top lesson topics',
		icon: 'sell',
		color: 'blue',
		type: 'list',
		section: 'knowledge',
		span: 4,
		condition: { app: ['mesh'] },
		data: {
			rows: [
				{ label: 'Collections', sublabel: '212 lessons', value: '212', percent: 100, color: 'blue' },
				{ label: 'Layouts', sublabel: '164 lessons', value: '164', percent: 77, color: 'blue' },
				{ label: 'Settings', sublabel: '98 lessons', value: '98', percent: 46, color: 'blue' },
				{ label: 'Navbar', sublabel: '54 lessons', value: '54', percent: 25, color: 'blue' }
			]
		}
	});
});
