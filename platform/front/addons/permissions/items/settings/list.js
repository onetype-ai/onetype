onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'permissions.granted',
		label: 'Granted permissions',
		type: 'transfer',
		options: () => Object.values(permissions.Items()).map((item) =>
		{
			return {
				value: item.Get('id'),
				label: item.Get('name'),
				description: item.Get('app')
			};
		}),
		default: [],
		scope: 'user',
		metadata: { addon: 'permissions' },
		description: 'Permissions in effect for the selected user. Everything on the right is allowed.'
	});
});
