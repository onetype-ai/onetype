onetype.AddonReady('modes', (modes) =>
{
	modes.Item({
		id: 'collections-import',
		app: 'collections',
		order: 5,
		icon: 'upload',
		label: 'Import'
	});
});
