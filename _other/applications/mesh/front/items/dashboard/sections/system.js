onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.sections.Item({
		id: 'system',
		title: 'System',
		description: 'Live picture of the training loop.',
		icon: 'monitoring',
		color: 'green',
		order: 1,
		condition: { app: ['mesh'] }
	});
});
