elements.ItemAdd({
	id: 'collections-export',
	icon: 'download',
	name: 'Collections Export',
	description: 'Export collections as a JSON download.',
	category: 'Collections',
	author: 'OneType',
	metadata: { addon: 'collections' },
	render: function()
	{
		const refresh = () =>
		{
			const item = collections.ItemGet($ot.settings.get('collections.active', ''));

			this.active = item ? { id: item.Get('id'), name: item.Get('name') } : null;
			this.total = Object.keys(collections.Items()).length;
		};

		refresh();

		this.On('collections.select', refresh);

		this.everything = () =>
		{
			$ot.command('collections:export', {});
		};

		this.single = () =>
		{
			$ot.command('collections:export', { id: this.active.id });
		};

		return `
			<div class="box">
				<div class="card">
					<div class="tile"><i>download</i></div>
					<h1>Export</h1>
					<p>Download collections as JSON: schema, grouping, nesting and items. The same file imports back on any OneType site.</p>
					<div class="actions">
						<div class="action" ot-click="everything">
							<i>database</i>
							<div class="info">
								<div class="label">Everything</div>
								<div class="sub">{{ total }} collections</div>
							</div>
							<i class="go">arrow_forward</i>
						</div>
						<div ot-if="active" class="action" ot-click="single">
							<i>filter_alt</i>
							<div class="info">
								<div class="label">Only {{ active.name }}</div>
								<div class="sub">with its children</div>
							</div>
							<i class="go">arrow_forward</i>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
