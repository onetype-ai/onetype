elements.ItemAdd({
	id: 'collections-build',
	icon: 'schema',
	name: 'Collections Build',
	description: 'Schema builder for the selected collection.',
	category: 'Collections',
	author: 'OneType',
	metadata: { addon: 'collections' },
	render: function()
	{
		this.tab = 'fields';

		this.tabs = [
			{ id: 'fields', label: 'Fields', icon: 'view_agenda' },
			{ id: 'permissions', label: 'Permissions', icon: 'lock' },
			{ id: 'api', label: 'API', icon: 'api' },
			{ id: 'settings', label: 'Settings', icon: 'tune' }
		];

		const refresh = () =>
		{
			const item = collections.ItemGet(settings.Fn('get', 'collections.active', ''));

			this.collection = item ? { id: item.Get('id'), icon: item.Get('icon'), name: item.Get('name'), kind: item.Get('kind') } : null;
		};

		refresh();

		this.On('collections.select', refresh);

		this.change = ({ value }) =>
		{
			this.tab = value;
		};

		return `
			<div class="box">
				<div ot-if="collection" class="head">
					<div class="title">
						<div class="tile"><i>{{ collection.icon }}</i></div>
						<div>
							<h1>{{ collection.name }}</h1>
							<div class="meta">{{ collection.id }} · {{ collection.kind }}</div>
						</div>
					</div>
					<e-navigation-tabs :items="tabs" :active="tab" :_change="change"></e-navigation-tabs>
				</div>
				<div ot-if="collection" class="content">
					<div ot-if="tab === 'fields'" class="placeholder">Schema builder lands here. Drag a field type from the right.</div>
					<div ot-if="tab === 'permissions'" class="placeholder">Who can read, create, update and delete items.</div>
					<div ot-if="tab === 'api'" class="placeholder">Endpoints and tokens for this collection.</div>
					<div ot-if="tab === 'settings'" class="placeholder">Name, icon, group and behavior of the collection.</div>
				</div>
				<div ot-if="!collection" class="empty">
					<i>database</i>
					<span>Select a collection in the sidebar.</span>
				</div>
			</div>
		`;
	}
});
