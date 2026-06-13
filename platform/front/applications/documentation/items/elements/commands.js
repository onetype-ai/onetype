elements.ItemAdd({
	id: 'documentation-commands',
	icon: 'terminal',
	name: 'Documentation Commands',
	description: 'Renders commands registered for an addon.',
	category: 'Documentation',
	author: 'OneType',
	config: {
		commands: {
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
			this.list = this.commands.map((item) =>
			{
				return {
					id: item.Get('id'),
					description: item.Get('description') || '—',
					in: schema(item.Get('in'))
				};
			});
		});

		return /* html */ `
			<div class="ot-flex-vertical">
				<div ot-for="command in list" class="ot-flex-vertical">
					<e-global-heading size="s" :title="command.id" :description="command.description"></e-global-heading>
					<e-data-table ot-if="command.in.length" :columns="columns" :items="command.in" :variant="['border']"></e-data-table>
					<p ot-if="!command.in.length" class="ot-type-text">No input parameters.</p>
				</div>
			</div>
		`;
	}
});
