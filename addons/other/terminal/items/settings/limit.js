onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'terminal.limit',
		label: 'Log limit',
		type: 'select',
		options: [50, 100, 200, 500],
		default: 200,
		metadata: { addon: 'terminal' },
		description: 'Maximum number of kept log entries. Oldest entries are dropped first.'
	});
});
