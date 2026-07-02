onetype.AddonReady('ui.modes', (modes) =>
{
	modes.Item({
		id: 'extensions',
		condition: { app: ['marketplace'] },
		order: 2,
		icon: 'extension',
		name: 'Extensions'
	});
});
