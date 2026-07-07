onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.sections.Item({
		id: 'knowledge',
		title: 'Knowledge',
		description: 'What the model has learned.',
		icon: 'school',
		color: 'blue',
		background: 1,
		order: 2,
		condition: { app: ['mesh'] }
	});
});
