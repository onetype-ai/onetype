onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'collections.active',
		label: 'Active collection',
		default: '',
		metadata: { addon: 'collections' },
		description: 'The collection selected in the sidebar.'
	});
});
