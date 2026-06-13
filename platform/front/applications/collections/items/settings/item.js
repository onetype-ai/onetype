onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'collections.item',
		label: 'Open item',
		default: '',
		metadata: { addon: 'collections' },
		description: 'The item open in the collections editor panel.'
	});
});
