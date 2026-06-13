const extensions = onetype.Addon('extensions', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique extension id.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Order inside its rows and grids.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Display name of the extension.'
	});

	addon.Field('icon', {
		type: 'string',
		value: 'extension',
		description: 'Material Symbols icon shown on the tile.'
	});

	addon.Field('color', {
		type: 'string',
		value: 'brand',
		options: ['brand', 'blue', 'red', 'orange', 'green'],
		description: 'Accent color token of the icon tile.'
	});

	addon.Field('description', {
		type: 'string',
		value: '',
		description: 'One or two lines about what the extension does.'
	});

	addon.Field('overview', {
		type: 'string',
		value: '',
		description: 'Markdown overview shown on the extension page, how it works and what it brings.'
	});

	addon.Field('author', {
		type: 'string',
		value: '',
		description: 'Who published the extension.'
	});

	addon.Field('official', {
		type: 'boolean',
		value: false,
		description: 'Whether OneType published it.'
	});

	addon.Field('category', {
		type: 'string',
		required: true,
		description: 'Category the extension belongs to, like SEO or Marketing.'
	});

	addon.Field('rating', {
		type: 'number',
		value: 0,
		description: 'Average rating, 0 to 5.'
	});

	addon.Field('reviews', {
		type: 'number',
		value: 0,
		description: 'How many ratings it has.'
	});

	addon.Field('price', {
		type: 'string',
		value: 'Free',
		description: 'Pricing label, like Free, Free plan or $9/mo.'
	});

	addon.Field('featured', {
		type: 'boolean',
		value: false,
		description: 'Shown in the featured row of the store.'
	});

	addon.Field('trending', {
		type: 'boolean',
		value: false,
		description: 'Shown in the trending row of the store.'
	});

	addon.Field('installed', {
		type: 'boolean',
		value: false,
		description: 'Whether the extension is installed right now.'
	});
});
