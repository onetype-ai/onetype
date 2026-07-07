ui.dashboard.types.Item({
	id: 'status',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				items: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							label: { type: 'string', value: '', description: 'Service or check name.' },
							sublabel: { type: 'string', value: '', description: 'Muted text under the label.' },
							value: { type: 'string', value: '', description: 'Reading on the right, like 42ms or 99.9%.' },
							status: { type: 'string', value: 'up', options: ['up', 'warn', 'down', 'idle'], description: 'Status, sets the dot color.' }
						}
					},
					description: 'Items top to bottom.'
				}
			},
			description: 'Status data.'
		}
	},
	render: function()
	{
		this.Compute(() =>
		{
			this.empty = !(this.payload.items || []).length;
			this.items = this.payload.items || [];
		});

		return `
			<div class="box">
				<div ot-if="empty" class="empty">No data</div>
				<div ot-for="item in items" :ot-key="item.label" class="item">
					<span :class="'dot ' + (item.status || 'up')"></span>
					<div class="text">
						<span class="label">{{ item.label }}</span>
						<span ot-if="item.sublabel" class="sub">{{ item.sublabel }}</span>
					</div>
					<span ot-if="item.value" class="value">{{ item.value }}</span>
				</div>
			</div>
		`;
	}
});
