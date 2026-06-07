onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'layouts.state',
		default: {},
		type: 'object',
		persist: true,
		description: 'Persisted open state and data per layout item, keyed by item id.'
	});
});
