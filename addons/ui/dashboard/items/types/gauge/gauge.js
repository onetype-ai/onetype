ui.dashboard.types.Item({
	id: 'gauge',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				value: { type: 'number', value: 0, description: 'Current value.' },
				min: { type: 'number', value: 0, description: 'Range start.' },
				max: { type: 'number', value: 100, description: 'Range end.' },
				display: { type: 'string', value: '', description: 'Text shown in the center. Empty shows the value.' },
				caption: { type: 'string', value: '', description: 'Muted caption under the value.' },
				color: { type: 'string', value: '', description: 'Arc color name. Empty uses the widget accent.' }
			},
			description: 'Gauge data.'
		}
	},
	render: function()
	{
		const radius = 54;
		const length = Math.PI * radius;

		this.Compute(() =>
		{
			const min = this.payload.min || 0;
			const max = this.payload.max != null ? this.payload.max : 100;
			const value = Math.min(Math.max(this.payload.value || 0, min), max);
			const fraction = max > min ? (value - min) / (max - min) : 0;

			this.color = this.payload.color || this.color || 'brand';
			this.display = this.payload.display || String(this.payload.value || 0);
			this.caption = this.payload.caption || '';
			this.dash = (fraction * length) + ' ' + length;
		});

		this.arc = () =>
		{
			return 'stroke: var(--ot-' + this.color + '); stroke-dasharray: ' + this.dash;
		};

		return `
			<div class="box">
				<div class="gauge">
					<svg viewBox="0 0 120 66">
						<path class="track" d="M6 60 A54 54 0 0 1 114 60"></path>
						<path class="fill" d="M6 60 A54 54 0 0 1 114 60" :style="arc()"></path>
					</svg>
					<div class="center">
						<span class="value">{{ display }}</span>
						<span ot-if="caption" class="caption">{{ caption }}</span>
					</div>
				</div>
			</div>
		`;
	}
});
