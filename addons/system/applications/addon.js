const applications = onetype.Addon('applications', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		description: 'Unique application id, the database primary key.'
	});

	addon.Field('slug', {
		type: 'string',
		required: true,
		description: 'Stable text key like builder or collections. Applications are addressed by slug, not by id.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Application name shown on the rail and in the catalog.'
	});

	addon.Field('icon', {
		type: 'string',
		description: 'Material Symbols icon name shown on the rail.'
	});

	addon.Field('color', {
		type: 'string',
		description: 'Accent color of the application as an rgba string.'
	});

	addon.Field('description', {
		type: 'string',
		description: 'Short one line description for the catalog listing.'
	});

	addon.Field('overview', {
		type: 'string',
		description: 'Long markdown overview shown on the application detail page.'
	});

	addon.Field('cover', {
		type: 'string',
		description: 'Cover image url for the catalog listing.'
	});

	addon.Field('images', {
		type: 'array',
		value: [],
		required: true,
		description: 'Gallery image urls shown on the detail page.',
		each: {
			type: 'string',
			description: 'A single image url.'
		}
	});

	addon.Field('order', {
		type: 'number',
		value: 0,
		required: true,
		description: 'Sort position in the catalog and on the rail, lower first.'
	});

	addon.Field('is_active', {
		type: 'boolean',
		value: true,
		required: true,
		description: 'Whether the application is available. Inactive applications are hidden from the catalog.'
	});

	addon.Field('is_global', {
		type: 'boolean',
		value: true,
		required: true,
		description: 'Whether the application is a global platform app available to every team, as opposed to team specific.'
	});

	addon.Field('depends', {
		type: 'array',
		value: [],
		required: true,
		description: 'Slugs of applications this one depends on.',
		each: {
			type: 'string',
			description: 'A dependency application slug.'
		}
	});

	addon.Field('config', {
		type: 'object',
		value: {},
		required: true,
		description: 'Config schema the application exposes. Install data is validated against this definition.'
	});

	addon.Field('updated_at', {
		type: 'string',
		description: 'ISO timestamp of the last update.'
	});

	addon.Field('created_at', {
		type: 'string',
		description: 'ISO timestamp of when the application was created.'
	});

	addon.Field('deleted_at', {
		type: 'string',
		description: 'ISO timestamp of soft deletion, null while the application is active.'
	});
});
