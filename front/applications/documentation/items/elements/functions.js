elements.ItemAdd({
	id: 'documentation-functions',
	icon: 'function',
	name: 'Documentation Functions',
	description: 'Renders an addon\'s registered functions.',
	category: 'Documentation',
	author: 'OneType',
	config: {
		functions: {
			type: 'array',
			value: []
		}
	},
	render: function()
	{
		this.columns = [
			{id: 'name', label: 'Function', type: 'tag', width: '1fr'},
			{id: 'parameters', label: 'Parameters', type: 'text', width: '2fr'},
			{id: 'arity', label: 'Arity', type: 'text', align: 'center', width: '100px'}
		];

		const signature = (callback) =>
		{
			const source = callback.toString();
			const match = source.match(/^[^(]*\(([^)]*)\)/);

			return match ? match[1].split(',').map((part) => part.trim()).filter(Boolean) : [];
		};

		this.Compute(() =>
		{
			this.rows = this.functions.map((entry) =>
			{
				const params = signature(entry.callback);

				return {
					id: entry.name,
					name: entry.name,
					parameters: params.length ? params.join(', ') : '—',
					arity: entry.callback.length
				};
			});
		});

		return /* html */ `
			<e-data-table :columns="columns" :items="rows" :variant="['border']"></e-data-table>
		`;
	}
});
