/* TEMP DEMO — sample presets until real owners register their own. */

presets.Item({
	id: 'blog-collection',
	group: 'collections',
	order: 1,
	name: 'Blog',
	icon: 'article',
	description: 'A posts collection with the fields every blog needs.',
	config: {
		name: { type: 'string', value: 'Posts', description: 'Collection name.' }
	},
	callback: ({ name }) =>
	{
		return {
			name,
			fields: [
				{ name: 'title', type: 'string', required: true },
				{ name: 'slug', type: 'string', required: true },
				{ name: 'cover', type: 'image' },
				{ name: 'excerpt', type: 'string' },
				{ name: 'body', type: 'richtext', required: true },
				{ name: 'published', type: 'date' }
			]
		};
	}
});

presets.Item({
	id: 'products-collection',
	group: 'collections',
	order: 2,
	name: 'Products',
	icon: 'shopping_bag',
	description: 'A products collection ready for a small store.',
	config: {
		name: { type: 'string', value: 'Products', description: 'Collection name.' },
		currency: { type: 'string', value: 'EUR', description: 'Price currency.' }
	},
	callback: ({ name, currency }) =>
	{
		return {
			name,
			fields: [
				{ name: 'title', type: 'string', required: true },
				{ name: 'price', type: 'number', required: true, currency },
				{ name: 'gallery', type: 'images' },
				{ name: 'stock', type: 'number' },
				{ name: 'description', type: 'richtext' }
			]
		};
	}
});

presets.Item({
	id: 'heading-tag',
	group: 'tags',
	order: 1,
	name: 'Heading',
	icon: 'title',
	app: ['builder'],
	description: 'A heading tag of the chosen level.',
	config: {
		level: { type: 'number', value: 2, options: [1, 2, 3, 4, 5, 6], description: 'Heading level.' }
	},
	callback: ({ level }) =>
	{
		return { tag: 'h' + level, label: 'Heading ' + level, display: 'block' };
	}
});

presets.Item({
	id: 'container-tag',
	group: 'tags',
	order: 2,
	name: 'Container',
	icon: 'crop_din',
	app: ['builder'],
	description: 'A plain div container.',
	config: {},
	callback: () =>
	{
		return { tag: 'div', label: 'Container', display: 'block' };
	}
});

presets.Item({
	id: 'lead-automation',
	group: 'workflows',
	order: 1,
	name: 'Lead capture',
	icon: 'bolt',
	description: 'Automation that mails you and tags the entry when a form is submitted.',
	config: {
		email: { type: 'string', required: true, description: 'Where the notification goes.' }
	},
	callback: ({ email }) =>
	{
		return {
			name: 'Lead capture',
			trigger: 'form.submitted',
			actions: [
				{ action: 'email.send', to: email },
				{ action: 'entry.tag', tag: 'lead' }
			]
		};
	}
});
