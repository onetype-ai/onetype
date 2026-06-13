elements.ItemAdd({
	id: 'documentation-events',
	icon: 'bolt',
	name: 'Documentation Events',
	description: 'Renders events registered for an addon.',
	category: 'Documentation',
	author: 'OneType',
	config: {
		events: {
			type: 'array',
			value: []
		}
	},
	render: function()
	{
		this.columns = [
			{id: 'name', label: 'Payload', type: 'tag', width: '1fr'},
			{id: 'type', label: 'Type', type: 'tag', width: '1fr'},
			{id: 'description', label: 'Description', type: 'text', width: '2fr'}
		];

		const schema = (object) =>
		{
			if(!object || typeof object !== 'object')
			{
				return [];
			}

			return Object.keys(object).map((key) =>
			{
				const field = object[key];
				const define = Array.isArray(field) ? {type: field[0]} : field;

				return {
					id: key,
					name: key,
					type: define.type || 'any',
					description: define.description || '—'
				};
			});
		};

		this.Compute(() =>
		{
			this.list = this.events.map((event) =>
			{
				return {
					id: event.name,
					description: event.description || '—',
					payload: schema(event.config)
				};
			});
		});

		return /* html */ `
			<div class="ot-flex-vertical">
				<div ot-for="event in list" class="ot-flex-vertical">
					<e-global-heading size="s" :title="event.id" :description="event.description"></e-global-heading>
					<e-data-table ot-if="event.payload.length" :columns="columns" :items="event.payload" :variant="['border']"></e-data-table>
					<p ot-if="!event.payload.length" class="ot-type-text">No payload.</p>
				</div>
			</div>
		`;
	}
});
