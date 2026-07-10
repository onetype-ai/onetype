import onetype from '@onetype/framework';

onetype.DataSchema('documentation.category', {
	id: {
		type: 'string',
		description: 'Unique category id, the database primary key.'
	},
	name: {
		type: 'string',
		required: true,
		description: 'Stable text key of the category, unique.'
	},
	title: {
		type: 'string',
		required: true,
		description: 'Category heading shown in the sidebar.'
	},
	icon: {
		type: 'string',
		description: 'Material Symbols icon name.'
	},
	order: {
		type: 'number',
		value: 0,
		required: true,
		description: 'Sort position in the sidebar, lower first.'
	},
	is_active: {
		type: 'boolean',
		value: true,
		required: true,
		description: 'Whether the category is shown.'
	},
	updated_at: {
		type: 'string',
		description: 'ISO timestamp of the last update.'
	},
	created_at: {
		type: 'string',
		description: 'ISO timestamp of when the category was created.'
	},
	deleted_at: {
		type: 'string',
		description: 'ISO timestamp of soft deletion, null while the category is active.'
	}
});
