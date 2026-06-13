onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'extensions.installed',
		default: null,
		persist: true,
		metadata: { addon: 'extensions' },
		description: 'IDs of the installed extensions.'
	});
});
