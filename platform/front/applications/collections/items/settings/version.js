onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'collections.version',
		label: 'Open version',
		default: '',
		metadata: { addon: 'collections' },
		description: 'The version open in the history diff panel.'
	});
});
