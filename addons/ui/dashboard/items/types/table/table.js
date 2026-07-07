ui.dashboard.types.Item({
	id: 'table',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				columns: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							key: { type: 'string', value: '', description: 'Row field this column reads.' },
							label: { type: 'string', value: '', description: 'Column header text.' },
							align: { type: 'string', value: 'left', options: ['left', 'right'], description: 'Cell alignment.' },
							badge: { type: 'boolean', value: false, description: 'Render the cell as a colored badge, reading the color from the row field key + Color.' }
						}
					},
					description: 'Columns left to right.'
				},
				rows: {
					type: 'array',
					value: [],
					each: { type: 'object' },
					description: 'Rows, each a flat object keyed by the column keys.'
				}
			},
			description: 'Table data.'
		}
	},
	render: function()
	{
		this.Compute(() =>
		{
			const columns = this.payload.columns || [];
			const rows = this.payload.rows || [];

			this.template = columns.map((column, index) => index === 0 ? 'minmax(0, 1fr)' : 'auto').join(' ');

			this.cells = [];

			columns.forEach((column) =>
			{
				this.cells.push({
					key: 'h-' + column.key,
					value: column.label,
					pill: '',
					classes: 'cell head ' + (column.align === 'right' ? 'right' : 'left')
				});
			});

			rows.forEach((row, index) =>
			{
				columns.forEach((column) =>
				{
					this.cells.push({
						key: index + '-' + column.key,
						value: row[column.key],
						pill: column.badge ? 'pill badge ' + (row[column.key + 'Color'] || this.color || 'brand') : 'pill',
						classes: 'cell body ' + (column.align === 'right' ? 'right' : 'left')
					});
				});
			});

			this.empty = !rows.length;
		});

		return `
			<div class="box">
				<div ot-if="empty" class="empty">No data</div>
				<div ot-if="!empty" class="table" :style="'grid-template-columns:' + template">
					<div ot-for="cell in cells" :ot-key="cell.key" :class="cell.classes">
						<span :class="cell.pill">{{ cell.value }}</span>
					</div>
				</div>
			</div>
		`;
	}
});
