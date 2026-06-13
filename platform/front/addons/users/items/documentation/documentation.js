onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'users',
		order: 9,
		group: 'Global',
		icon: 'group',
		label: 'Users',
		addon: 'users',
		title: 'Users',
		description: 'People with access to the workspace.'
	});
});
