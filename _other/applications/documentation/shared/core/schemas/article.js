import onetype from '@onetype/framework';

onetype.DataSchema('documentation.article', {
	id: {
		type: 'string',
		description: 'Unique article id, the database primary key.'
	},
	category_id: {
		type: 'string',
		description: 'Category the article belongs to, empty for uncategorized articles.'
	},
	addon: {
		type: 'string',
		description: 'Addon the article documents. When set, the article also renders the auto generated sections for that addon.'
	},
	name: {
		type: 'string',
		required: true,
		description: 'Stable text key of the article, unique inside its addon.'
	},
	group: {
		type: 'string',
		description: 'Secondary grouping inside the category.'
	},
	title: {
		type: 'string',
		required: true,
		description: 'Article heading.'
	},
	content: {
		type: 'string',
		description: 'Article body as markdown.'
	},
	order: {
		type: 'number',
		value: 0,
		required: true,
		description: 'Sort position inside the category, lower first.'
	},
	is_active: {
		type: 'boolean',
		value: true,
		required: true,
		description: 'Whether the article is published.'
	},
	updated_at: {
		type: 'string',
		description: 'ISO timestamp of the last update.'
	},
	created_at: {
		type: 'string',
		description: 'ISO timestamp of when the article was created.'
	},
	deleted_at: {
		type: 'string',
		description: 'ISO timestamp of soft deletion, null while the article is active.'
	}
});
