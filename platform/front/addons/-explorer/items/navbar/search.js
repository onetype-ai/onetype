onetype.AddonReady('navbar', (navbar) =>
{
	navbar.Item({
		id: 'explorer',
		order: 4,
		position: 'right',
		render: '<e-explorer-trigger></e-explorer-trigger>'
	});
});
