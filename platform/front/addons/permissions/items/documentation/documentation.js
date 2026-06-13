onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'permissions',
		order: 8,
		group: 'Global',
		icon: 'shield_person',
		label: 'Permissions',
		addon: 'permissions',
		title: 'Permissions',
		description: 'Registry of what can be allowed or denied, per app.'
	});
});
