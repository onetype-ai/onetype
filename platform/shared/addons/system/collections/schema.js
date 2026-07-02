import onetype from '@onetype/framework';

/* Reusable schema for a collection definition, used as command out: 'collection'. */

onetype.DataSchema('collection', {
	id: { type: 'string', description: 'Unique collection id, the database primary key.' },
	team_id: { type: 'string', description: 'Id of the team that owns the collection.' },
	slug: { type: 'string', required: true, description: 'URL-friendly key, also the table suffix (collection_<slug>).' },
	name: { type: 'string', required: true, description: 'Human name shown in the UI.' },
	icon: { type: 'string', description: 'Material Symbols icon.' },
	kind: { type: 'string', value: 'list', description: 'Collection shape: list, single or settings.' },
	fields: {
		type: 'array',
		value: [],
		required: true,
		description: 'The collection schema, an ordered list of field definitions.',
		each: {
			type: 'object',
			description: 'One field definition.',
			config: {
				name: { type: 'string', required: true, description: 'Column name, lowercase, stable.' },
				type: { type: 'string', required: true, description: 'Field type key.' },
				label: { type: 'string', description: 'Human label.' },
				translatable: { type: 'boolean', value: false, description: 'Whether the field has per-language values.' },
				required: { type: 'boolean', value: false, description: 'Whether the field must have a value.' },
				config: { type: 'object', value: {}, description: 'Type-specific options.' }
			}
		}
	},
	config: { type: 'object', value: {}, description: 'Free-form collection settings.' },
	updated_at: { type: 'string', description: 'ISO timestamp of the last update.' },
	created_at: { type: 'string', description: 'ISO timestamp of creation.' },
	deleted_at: { type: 'string', description: 'ISO timestamp of soft deletion, null while active.' }
});
