onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'developer',
		condition: { app: ['documentation'] },
		isDefault: true,
		order: 1,
		icon: 'code',
		name: 'Developer'
	});
});
