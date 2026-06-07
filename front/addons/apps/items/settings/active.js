onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'apps.active',
		default: 'builder',
		type: 'string',
		persist: true,
		description: 'The active app.'
	});
});
