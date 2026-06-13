onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'workspaces.active',
		label: 'Active workspace',
		default: 'editor',
		metadata: { addon: 'workspaces' },
		description: 'ID of the active workspace.'
	});
});
