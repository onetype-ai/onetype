onetype.AddonReady('modules.settings', (settings) =>
{
	settings.Item({
		id: 'projects.active',
		label: 'Active project',
		type: 'select',
		options: () => projects.Fn('list').map((project) => ({ label: project.name, value: project.id })),
		default: null,
		persist: true,
		metadata: { addon: 'projects' },
		description: 'The project currently open in the editor.'
	});
});
