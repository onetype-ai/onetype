ui.dashboard.types.Item({
	id: 'list',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				rows: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							icon: { type: 'string', value: '', description: 'Leading Material Symbols icon.' },
							label: { type: 'string', value: '', description: 'Row title.' },
							sublabel: { type: 'string', value: '', description: 'Muted text under the label.' },
							value: { type: 'string|number', value: '', description: 'Trailing value.' },
							percent: { type: 'number', description: 'Fill of the progress bar behind the row, 0 to 100. Empty draws no bar.' },
							color: { type: 'string', value: '', description: 'Bar and value color name. Empty uses the widget accent.' }
						}
					},
					description: 'Rows top to bottom.'
				}
			},
			description: 'List data.'
		}
	},
	render: function()
	{
		this.Compute(() =>
		{
			this.empty = !(this.payload.rows || []).length;
			this.rows = (this.payload.rows || []).map((row) =>
			{
				return { ...row, color: row.color || this.color || 'brand' };
			});
		});

		this.bar = (row) =>
		{
			return 'width: ' + Math.min(Math.max(row.percent, 0), 100) + '%; background: var(--ot-' + row.color + '-opacity)';
		};

		this.tint = (row) =>
		{
			return 'color: var(--ot-' + row.color + ')';
		};

		return `
			<div class="box">
				<div ot-if="empty" class="empty">No data</div>
				<div ot-for="row in rows" :ot-key="row.label" class="row">
					<div ot-if="row.percent != null" class="fill" :style="bar(row)"></div>
					<i ot-if="row.icon" class="lead">{{ row.icon }}</i>
					<div class="text">
						<span class="label">{{ row.label }}</span>
						<span ot-if="row.sublabel" class="sub">{{ row.sublabel }}</span>
					</div>
					<span ot-if="row.value !== '' && row.value != null" class="value" :style="row.percent != null ? tint(row) : ''">{{ row.value }}</span>
				</div>
			</div>
		`;
	}
});
