ui.dashboard.types.Item({
	id: 'timeline',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				events: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							icon: { type: 'string', value: '', description: 'Marker Material Symbols icon. Empty draws a plain dot.' },
							title: { type: 'string', value: '', description: 'Event title.' },
							detail: { type: 'string', value: '', description: 'Muted text under the title.' },
							time: { type: 'string', value: '', description: 'Time label on the right, like 2m ago.' },
							color: { type: 'string', value: '', description: 'Marker color name. Empty uses the widget accent.' }
						}
					},
					description: 'Events newest first.'
				}
			},
			description: 'Timeline data.'
		}
	},
	render: function()
	{
		this.Compute(() =>
		{
			this.empty = !(this.payload.events || []).length;
			this.events = (this.payload.events || []).map((event) =>
			{
				return { ...event, color: event.color || this.color || 'brand' };
			});
		});

		this.marker = (event) =>
		{
			return 'marker ' + event.color;
		};

		return `
			<div class="box">
				<div ot-if="empty" class="empty">No activity</div>
				<div ot-if="!empty" class="feed">
					<div ot-for="event in events" :ot-key="event.title + event.time" class="event">
						<div :class="marker(event)">
							<i ot-if="event.icon">{{ event.icon }}</i>
						</div>
						<div class="body">
							<div class="top">
								<span class="title">{{ event.title }}</span>
								<span ot-if="event.time" class="time">{{ event.time }}</span>
							</div>
							<span ot-if="event.detail" class="detail">{{ event.detail }}</span>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
