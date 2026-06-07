onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'modes.active',
		default: {},
		type: 'object',
		persist: true,
		description: 'The active mode per app, keyed by app id.'
	});
});
