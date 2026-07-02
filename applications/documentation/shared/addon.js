import onetype from '@onetype/framework';

const documentation = onetype.Addon('documentation', (addon) =>
{
	addon.articles = onetype.Addon('documentation.articles', (addon) =>
	{
		addon.Table('documentation_articles');

		addon.Field('id', {
			type: 'string',
			description: 'Unique article id, the database primary key.'
		});

		addon.Field('category_id', {
			type: 'string',
			description: 'Category the article belongs to, empty for uncategorized articles.'
		});

		addon.Field('addon', {
			type: 'string',
			description: 'Addon the article documents, like ui.navbar or float. When set, the article also renders the auto generated sections for that addon: commands, emitters, fields and the rest.'
		});

		addon.Field('name', {
			type: 'string',
			required: true,
			description: 'Stable text key of the article like overview or getting-started, unique inside its addon.'
		});

		addon.Field('group', {
			type: 'string',
			description: 'Secondary grouping inside the category, articles with the same group render under a shared label in the sidebar.'
		});

		addon.Field('title', {
			type: 'string',
			required: true,
			description: 'Article heading shown in the sidebar and on top of the page.'
		});

		addon.Field('content', {
			type: 'string',
			description: 'Article body as markdown.'
		});

		addon.Field('order', {
			type: 'number',
			value: 0,
			required: true,
			description: 'Sort position inside the category, lower first.'
		});

		addon.Field('is_active', {
			type: 'boolean',
			value: true,
			required: true,
			description: 'Whether the article is published. Inactive articles are hidden from the app.'
		});

		addon.Field('updated_at', {
			type: 'string',
			description: 'ISO timestamp of the last update.'
		});

		addon.Field('created_at', {
			type: 'string',
			description: 'ISO timestamp of when the article was created.'
		});

		addon.Field('deleted_at', {
			type: 'string',
			description: 'ISO timestamp of soft deletion, null while the article is active.'
		});
	});

	addon.categories = onetype.Addon('documentation.categories', (addon) =>
	{
		addon.Table('documentation_categories');

		addon.Field('id', {
			type: 'string',
			description: 'Unique category id, the database primary key.'
		});

		addon.Field('name', {
			type: 'string',
			required: true,
			description: 'Stable text key of the category like framework or guides, unique.'
		});

		addon.Field('title', {
			type: 'string',
			required: true,
			description: 'Category heading shown in the sidebar.'
		});

		addon.Field('icon', {
			type: 'string',
			description: 'Material Symbols icon name shown next to the title.'
		});

		addon.Field('order', {
			type: 'number',
			value: 0,
			required: true,
			description: 'Sort position in the sidebar, lower first.'
		});

		addon.Field('is_active', {
			type: 'boolean',
			value: true,
			required: true,
			description: 'Whether the category is shown. Inactive categories and their articles are hidden.'
		});

		addon.Field('updated_at', {
			type: 'string',
			description: 'ISO timestamp of the last update.'
		});

		addon.Field('created_at', {
			type: 'string',
			description: 'ISO timestamp of when the category was created.'
		});

		addon.Field('deleted_at', {
			type: 'string',
			description: 'ISO timestamp of soft deletion, null while the category is active.'
		});
	});
});

export default documentation;
