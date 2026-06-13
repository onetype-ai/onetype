onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'apps.active',
		label: 'Active app',
		type: 'select',
		options: () => apps.Fn('list').map((app) => ({ label: app.label, value: app.id })),
		default: 'builder',
		metadata: { addon: 'apps' },
		description: 'The app open on the rail.'
	});
});
