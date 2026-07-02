onetype.AddonReady('ui.navbar', (navbar) =>
{
	navbar.Item({
		id: 'projects',
		order: 1,
		position: 'left',
		render: () => '<e-projects-switcher :background="background"></e-projects-switcher>'
	});
});
