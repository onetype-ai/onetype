onetype.EmitRegister('projects.open', {
	description: 'Fired after a project becomes active. Not fired when opening the project that is already active.',
	metadata: { addon: 'projects' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the project that became active.'
		}
	}
});

onetype.EmitRegister('projects.close', {
	description: 'Fired after the active project is closed, leaving no project active.',
	metadata: { addon: 'projects' }
});

onetype.EmitRegister('projects.applications', {
	description: 'Fired after an application is installed on or uninstalled from a project. The local project store already holds the new state.',
	metadata: { addon: 'projects' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the project whose applications changed.'
		},
		slug: {
			type: 'string',
			description: 'Slug of the application that was installed or uninstalled.'
		}
	}
});
