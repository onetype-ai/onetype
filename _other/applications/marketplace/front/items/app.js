onetype.AddonReady('ui.apps', (apps) =>
{
	apps.Item({
		id: 'marketplace',
		name: 'Marketplace',
		icon: 'storefront',
		color: 'rgba(99, 102, 241, 1)',
		description: 'Browse and install applications.',
		order: 1,
		badge: 'New',
		isVisible: false,
		links: [
			{
				icon: 'apps',
				name: 'Applications',
				onClick: () => $ot.navigate({ app: 'marketplace', mode: 'applications' })
			},
			{
				icon: 'extension',
				name: 'Extensions',
				onClick: () => $ot.navigate({ app: 'marketplace', mode: 'extensions' })
			}
		]
	});
});
