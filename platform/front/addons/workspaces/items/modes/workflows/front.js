onetype.AddonReady('modes', (modes) =>
{
	modes.Item({
		id: 'front',
		app: 'workflows',
		default: true,
		order: 1,
		icon: 'web',
		label: 'Site'
	});
});
