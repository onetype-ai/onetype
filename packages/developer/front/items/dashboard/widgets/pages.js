onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'developer-pages',
		title: 'Top pages',
		icon: 'description',
		type: 'list',
		section: 'developer-traffic',
		span: 4,
		condition: { app: ['developer'] },
		data: {
			rows: [
				{ label: '/pricing', sublabel: '12,480 views', value: '+8%', color: 'green' },
				{ label: '/features', sublabel: '9,120 views', value: '+3%', color: 'green' },
				{ label: '/blog/launch', sublabel: '6,840 views', value: '-2%', color: 'red' },
				{ label: '/docs', sublabel: '4,210 views', value: '+11%', color: 'green' }
			]
		}
	});
});
