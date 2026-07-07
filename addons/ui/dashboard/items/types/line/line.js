ui.dashboard.types.Item({
	id: 'line',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				labels: {
					type: 'array',
					value: [],
					each: { type: 'string' },
					description: 'X axis labels, one per point. Only the first and last are shown.'
				},
				series: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							name: { type: 'string', value: '', description: 'Series name shown in the legend.' },
							color: { type: 'string', value: '', description: 'Series color name. Empty uses the widget accent.' },
							points: { type: 'array', value: [], each: { type: 'number' }, description: 'Y values, one per label.' }
						}
					},
					description: 'One or more series sharing the same labels.'
				}
			},
			description: 'Line data.'
		}
	},
	render: function()
	{
		const width = 300;
		const height = 100;

		this.Compute(() =>
		{
			const series = this.payload.series || [];
			const all = series.flatMap((line) => line.points || []);

			this.empty = !all.length;

			const max = Math.max(...all, 1);
			const min = Math.min(...all, 0);
			const range = max - min || 1;

			const project = (points) =>
			{
				const step = points.length > 1 ? width / (points.length - 1) : 0;

				return points.map((value, index) =>
				{
					return { x: index * step, y: height - ((value - min) / range) * height };
				});
			};

			this.lines = series.map((line, index) =>
			{
				const coordinates = project(line.points || []);
				const path = coordinates.map((point, i) => (i ? 'L' : 'M') + point.x.toFixed(1) + ' ' + point.y.toFixed(1)).join(' ');

				return {
					name: line.name,
					color: line.color || this.color || 'brand',
					path,
					area: index === 0 && coordinates.length ? path + ' L' + width + ' ' + height + ' L0 ' + height + ' Z' : '',
					primary: index === 0
				};
			});

			this.labels = this.payload.labels || [];
			this.multi = series.length > 1;
		});

		this.tint = (line) =>
		{
			return 'color: var(--ot-' + line.color + ')';
		};

		this.dot = (line) =>
		{
			return 'background: var(--ot-' + line.color + ')';
		};

		return `
			<div class="box">
				<div ot-if="empty" class="empty">No data</div>
				<div ot-if="!empty" class="chart">
					<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
						<defs>
							<linearGradient id="dash-line-fade" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stop-color="currentColor" stop-opacity="0.22"></stop>
								<stop offset="100%" stop-color="currentColor" stop-opacity="0"></stop>
							</linearGradient>
						</defs>
						<g ot-for="line in lines" :ot-key="line.name" :style="tint(line)">
							<path ot-if="line.primary" :d="line.area" class="area"></path>
							<path :d="line.path" class="line"></path>
						</g>
					</svg>
				</div>
				<div ot-if="!empty && (multi || labels.length)" class="foot">
					<div ot-if="multi" class="legend">
						<span ot-for="line in lines" :ot-key="'g' + line.name" class="key">
							<span class="dot" :style="dot(line)"></span>
							<span>{{ line.name }}</span>
						</span>
					</div>
					<div ot-if="!multi && labels.length" class="range">
						<span>{{ labels[0] }}</span>
						<span>{{ labels[labels.length - 1] }}</span>
					</div>
				</div>
			</div>
		`;
	}
});
