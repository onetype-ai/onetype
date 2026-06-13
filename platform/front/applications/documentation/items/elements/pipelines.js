elements.ItemAdd({
	id: 'documentation-pipelines',
	icon: 'account_tree',
	name: 'Documentation Pipelines',
	description: 'Renders pipelines registered for an addon.',
	category: 'Documentation',
	author: 'OneType',
	config: {
		pipelines: {
			type: 'array',
			value: []
		}
	},
	render: function()
	{
		this.columns = [
			{id: 'name', label: 'Param', type: 'tag', width: '1fr'},
			{id: 'type', label: 'Type', type: 'tag', width: '1fr'},
			{id: 'required', label: 'Required', type: 'boolean', align: 'center', width: '120px'},
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
				const define = Array.isArray(field) ? {type: field[0], value: field[1], required: field[2]} : field;

				return {
					id: key,
					name: key,
					type: define.type || 'any',
					required: !!define.required,
					description: define.description || '—'
				};
			});
		};

		this.Compute(() =>
		{
			this.list = this.pipelines.map((pipeline) =>
			{
				return {
					id: pipeline.name,
					description: pipeline.config.description || '—',
					in: schema(pipeline.config.in)
				};
			});
		});

		return /* html */ `
			<div class="ot-flex-vertical">
				<div ot-for="pipeline in list" class="ot-flex-vertical">
					<e-global-heading size="s" :title="pipeline.id" :description="pipeline.description"></e-global-heading>
					<e-data-table ot-if="pipeline.in.length" :columns="columns" :items="pipeline.in" :variant="['border']"></e-data-table>
					<p ot-if="!pipeline.in.length" class="ot-type-text">No input parameters.</p>
				</div>
			</div>
		`;
	}
});
