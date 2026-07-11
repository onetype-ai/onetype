import commands from '@onetype/framework/commands';
import collections from '../../addon.js';

commands.Item({
	id: 'collections:export',
	exposed: true,
	description: 'Export collections as portable JSON: definitions, entries and translations, in field terms independent of storage.',
	metadata: { addon: 'collections' },
	in: {
		slug: {
			type: 'string',
			description: 'Export one collection by slug. Without it the whole instance is exported.'
		}
	},
	out: {
		data: {
			type: 'object',
			config: {
				collections: {
					type: 'array',
					each: {
						type: 'object'
					},
					description: 'Exported collections, each carrying its definition, entries and translations.'
				}
			},
			description: 'The export payload, ready to feed collections:import.'
		}
	},
	callback: async function(properties, resolve)
	{
		resolve({ data: await collections.Fn('export', properties.slug || null) });
	}
});
