const projects = onetype.Addon('projects', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		description: 'Unique project id, the database primary key.'
	});

	addon.Field('team_id', {
		type: 'string',
		required: true,
		description: 'Id of the team that owns the project. Every project belongs to exactly one team.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Project name shown in the switcher and headers.'
	});

	addon.Field('description', {
		type: 'string',
		description: 'Short human description of what the project is.'
	});

	addon.Field('color', {
		type: 'string',
		description: 'Accent color of the project as an rgba string, used for the dot and theming.'
	});

	addon.Field('config', {
		type: 'object',
		value: {},
		required: true,
		description: 'Free-form project settings, anything that does not have its own column.'
	});

	addon.Field('applications', {
		type: 'array',
		value: [],
		required: true,
		description: 'Applications installed on the project, each with its own saved config.',
		each: {
			type: 'object',
			description: 'One installed application entry.',
			config: {
				slug: {
					type: 'string',
					required: true,
					description: 'Slug of the installed application, matching an applications catalog entry.'
				},
				data: {
					type: 'object',
					value: {},
					required: true,
					description: 'Per-project config for this application, validated against the application config schema on install.'
				}
			}
		}
	});

	addon.Field('updated_at', {
		type: 'string',
		description: 'ISO timestamp of the last update.'
	});

	addon.Field('created_at', {
		type: 'string',
		description: 'ISO timestamp of when the project was created.'
	});

	addon.Field('deleted_at', {
		type: 'string',
		description: 'ISO timestamp of soft deletion, null while the project is active.'
	});
});
