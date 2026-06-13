onetype.AddonReady('modes', (modes) =>
{
	modes.Item({
		id: 'collections-preview',
		app: 'collections',
		default: true,
		order: 1,
		icon: 'visibility',
		label: 'Preview'
	});
});
