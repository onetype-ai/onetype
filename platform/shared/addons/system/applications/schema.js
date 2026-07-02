import onetype from '@onetype/framework';

onetype.DataSchema('application', {
	id: {
		type: 'string',
		description: 'Unique application id, the database primary key.'
	},
	slug: {
		type: 'string',
		required: true,
		description: 'Stable text key like builder or collections. Applications are addressed by slug.'
	},
	name: {
		type: 'string',
		required: true,
		description: 'Application name shown on the rail and in the catalog.'
	},
	icon: {
		type: 'string',
		description: 'Material Symbols icon name.'
	},
	color: {
		type: 'string',
		description: 'Accent color as an rgba string.'
	},
	description: {
		type: 'string',
		description: 'Short one line description for the catalog.'
	},
	overview: {
		type: 'string',
		description: 'Long markdown overview for the detail page.'
	},
	cover: {
		type: 'string',
		description: 'Cover image url.'
	},
	images: {
		type: 'array',
		value: [],
		required: true,
		description: 'Gallery image urls.',
		each: {
			type: 'string',
			description: 'A single image url.'
		}
	},
	order: {
		type: 'number',
		value: 0,
		required: true,
		description: 'Sort position, lower first.'
	},
	is_active: {
		type: 'boolean',
		value: true,
		required: true,
		description: 'Whether the application is available in the catalog.'
	},
	is_global: {
		type: 'boolean',
		value: true,
		required: true,
		description: 'Whether the application is a global platform app available to every team.'
	},
	depends: {
		type: 'array',
		value: [],
		required: true,
		description: 'Slugs of applications this one depends on.',
		each: {
			type: 'string',
			description: 'A dependency application slug.'
		}
	},
	config: {
		type: 'object',
		value: {},
		required: true,
		description: 'Config schema the application exposes, used to validate install data.'
	},
	updated_at: {
		type: 'string',
		description: 'ISO timestamp of the last update.'
	},
	created_at: {
		type: 'string',
		description: 'ISO timestamp of when the application was created.'
	},
	deleted_at: {
		type: 'string',
		description: 'ISO timestamp of soft deletion, null while active.'
	}
});
