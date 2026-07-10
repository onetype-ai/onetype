onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'elements',
		condition: { app: ['developer'] },
		isDefault: true,
		order: 1,
		icon: 'grid_view',
		name: 'Elements'
	});
});
