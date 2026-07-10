onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'dashboard',
		condition: { app: ['developer'] },
		order: 2,
		icon: 'dashboard',
		name: 'Dashboard'
	});
});
