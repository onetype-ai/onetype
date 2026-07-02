elements.ItemAdd({
	id: 'collections-preview',
	icon: 'visibility',
	name: 'Collections Preview',
	description: 'Items of the selected collection as a table.',
	category: 'Collections',
	author: 'OneType',
	metadata: { addon: 'collections' },
	render: function()
	{
		this.columns = [
			{ id: 'name', label: 'Name', type: 'text', width: '2fr' },
			{ id: 'status', label: 'Status', type: 'status', width: '1fr' },
			{ id: 'updated', label: 'Updated', type: 'text', width: '1fr' }
		];

		const refresh = () =>
		{
			const item = collections.ItemGet($ot.settings.get('collections.active', ''));

			this.collection = item ? { id: item.Get('id'), icon: item.Get('icon'), name: item.Get('name'), kind: item.Get('kind') } : null;
			this.rows = item ? collections.Fn('rows', item.Get('id')) : [];
		};

		refresh();

		this.On('collections.select', refresh);

		this.click = ({ value }) =>
		{
			$ot.command('collections:edit', { id: value.id });
		};

		return `
			<div class="box">
				<div ot-if="collection" class="head">
					<div class="tile"><i>{{ collection.icon }}</i></div>
					<div>
						<h1>{{ collection.name }}</h1>
						<div class="meta">{{ collection.id }} · {{ rows.length }} items</div>
					</div>
				</div>
				<div ot-if="collection && rows.length" class="table ot-scrollbar">
					<e-data-table :columns="columns" :items="rows" :_click="click" :variant="['border']"></e-data-table>
				</div>
				<div ot-if="collection && !rows.length" class="empty">
					<i>inbox</i>
					<span>No items here yet.</span>
				</div>
				<div ot-if="!collection" class="empty">
					<i>database</i>
					<span>Select a collection in the sidebar.</span>
				</div>
			</div>
		`;
	}
});
