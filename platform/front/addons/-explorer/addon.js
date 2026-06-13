const explorer = onetype.Addon('explorer', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique entry id.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Sort position of the group in the results. Entries inside a group sort alphabetically.'
	});

	addon.Field('group', {
		type: 'string',
		required: true,
		description: 'Display name of the group the entry shows under.'
	});

	addon.Field('prefix', {
		type: 'string',
		value: '',
		description: 'Query prefix that narrows the search to this group, like apps in apps: builder.'
	});

	addon.Field('icon', {
		type: 'string',
		value: 'search',
		description: 'Material Symbols icon of the entry.'
	});

	addon.Field('label', {
		type: 'string',
		required: true,
		description: 'Entry name shown in the results.'
	});

	addon.Field('hint', {
		type: 'string',
		value: '',
		description: 'Short helper text shown next to the label.'
	});

	addon.Field('keywords', {
		type: 'array',
		value: [],
		each: { type: 'string' },
		description: 'Extra search terms the entry matches on, besides label and hint.'
	});

	addon.Field('app', {
		type: 'array',
		value: [],
		each: { type: 'string' },
		description: 'App ids the entry belongs to. Empty means every app.'
	});

	addon.Field('mode', {
		type: 'array',
		value: [],
		each: { type: 'string' },
		description: 'Mode ids the entry belongs to. Empty means every mode.'
	});

	addon.Field('condition', {
		type: 'function',
		description: 'Extra check before the entry shows in the results. Returns a boolean.'
	});

	addon.Field('callback', {
		type: 'function',
		required: true,
		description: 'Runs when the entry is selected.'
	});
});
