onetype.AddonReady('modes', (modes) =>
{
	modes.Item({
		id: 'developer',
		app: 'documentation',
		default: true,
		order: 1,
		icon: 'code',
		label: 'Developer'
	});
});
