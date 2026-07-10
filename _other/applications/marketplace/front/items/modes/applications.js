onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'applications',
		condition: { app: ['marketplace'] },
		isDefault: true,
		order: 1,
		icon: 'apps',
		name: 'Applications'
	});
});
