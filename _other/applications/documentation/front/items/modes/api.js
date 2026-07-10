onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'api',
		condition: { app: ['documentation'] },
		order: 2,
		icon: 'api',
		name: 'API Reference'
	});
});
