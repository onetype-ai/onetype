import onetype from '@onetype/framework';

/* The catalog of collections. Each row is a collection DEFINITION (schema), which
   the back materializes into a real per-collection table at runtime. Team-scoped. */

const collections = onetype.Addon('collections', (addon) =>
{
	addon.Table('collections');

	addon.Field('id', {
		type: 'string',
		description: 'Unique collection id, the database primary key.'
	});

	addon.Field('team_id', {
		type: 'string',
		required: true,
		description: 'Id of the team that owns the collection.'
	}, null, null, true);

	addon.Field('slug', {
		type: 'string',
		required: true,
		description: 'URL-friendly key, also the physical table suffix (collection_<slug>). Lowercase, stable, never reused.'
	}, null, null, true);

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Human name shown in the UI.'
	});

	addon.Field('icon', {
		type: 'string',
		description: 'Material Symbols icon for the collection.'
	});

	addon.Field('kind', {
		type: 'string',
		value: 'list',
		options: ['list', 'single', 'settings'],
		description: 'Collection shape: list (many items), single (one item), settings (key-value).'
	});

	addon.Field('fields', {
		type: 'array',
		value: [],
		required: true,
		description: 'The collection schema: an ordered list of field definitions.',
		each: {
			type: 'object',
			description: 'One field definition.',
			config: {
				name: { type: 'string', required: true, description: 'Column name, lowercase, stable.' },
				type: { type: 'string', required: true, description: 'Field type key (text, number, reference, repeater, ...).' },
				label: { type: 'string', description: 'Human label for the field.' },
				translatable: { type: 'boolean', value: false, description: 'Whether the field has per-language values.' },
				required: { type: 'boolean', value: false, description: 'Whether the field must have a value.' },
				config: { type: 'object', value: {}, description: 'Type-specific options (reference target, select options, ...).' }
			}
		}
	});

	addon.Field('config', {
		type: 'object',
		value: {},
		description: 'Free-form collection settings.'
	});

	addon.Field('updated_at', { type: 'string', description: 'Last update timestamp.' });
	addon.Field('created_at', { type: 'string', description: 'Creation timestamp.' });
	addon.Field('deleted_at', { type: 'string', description: 'Soft-delete timestamp, null when active.' });

	addon.Versions('*');
});

import './schema.js';

export default collections;
