elements.ItemAdd({
	id: 'documentation-store',
	icon: 'database',
	name: 'Documentation Store',
	description: 'Renders an addon\'s store as key-value pairs.',
	category: 'Documentation',
	author: 'OneType',
	config: {
		store: {
			type: 'array',
			value: []
		}
	},
	render: function()
	{
		this.columns = [
			{id: 'key', label: 'Key', type: 'tag', width: '1fr'},
			{id: 'value', label: 'Value', type: 'text', width: '2fr'}
		];

		this.Compute(() =>
		{
			this.rows = this.store.map(([key, value]) =>
			{
				return {
					id: key,
					key: key,
					value: typeof value === 'object' ? JSON.stringify(value) : String(value)
				};
			});
		});

		return /* html */ `
			<e-data-table :columns="columns" :items="rows" :variant="['border']"></e-data-table>
		`;
	}
});
