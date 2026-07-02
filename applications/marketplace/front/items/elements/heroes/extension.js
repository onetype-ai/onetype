elements.ItemAdd({
	id: 'marketplace-extension-hero',
	icon: 'extension',
	name: 'Extension Hero',
	description: 'The top of an extension page: tile, name, author, rating, price and the install button.',
	category: 'Marketplace',
	author: 'OneType',
	metadata: { addon: 'marketplace' },
	config: {
		extension: {
			type: 'object',
			value: {}
		},
		_toggle: {
			type: 'function'
		}
	},
	render: function()
	{
		this.Compute(() =>
		{
			this.entry = this.extension;
		});

		this.toggle = () =>
		{
			this._toggle && this._toggle({ extension: this.entry });
		};

		return `
			<div :class="'box ' + entry.color">
				<div class="tile"><i>{{ entry.icon }}</i></div>
				<div class="meta">
					<div class="name">{{ entry.name }} <i ot-if="entry.official" class="official">verified</i></div>
					<div class="author">{{ entry.author }}</div>
					<div class="facts">
						<span class="rating"><i>star</i>{{ entry.rating.toFixed(1) }} <em>({{ entry.reviews }} reviews)</em></span>
						<span class="price">{{ entry.price }}</span>
					</div>
				</div>
				<button :class="entry.installed ? 'have' : 'get'" ot-click="toggle">{{ entry.installed ? 'Uninstall' : 'Install' }}</button>
			</div>
		`;
	}
});
