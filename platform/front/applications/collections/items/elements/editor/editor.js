elements.ItemAdd({
	id: 'collections-editor',
	icon: 'edit_note',
	name: 'Collections Editor',
	description: 'Edit panel for the item selected in the preview table.',
	category: 'Collections',
	author: 'OneType',
	metadata: { addon: 'collections' },
	render: function()
	{
		const refresh = () =>
		{
			const active = $ot.settings.get('collections.active', '');
			const open = $ot.settings.get('collections.item', '');

			this.row = collections.Fn('rows', active).find((entry) => entry.id === open) || null;
			this.slug = this.row ? this.row.name.toLowerCase().replace(/\s+/g, '-') : '';
		};

		refresh();

		this.On('collections.select', refresh);
		this.On('collections.edit', refresh);

		return `
			<div class="box">
				<div ot-if="row" class="head">
					<div class="title">{{ row.name }}</div>
					<span :class="row.status === 'Published' ? 'chip green' : 'chip'">{{ row.status }}</span>
				</div>
				<div ot-if="row" class="body ot-scrollbar">
					<e-form-input label="Name" :value="row.name"></e-form-input>
					<e-form-input label="Slug" :value="slug" icon="link"></e-form-input>
					<e-form-toggle label="Published" :value="row.status === 'Published'"></e-form-toggle>
					<div class="note">The form renders from the collection schema once fields land in Build.</div>
				</div>
				<div ot-if="row" class="foot">
					<div class="meta">Updated {{ row.updated }}</div>
					<e-form-button text="Save" color="brand" tone="soft"></e-form-button>
				</div>
				<div ot-if="!row" class="empty">
					<i>edit_note</i>
					<span>Select an item in the table.</span>
				</div>
			</div>
		`;
	}
});
