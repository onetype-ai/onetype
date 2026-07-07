onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'modules.shortcuts.state',
		label: 'Shortcut state',
		default: {},
		metadata: { addon: 'modules.shortcuts' },
		description: 'Custom key and enabled state per shortcut, keyed by shortcut id. Holds only rebound or toggled shortcuts.'
	});
});
