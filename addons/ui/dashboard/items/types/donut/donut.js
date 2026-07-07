ui.dashboard.types.Item({
	id: 'donut',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				label: { type: 'string', value: '', description: 'Caption under the center total.' },
				segments: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							name: { type: 'string', value: '', description: 'Segment name in the legend.' },
							value: { type: 'number', value: 0, description: 'Segment value, summed into the total.' },
							color: { type: 'string', value: '', description: 'Segment color name.' }
						}
					},
					description: 'Segments of the ring.'
				}
			},
			description: 'Donut data.'
		}
	},
	render: function()
	{
		const palette = ['brand', 'blue', 'green', 'orange', 'red'];
		const radius = 42;
		const circumference = 2 * Math.PI * radius;

		this.Compute(() =>
		{
			const segments = (this.payload.segments || []).filter((segment) => (segment.value || 0) > 0);
			const total = segments.reduce((sum, segment) => sum + (segment.value || 0), 0);

			this.empty = !total;
			this.total = total;
			this.label = this.payload.label || '';

			let offset = 0;

			this.arcs = segments.map((segment, index) =>
			{
				const fraction = segment.value / total;
				const length = fraction * circumference;
				const arc = {
					name: segment.name,
					value: segment.value,
					color: segment.color || palette[index % palette.length],
					dash: length + ' ' + (circumference - length),
					shift: -offset
				};

				offset += length;

				return arc;
			});
		});

		this.ring = (arc) =>
		{
			return 'stroke: var(--ot-' + arc.color + '); stroke-dasharray: ' + arc.dash + '; stroke-dashoffset: ' + arc.shift;
		};

		this.dot = (arc) =>
		{
			return 'background: var(--ot-' + arc.color + ')';
		};

		return `
			<div class="box">
				<div ot-if="empty" class="empty">No data</div>
				<div ot-if="!empty" class="chart">
					<div class="ring">
						<svg viewBox="0 0 100 100">
							<circle class="track" cx="50" cy="50" r="42"></circle>
							<circle ot-for="arc in arcs" :ot-key="arc.name" class="arc" cx="50" cy="50" r="42" :style="ring(arc)"></circle>
						</svg>
						<div class="center">
							<span class="total">{{ total }}</span>
							<span ot-if="label" class="caption">{{ label }}</span>
						</div>
					</div>
					<div class="legend">
						<span ot-for="arc in arcs" :ot-key="'k' + arc.name" class="key">
							<span class="dot" :style="dot(arc)"></span>
							<span class="name">{{ arc.name }}</span>
							<span class="value">{{ arc.value }}</span>
						</span>
					</div>
				</div>
			</div>
		`;
	}
});
