/* TEMP — fake version history until the framework History wiring lands. */

collections.Fn('versions', function(id)
{
	const item = this.ItemGet(id);

	if(!item)
	{
		return [];
	}

	const name = item.Get('name');
	const single = name.replace(/s$/, '');

	return [
		{
			id: 'v12',
			day: 'Today',
			time: '14:32',
			author: 'Dejan',
			type: 'schema',
			title: 'Added Gallery field',
			changes: [
				{ kind: 'added', field: 'Gallery', from: '', to: 'Gallery, ordered set of images' },
				{ kind: 'changed', field: 'Images', from: 'required', to: 'optional' }
			]
		},
		{
			id: 'v11',
			day: 'Today',
			time: '11:08',
			author: 'Assistant',
			type: 'item',
			title: 'Updated ' + single + ' 3',
			changes: [
				{ kind: 'changed', field: 'Price', from: '€420.00', to: '€380.00' },
				{ kind: 'changed', field: 'Status', from: 'Draft', to: 'Published' }
			]
		},
		{
			id: 'v10',
			day: 'Yesterday',
			time: '18:51',
			author: 'Mila',
			type: 'import',
			title: 'Imported 8 items',
			changes: [
				{ kind: 'added', field: single + ' 1 — ' + single + ' 8', from: '', to: '8 new items' }
			]
		},
		{
			id: 'v9',
			day: 'Yesterday',
			time: '16:14',
			author: 'Dejan',
			type: 'schema',
			title: 'Renamed field Title to Name',
			changes: [
				{ kind: 'changed', field: 'Title', from: 'title', to: 'name' }
			]
		},
		{
			id: 'v8',
			day: 'Yesterday',
			time: '10:30',
			author: 'Dejan',
			type: 'item',
			title: 'Deleted ' + single + ' 9',
			changes: [
				{ kind: 'removed', field: single + ' 9', from: 'Published item', to: '' }
			]
		},
		{
			id: 'v7',
			day: 'Mon, Jun 9',
			time: '15:02',
			author: 'Assistant',
			type: 'schema',
			title: 'Created the collection',
			changes: [
				{ kind: 'added', field: name, from: '', to: 'Collection with 6 fields' }
			]
		}
	];
});
