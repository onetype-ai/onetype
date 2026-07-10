onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'overview',
		condition: { app: ['mesh'] },
		isDefault: true,
		order: 1,
		icon: 'dashboard',
		name: 'Overview'
	});
});
