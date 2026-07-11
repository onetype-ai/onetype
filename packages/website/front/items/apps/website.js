onetype.AddonReady('ui.apps', (apps) =>
{
	apps.Item({
		id: 'website',
		name: 'OneType',
		icon: 'language',
		color: 'rgba(99, 102, 241, 1)',
		description: 'The public onetype.ai website, running inside the platform as a package.',
		order: 0
	});
});
