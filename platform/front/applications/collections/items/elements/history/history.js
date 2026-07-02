elements.ItemAdd({
	id: 'collections-history',
	icon: 'history',
	name: 'Collections History',
	description: 'Version timeline of the selected collection.',
	category: 'Collections',
	author: 'OneType',
	metadata: { addon: 'collections' },
	render: function()
	{
		const refresh = () =>
		{
			const item = collections.ItemGet($ot.settings.get('collections.active', ''));

			this.collection = item ? { id: item.Get('id'), icon: item.Get('icon'), name: item.Get('name') } : null;
			this.open = $ot.settings.get('collections.version', '');

			const days = {};

			for(const version of item ? collections.Fn('versions', item.Get('id')) : [])
			{
				const day = days[version.day] = days[version.day] || { day: version.day, versions: [] };

				day.versions.push(version);
			}

			this.days = Object.values(days);
		};

		refresh();

		this.On('collections.select', refresh);
		this.On('collections.version', refresh);

		this.pick = (version) =>
		{
			$ot.command('collections:version', { id: version.id });
		};

		this.chip = (type) =>
		{
			return { schema: 'Schema', item: 'Item', import: 'Import' }[type] || type;
		};

		return `
			<div class="box ot-scrollbar">
				<div ot-if="collection" class="timeline">
					<div ot-for="entry in days" :ot-key="entry.day" class="day">
						<div class="label">{{ entry.day }}</div>
						<div ot-for="version in entry.versions" :ot-key="version.id + ':' + (version.id === open)" :class="version.id === open ? 'version active' : 'version'" ot-click="pick(version)">
							<span class="node"></span>
							<div class="card">
								<div class="top">
									<span class="title">{{ version.title }}</span>
									<span :class="'chip ' + version.type">{{ chip(version.type) }}</span>
								</div>
								<div class="meta">{{ version.time }} · {{ version.author }} · {{ version.changes.length }} changes</div>
							</div>
						</div>
					</div>
				</div>
				<div ot-if="!collection" class="empty">
					<i>history</i>
					<span>Select a collection in the sidebar.</span>
				</div>
			</div>
		`;
	}
});
