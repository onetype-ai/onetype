onetype.AddonReady('ui.apps', (apps) =>
{
	apps.Item({
		id: 'documentation',
		name: 'Documentation',
		icon: 'menu_book',
		color: 'rgba(56, 189, 248, 1)',
		description: 'Platform and addon documentation.',
		order: 2,
		isVisible: false,
		links: [
			{
				icon: 'code',
				name: 'Developer',
				onClick: () => $ot.navigate({ app: 'documentation', mode: 'developer' })
			},
			{
				icon: 'api',
				name: 'API Reference',
				onClick: () => $ot.navigate({ app: 'documentation', mode: 'api' })
			}
		]
	});
});
