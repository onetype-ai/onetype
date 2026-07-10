elements.ItemAdd({
	id: 'marketplace-application-card',
	icon: 'apps',
	name: 'Application Card',
	description: 'One application on the marketplace shelf: tile, name, description and the install button.',
	category: 'Marketplace',
	author: 'OneType',
	metadata: { addon: 'marketplace' },
	config: {
		application: {
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
			this.entry = this.application;
		});

		this.open = () =>
		{
			this._open && this._open({ application: this.entry });
		};

		this.toggle = ({ event }) =>
		{
			event.stopPropagation();
			this._toggle && this._toggle({ application: this.entry });
		};

		return `
			<div class="box" ot-click="open">
				<div class="top">
					<div class="tile" :style="'background: ' + entry.color + '1a; color: ' + entry.color"><i>{{ entry.icon }}</i></div>
					<div class="title">
						<div class="name">{{ entry.name }} <i ot-if="entry.is_global" class="official">verified</i></div>
						<div class="slug">{{ entry.slug }}</div>
					</div>
				</div>
				<div class="about ot-clamp-2">{{ entry.description }}</div>
				<div class="foot">
					<button :class="entry.installed ? 'have' : 'get'" ot-click="toggle">{{ entry.installed ? 'Installed' : 'Install' }}</button>
				</div>
			</div>
		`;
	}
});
