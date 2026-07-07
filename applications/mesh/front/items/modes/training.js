onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'training',
		condition: { app: ['mesh'] },
		order: 2,
		icon: 'model_training',
		name: 'Training'
	});
});
