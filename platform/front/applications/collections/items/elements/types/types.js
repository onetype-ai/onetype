elements.ItemAdd({
	id: 'collections-types',
	icon: 'category',
	name: 'Field Types',
	description: 'Palette of field types, the registry extensions add their own types to.',
	category: 'Collections',
	author: 'OneType',
	metadata: { addon: 'collections' },
	render: function()
	{
		const refresh = () =>
		{
			this.groups = collections.Fn('types');
		};

		refresh();

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'collections.types' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'collections.types' && refresh());

		this.tooltip = (type) =>
		{
			return { text: type.description, position: { x: 'center', y: 'top' } };
		};

		return `
			<div class="box">
				<div class="head">
					<div class="title">Field types</div>
					<div class="sub">Drag a type into the schema.</div>
				</div>
				<div class="groups ot-scrollbar">
					<div ot-for="group in groups" :ot-key="group.title" class="group">
						<div class="label">{{ group.title }}</div>
						<div class="tiles">
							<div ot-for="type in group.types" :ot-key="type.id" class="tile" :ot-tooltip="tooltip(type)">
								<i>{{ type.icon }}</i>
								<span>{{ type.name }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
