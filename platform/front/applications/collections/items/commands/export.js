commands.Item({
	id: 'collections:export',
	exposed: true,
	description: 'Export collections as a JSON file download. Exports everything unless an id narrows it to one collection with its children. Emits collections.export.',
	metadata: { addon: 'collections' },
	in: {
		id: {
			type: 'string',
			description: 'ID of a single collection to export, with its children. Omit to export every collection.'
		}
	},
	out: {
		collections: {
			type: 'number',
			description: 'How many collections went into the export.'
		},
		rows: {
			type: 'number',
			description: 'How many items went into the export.'
		}
	},
	callback: function(properties, resolve)
	{
		let list = Object.values(collections.Items());

		if(properties.id)
		{
			if(!collections.ItemGet(properties.id))
			{
				return resolve(null, 'Collection ' + properties.id + ' not found.', 404);
			}

			list = list.filter((item) => item.Get('id') === properties.id || item.Get('parent') === properties.id);
		}

		let rows = 0;

		const data = list.map((item) =>
		{
			const entries = collections.Fn('rows', item.Get('id'));

			rows = rows + entries.length;

			return {
				id: item.Get('id'),
				name: item.Get('name'),
				group: item.Get('group'),
				icon: item.Get('icon'),
				kind: item.Get('kind'),
				parent: item.Get('parent'),
				count: item.Get('count'),
				rows: entries
			};
		});

		const blob = new Blob([JSON.stringify({ collections: data }, null, '\t')], { type: 'application/json' });
		const link = document.createElement('a');

		link.href = URL.createObjectURL(blob);
		link.download = (properties.id || 'collections') + '.json';
		link.click();

		URL.revokeObjectURL(link.href);

		onetype.Emit('collections.export', { collections: data.length, rows });

		resolve({ collections: data.length, rows }, 'Exported ' + data.length + ' collections with ' + rows + ' items.');
	}
});
