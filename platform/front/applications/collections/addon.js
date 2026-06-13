const collections = onetype.Addon('collections', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique collection id.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Sort position inside the group.'
	});

	addon.Field('group', {
		type: 'string',
		value: 'Content',
		description: 'Sidebar group the collection shows under, like Content or Commerce.'
	});

	addon.Field('icon', {
		type: 'string',
		value: 'database',
		description: 'Material Symbols icon of the collection.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Display name of the collection.'
	});

	addon.Field('kind', {
		type: 'string',
		value: 'list',
		options: ['list', 'settings', 'system'],
		description: 'What the collection is: list holds items, settings holds key value pairs, system is platform owned.'
	});

	addon.Field('parent', {
		type: 'string',
		value: '',
		description: 'ID of the parent collection when this one is a child, empty for root collections.'
	});

	addon.Field('count', {
		type: 'number',
		value: 0,
		description: 'Number of items in the collection. Temporary, will come from the data layer.'
	});
});

collections.types = onetype.Addon('collections.types', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique field type id.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Display name of the field type.'
	});

	addon.Field('icon', {
		type: 'string',
		required: true,
		description: 'Material Symbols icon of the field type.'
	});

	addon.Field('description', {
		type: 'string',
		required: true,
		description: 'What the field type holds.'
	});

	addon.Field('group', {
		type: 'string',
		value: 'Basic',
		description: 'Palette group the field type shows under.'
	});
});
