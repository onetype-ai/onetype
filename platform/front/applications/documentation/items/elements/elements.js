elements.ItemAdd({
	id: 'documentation-elements',
	icon: 'widgets',
	name: 'Documentation Elements',
	description: 'Renders elements registered for an addon.',
	category: 'Documentation',
	author: 'OneType',
	config: {
		elements: {
			type: 'array',
			value: []
		}
	},
	render: function()
	{
		this.columns = [
			{id: 'name', label: 'Prop', type: 'tag', width: '1fr'},
			{id: 'type', label: 'Type', type: 'tag', width: '1fr'},
			{id: 'default', label: 'Default', type: 'text', width: '1fr'},
			{id: 'description', label: 'Description', type: 'text', width: '2fr'}
		];

		this.Compute(() =>
		{
			this.list = this.elements.map((item) =>
			{
				const config = item.Get('config') || {};

				return {
					tag: 'e-' + item.Get('id'),
					description: item.Get('description'),
					config: Object.keys(config).map((key) =>
					{
						const field = config[key];

						return {
							id: key,
							name: key,
							type: field.type || 'any',
							default: field.value === undefined || field.value === null ? '—' : JSON.stringify(field.value),
							description: field.description || '—'
						};
					})
				};
			});
		});

		return /* html */ `
			<div class="ot-flex-vertical">
				<div ot-for="element in list" class="ot-flex-vertical">
					<e-global-heading size="s" :title="element.tag" :description="element.description"></e-global-heading>
					<e-data-table ot-if="element.config.length" :columns="columns" :items="element.config" :variant="['border']"></e-data-table>
					<p ot-if="!element.config.length" class="ot-type-text">No configurable props.</p>
				</div>
			</div>
		`;
	}
});
