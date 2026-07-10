onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'developer-conversion',
		title: 'Conversion',
		icon: 'target',
		color: 'green',
		type: 'gauge',
		section: 'developer-traffic',
		span: 3,
		condition: { app: ['developer'] },
		data: {
			value: 4.8,
			max: 10,
			display: '4.8%',
			caption: 'Sign up rate'
		}
	});
});
