elements.ItemAdd({
	id: 'marketplace-extension-card',
	icon: 'extension',
	name: 'Extension Card',
	description: 'One extension on the marketplace shelf: tile, name, rating, price and the install button.',
	category: 'Marketplace',
	author: 'OneType',
	metadata: { addon: 'marketplace' },
	config: {
		extension: {
			type: 'object',
			value: {}
		},
		_open: {
			type: 'function'
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

		this.open = () =>
		{
			this._open && this._open({ extension: this.entry });
		};

		this.toggle = ({ event }) =>
		{
			event.stopPropagation();
			this._toggle && this._toggle({ extension: this.entry });
		};

		return `
			<div class="box" ot-click="open">
				<div class="top">
					<div :class="'tile ' + entry.color"><i>{{ entry.icon }}</i></div>
					<div class="title">
						<div class="name">{{ entry.name }} <i ot-if="entry.official" class="official">verified</i></div>
						<div class="author">{{ entry.author }}</div>
					</div>
				</div>
				<div class="about ot-clamp-2">{{ entry.description }}</div>
				<div class="foot">
					<span class="price">{{ entry.price }}</span>
					<span class="rating"><i>star</i>{{ entry.rating.toFixed(1) }} <em>({{ entry.reviews }})</em></span>
					<button :class="entry.installed ? 'have' : 'get'" ot-click="toggle">{{ entry.installed ? 'Installed' : 'Install' }}</button>
				</div>
			</div>
		`;
	}
});
