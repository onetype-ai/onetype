ui.dashboard.types.Item({
	id: 'bar',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				bars: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							label: { type: 'string', value: '', description: 'Category label under the bar.' },
							value: { type: 'number', value: 0, description: 'Bar value, scaled against the largest bar.' },
							color: { type: 'string', value: '', description: 'Bar color name. Empty uses the widget accent.' }
						}
					},
					description: 'Bars to draw, left to right.'
				}
			},
			description: 'Bar data.'
		}
	},
	render: function()
	{
		this.Compute(() =>
		{
			const bars = this.payload.bars || [];
			const max = Math.max(...bars.map((bar) => bar.value || 0), 1);

			this.empty = !bars.length;

			this.bars = bars.map((bar) =>
			{
				return {
					label: bar.label,
					value: bar.value || 0,
					color: bar.color || this.color || 'brand',
					height: Math.max(((bar.value || 0) / max) * 100, 2)
				};
			});
		});

		this.style = (bar) =>
		{
			return 'height: ' + bar.height + '%; background: linear-gradient(180deg, var(--ot-' + bar.color + ') 0%, var(--ot-' + bar.color + '-hover) 100%)';
		};

		return `
			<div class="box">
				<div ot-if="empty" class="empty">No data</div>
				<div ot-if="!empty" class="bars">
					<div ot-for="bar in bars" :ot-key="bar.label" class="col">
						<div class="track">
							<span class="value">{{ bar.value }}</span>
							<div class="bar" :style="style(bar)"></div>
						</div>
						<span class="label">{{ bar.label }}</span>
					</div>
				</div>
			</div>
		`;
	}
});
