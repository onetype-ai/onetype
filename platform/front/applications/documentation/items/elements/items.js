elements.ItemAdd({
	id: 'documentation-items',
	icon: 'list',
	name: 'Documentation Items',
	description: 'Renders an addon\'s items as a table.',
	category: 'Documentation',
	author: 'OneType',
	config: {
		items: {
			type: 'array',
			value: []
		}
	},
	render: function()
	{
		const types = {id: 'tag', icon: 'icon', route: 'tag', slug: 'tag'};

		this.Compute(() =>
		{
			this.columns = [];
			this.rows = [];

			if(!this.items.length)
			{
				return;
			}

			const definitions = this.items[0].addon.Fields().data;
			const fields = Object.keys(definitions);

			const functional = (field) =>
			{
				const define = definitions[field].define;
				const type = Array.isArray(define) ? define[0] : ((define && define.type) || '');

				return type.includes('function');
			};

			this.columns = fields.map((field) =>
			{
				const type = types[field] || 'text';

				return {id: field, label: field.charAt(0).toUpperCase() + field.slice(1), type: type, align: type === 'icon' ? 'center' : 'left', width: type === 'icon' ? '80px' : '1fr'};
			});

			this.rows = this.items.map((item) =>
			{
				const row = {};

				fields.forEach((field) =>
				{
					const value = item.Get(field);
					const empty = value === undefined || value === null || value === '';

					if(types[field] === 'icon')
					{
						row[field] = empty ? '' : value;
					}
					else if(functional(field) || typeof value === 'function')
					{
						row[field] = empty ? '—' : 'ƒ';
					}
					else
					{
						row[field] = empty ? '—' : (typeof value === 'object' ? JSON.stringify(value) : value);
					}
				});

				return row;
			});
		});

		return /* html */ `
			<e-data-table :columns="columns" :items="rows" :variant="['border']"></e-data-table>
		`;
	}
});
