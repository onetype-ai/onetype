onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.sections.Item({
		id: 'cloud',
		title: 'Cloud',
		description: 'Training infrastructure health.',
		icon: 'cloud',
		color: 'orange',
		background: 1,
		order: 3,
		condition: { app: ['mesh'] }
	});
});
