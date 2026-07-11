import commands from '@onetype/framework/commands';
import collections from '../../addon.js';
import types from '../../types.js';

commands.Item({
	id: 'collections:import',
	exposed: true,
	description: 'Import an export payload: missing collections are created, entries inserted with fresh ids, references remapped, translations restored.',
	metadata: { addon: 'collections' },
	in: {
		data: {
			type: 'object',
			required: true,
			config: {
				collections: {
					type: 'array',
					value: [],
					each: {
						type: 'object'
					},
					description: 'Collections to import, in the collections:export shape.'
				}
			},
			description: 'The payload produced by collections:export.'
		}
	},
	out: {
		collections: ['number'],
		entries: ['number']
	},
	callback: async function(properties, resolve)
	{
		for(const entry of properties.data.collections)
		{
			if(!entry.slug || !Array.isArray(entry.fields) || !Array.isArray(entry.entries))
			{
				return resolve(null, 'Collection payload is missing slug, fields or entries.', 400);
			}

			const unknown = entry.fields.find((field) => !types.ItemGet(field.type));

			if(unknown)
			{
				return resolve(null, 'Unknown field type ' + unknown.type + ' on field ' + unknown.name + '.', 400);
			}
		}

		const summary = await collections.Fn('import', properties.data);

		resolve(summary, 'Imported ' + summary.collections + ' collections with ' + summary.entries + ' entries.');
	}
});
