onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'modes.active',
		label: 'Active modes',
		default: {},
		metadata: { addon: 'modes' },
		description: 'Active mode per app, keyed by app id. Apps without an entry fall back to their default mode.'
	});
});
