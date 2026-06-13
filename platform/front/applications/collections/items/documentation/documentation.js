onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'collections',
		order: 11,
		group: 'Global',
		icon: 'database',
		label: 'Collections',
		addon: 'collections',
		title: 'Collections',
		description: 'The data layer of the builder. Every collection is a schema with items, grouped and nested in the sidebar.',
		overview: `
## Collections

Collections are the data layer of the builder. A collection is a schema with items: blog posts, products, members, form submissions, settings. Pages bind to them, workflows act on them, extensions bring their own.

A collection is an addon item. Register one from anywhere:

\`\`\`js
collections.Item({
	id: 'posts',
	group: 'Content',
	icon: 'article',
	name: 'Blog Posts'
});
\`\`\`

### Kinds

list is the regular collection with items. settings holds key value pairs, one instance, no item list. system marks collections the platform owns, like applications or documentation.

### Nesting

A collection with a parent renders under its parent in the sidebar, like Variants under Products. Child collections belong to one parent item each, the relation field on the schema decides which one.

### Selection

The sidebar lists every collection grouped by its group field. Clicking one runs the collections:select command, which persists the selection in settings under collections.active and emits collections.select.

This is the first slice of the app. Fields, items and the data layer land next.
		`.trim()
	});
});
