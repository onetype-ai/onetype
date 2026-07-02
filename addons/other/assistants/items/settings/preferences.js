onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'assistants.preferences',
		default: {},
		persist: true,
		metadata: { addon: 'assistants' },
		description: 'Learned user preferences per assistant, a map of assistant id to short facts.'
	});
});
