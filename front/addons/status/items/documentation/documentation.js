onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'status',
		order: 5,
		group: 'Global',
		icon: 'bottom_panel_open',
		label: 'Status',
		addon: 'status'
	});
});
