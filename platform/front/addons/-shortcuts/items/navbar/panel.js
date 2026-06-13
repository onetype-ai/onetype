onetype.AddonReady('navbar', (navbar) =>
{
	navbar.Item({
		id: 'shortcuts',
		order: 6,
		position: 'right',
		type: { id: 'panel', title: 'Shortcuts', description: 'Enable or disable editor shortcuts.', width: 'l' },
		icon: 'keyboard',
		tooltip: 'Shortcuts',
		render: () => '<e-shortcuts-panel></e-shortcuts-panel>'
	});
});
