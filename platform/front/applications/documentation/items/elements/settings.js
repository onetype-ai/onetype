elements.ItemAdd({
	id: 'documentation-settings',
	icon: 'tune',
	name: 'Documentation Settings',
	description: 'Renders settings registered for an addon.',
	category: 'Documentation',
	author: 'OneType',
	config: {
		settings: {
			type: 'array',
			value: []
		}
	},
	render: function()
	{
		this.columns = [
			{id: 'name', label: 'Setting', type: 'tag', width: '1fr'},
			{id: 'type', label: 'Type', type: 'tag', width: '1fr'},
			{id: 'default', label: 'Default', type: 'text', width: '1fr'},
			{id: 'description', label: 'Description', type: 'text', width: '2fr'},
			{id: 'persist', label: 'Persist', type: 'boolean', align: 'center', width: '120px'}
		];

		this.Compute(() =>
		{
			this.rows = this.settings.map((item) =>
			{
				const value = item.Get('default');

				return {
					id: item.Get('id'),
					name: item.Get('id'),
					type: item.Get('type') || 'any',
					default: value === undefined || value === null ? '—' : JSON.stringify(value),
					description: item.Get('description') || '—',
					persist: !!item.Get('persist')
				};
			});
		});

		return /* html */ `
			<e-data-table :columns="columns" :items="rows" :variant="['border']"></e-data-table>
		`;
	}
});
