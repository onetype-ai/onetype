onetype.AddonReady('ui.navbar', (navbar) =>
{
	navbar.Item({
		id: 'collaborators',
		order: 10,
		position: 'right',
		render: () => `<e-collaborators></e-collaborators>`
	});
});
