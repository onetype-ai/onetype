onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'layouts.state',
		label: 'Layout state',
		default: {},
		metadata: { addon: 'layouts' },
		description: 'Persisted open state and data per layout item, keyed by item id.'
	});
});
