onetype.AddonReady('ui.status', (status) =>
{
	status.Item({
		id: 'terminal',
		align: 'left',
		icon: 'terminal',
		label: 'Terminal',
		render: '<e-terminal></e-terminal>'
	});
});
