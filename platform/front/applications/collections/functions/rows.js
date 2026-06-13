/* TEMP — fake item rows until the data layer lands. */

collections.Fn('rows', function(id)
{
	const item = this.ItemGet(id);

	if(!item || item.Get('kind') !== 'list')
	{
		return [];
	}

	const total = Math.min(item.Get('count') || 0, 8);
	const rows = [];

	for(let index = 1; index <= total; index++)
	{
		rows.push({
			id: id + '-' + index,
			name: item.Get('name').replace(/s$/, '') + ' ' + index,
			status: index % 4 === 0 ? 'Draft' : 'Published',
			updated: index + 'd ago'
		});
	}

	return rows;
});
