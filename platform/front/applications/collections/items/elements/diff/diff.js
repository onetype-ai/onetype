elements.ItemAdd({
	id: 'collections-diff',
	icon: 'difference',
	name: 'Collections Diff',
	description: 'Field level changes of the version selected in the history timeline.',
	category: 'Collections',
	author: 'OneType',
	metadata: { addon: 'collections' },
	render: function()
	{
		const refresh = () =>
		{
			const active = $ot.settings.get('collections.active', '');
			const open = $ot.settings.get('collections.version', '');

			this.version = collections.Fn('versions', active).find((entry) => entry.id === open) || null;
		};

		refresh();

		this.On('collections.select', refresh);
		this.On('collections.version', refresh);

		this.restore = () =>
		{
			$ot.float.toast({ title: 'Collections', message: 'Restore lands together with the data layer.', type: 'info' });
		};

		this.icon = (kind) =>
		{
			return { added: 'add', removed: 'remove', changed: 'arrow_forward' }[kind] || 'edit';
		};

		return `
			<div class="box">
				<div ot-if="version" class="head">
					<div class="info">
						<div class="title">{{ version.title }}</div>
						<div class="meta">{{ version.day }} {{ version.time }} · {{ version.author }}</div>
					</div>
				</div>
				<div ot-if="version" class="body ot-scrollbar">
					<div ot-for="change in version.changes" :ot-key="change.field" :class="'change ' + change.kind">
						<div class="row">
							<span class="badge"><i>{{ icon(change.kind) }}</i></span>
							<span class="field">{{ change.field }}</span>
						</div>
						<div ot-if="change.from" class="value from">{{ change.from }}</div>
						<div ot-if="change.to" class="value to">{{ change.to }}</div>
					</div>
				</div>
				<div ot-if="version" class="foot">
					<e-form-button text="Restore this version" color="brand" tone="soft" :_click="restore"></e-form-button>
				</div>
				<div ot-if="!version" class="empty">
					<i>difference</i>
					<span>Pick a version in the timeline.</span>
				</div>
			</div>
		`;
	}
});
