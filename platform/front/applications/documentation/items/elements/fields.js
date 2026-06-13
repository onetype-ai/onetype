elements.ItemAdd({
	id: 'documentation-fields',
	icon: 'data_object',
	name: 'Documentation Fields',
	description: 'Renders an addon\'s fields as a table.',
	category: 'Documentation',
	author: 'OneType',
	config: {
		fields: {
			type: 'array',
			value: []
		}
	},
	render: function()
	{
		this.columns = [
			{id: 'name', label: 'Field', type: 'tag', width: '1fr'},
			{id: 'type', label: 'Type', type: 'tag', width: '1fr'},
			{id: 'default', label: 'Default', type: 'text', width: '1fr'},
			{id: 'description', label: 'Description', type: 'text', width: '2fr'},
			{id: 'required', label: 'Required', type: 'boolean', align: 'center', width: '120px'}
		];

		this.Compute(() =>
		{
			this.rows = this.fields.map((field) =>
			{
				const define = field.define || [];

				const type = Array.isArray(define) ? define[0] : define.type;
				const value = Array.isArray(define) ? define[1] : define.value;
				const required = Array.isArray(define) ? define[2] : define.required;
				const description = Array.isArray(define) ? null : define.description;

				return {
					id: field.name,
					name: field.name,
					type: type || 'any',
					default: value === undefined || value === null ? '—' : JSON.stringify(value),
					description: description || '—',
					required: !!required
				};
			});
		});

		return /* html */ `
			<e-data-table :columns="columns" :items="rows" :variant="['border']"></e-data-table>
		`;
	}
});
