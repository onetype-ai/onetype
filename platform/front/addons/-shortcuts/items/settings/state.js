onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'shortcuts.state',
		label: 'Shortcut state',
		default: {},
		metadata: { addon: 'shortcuts' },
		description: 'Custom key and enabled state per shortcut, keyed by shortcut id. Holds only rebound or toggled shortcuts.'
	});
});
