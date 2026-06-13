commands.Item({
	id: 'collections:import',
	exposed: true,
	description: 'Import collections from a parsed export payload. Creates collections that do not exist yet, skips the ones that do. Emits collections.import and reports the outcome in a toast.',
	metadata: { addon: 'collections' },
	in: {
		collections: {
			type: 'array',
			required: true,
			description: 'Collections to import, the same shape collections:export produces.',
			each: {
				type: 'object',
				config: {
					id: { type: 'string', required: true, description: 'Unique collection id.' },
					name: { type: 'string', required: true, description: 'Display name.' },
					group: { type: 'string', description: 'Sidebar group.' },
					icon: { type: 'string', description: 'Material Symbols icon.' },
					kind: { type: 'string', description: 'Collection kind: list, settings or system.' },
					parent: { type: 'string', description: 'Parent collection id for children.' },
					count: { type: 'number', description: 'Item count.' }
				}
			}
		}
	},
	out: {
		added: {
			type: 'number',
			description: 'How many collections were created.'
		},
		skipped: {
			type: 'number',
			description: 'How many collections already existed.'
		}
	},
	callback: function(properties, resolve)
	{
		let added = 0;
		let skipped = 0;

		for(const entry of properties.collections)
		{
			if(collections.ItemGet(entry.id))
			{
				skipped = skipped + 1;

				continue;
			}

			collections.Item({
				id: entry.id,
				name: entry.name,
				group: entry.group || 'Content',
				icon: entry.icon || 'database',
				kind: entry.kind || 'list',
				parent: entry.parent || '',
				count: entry.count || 0
			});

			added = added + 1;
		}

		$ot.float.toast({ title: 'Collections', message: 'Imported ' + added + ' collections, skipped ' + skipped + '.', type: added ? 'success' : 'info' });

		onetype.Emit('collections.import', { added, skipped });

		resolve({ added, skipped }, 'Imported ' + added + ' collections, skipped ' + skipped + '.');
	}
});
